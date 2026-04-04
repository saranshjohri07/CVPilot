import os
import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from database import get_db
from models import Resume, User
from auth import get_current_user
from parser import extract_text_from_pdf, get_text_preview
from nlp import extract_keywords, match_job_roles, calculate_ats_score

router = APIRouter(prefix="/resume", tags=["Resume"])

# Where we save uploaded PDF files
UPLOAD_DIR = "uploads"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a resume PDF.
    Extracts text, finds keywords, calculates score.
    Saves everything to database.
    Returns resume_id for result page.
    """

    # ── STEP 1: Validate file type ──────────────────
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # ── STEP 2: Read file + check size ──────────────
    file_content = await file.read()

    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 5MB"
        )

    # ── STEP 3: Save file to uploads/ folder ────────
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Create unique filename: userid_filename.pdf
    safe_filename = f"{current_user.id}_{file.filename}"
    filepath = os.path.join(UPLOAD_DIR, safe_filename)

    with open(filepath, "wb") as f:
        f.write(file_content)

    # ── STEP 4: Extract text from PDF ───────────────
    raw_text = extract_text_from_pdf(filepath)

    if not raw_text or len(raw_text) < 50:
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from PDF. Please try a different file."
        )

    # ── STEP 5: NLP — Extract keywords ──────────────
    keyword_results = extract_keywords(raw_text)
    matched = keyword_results["matched_keywords"]
    missing = keyword_results["missing_keywords"]

    # ── STEP 6: Calculate ATS score ─────────────────
    score_results = calculate_ats_score(raw_text, matched)

    # ── STEP 7: Match job roles ──────────────────────
    top_roles = match_job_roles(matched)

    # ── STEP 8: Save to database ─────────────────────
    new_resume = Resume(
        user_id=current_user.id,
        filename=file.filename,
        raw_text=raw_text,
        matched_keywords=json.dumps(matched),
        missing_keywords=json.dumps(missing),
        ats_score=score_results["ats_score"]
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    # ── STEP 9: Return result to React ───────────────
    return {
        "resume_id": new_resume.id,
        "filename": file.filename,
        "ats_score": score_results["ats_score"],
        "sub_scores": score_results["sub_scores"],
        "matched_keywords": matched,
        "missing_keywords": missing,
        "job_matches": top_roles,
        "text_preview": get_text_preview(raw_text),
        "keyword_count": keyword_results["keyword_count"],
        "message": "Resume analyzed successfully"
    }


@router.get("/history")
def get_resume_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all resumes uploaded by current user.
    Used for history page.
    """
    resumes = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).order_by(Resume.created_at.desc()).all()

    return [
        {
            "id": r.id,
            "filename": r.filename,
            "ats_score": r.ats_score,
            "created_at": str(r.created_at),
            "keyword_count": len(json.loads(r.matched_keywords or "[]"))
        }
        for r in resumes
    ]


@router.get("/{resume_id}")
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get full analysis of a specific resume.
    Used for result page.
    """
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    matched = json.loads(resume.matched_keywords or "[]")
    missing = json.loads(resume.missing_keywords or "[]")
    top_roles = match_job_roles(matched)

    return {
        "id": resume.id,
        "filename": resume.filename,
        "ats_score": resume.ats_score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "job_matches": top_roles,
        "created_at": str(resume.created_at)
    }