import spacy
import re
from keyword_data.roles import JOB_ROLES, ALL_KEYWORDS

# Load spaCy model ONCE at module level
# Loading is slow — we do it once, reuse always
nlp = spacy.load("en_core_web_sm")

def extract_keywords(resume_text: str) -> dict:
    """
    Extract and match keywords from resume text.
    
    Args:
        resume_text: cleaned text from parser.py
        
    Returns:
        dict with matched, missing keywords and count
    """
    # Process text with spaCy
    doc = nlp(resume_text)
    
    # Get clean lowercase text for matching
    clean_text = resume_text.lower()
    
    matched_keywords = []
    missing_keywords = []
    
    # Check each keyword against resume text
    for keyword in ALL_KEYWORDS:
        if keyword in clean_text:
            matched_keywords.append(keyword)
        else:
            missing_keywords.append(keyword)
    
    return {
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "keyword_count": len(matched_keywords),
        "total_keywords": len(ALL_KEYWORDS)
    }


def match_job_roles(matched_keywords: list) -> list:
    """
    Match resume keywords against job role profiles.
    Returns top 3 matching roles.
    
    Args:
        matched_keywords: list of keywords found in resume
        
    Returns:
        list of top 3 roles with match percentage
    """
    role_scores = {}
    
    for role, keywords in JOB_ROLES.items():
        # Find which of THIS role's keywords are in resume
        role_matched = [k for k in keywords 
                       if k in matched_keywords]
        
        # Find which are missing
        role_missing = [k for k in keywords 
                       if k not in matched_keywords]
        
        # Calculate match percentage
        match_percent = round(
            (len(role_matched) / len(keywords)) * 100
        )
        
        role_scores[role] = {
            "role": role,
            "match_percent": match_percent,
            "matched_skills": role_matched,
            "missing_skills": role_missing
        }
    
    # Sort by match percentage (highest first)
    sorted_roles = sorted(
        role_scores.values(),
        key=lambda x: x["match_percent"],
        reverse=True
    )
    
    # Return top 3 roles
    return sorted_roles[:3]


def calculate_ats_score(
    resume_text: str,
    matched_keywords: list
) -> dict:
    """
    Calculate ATS compatibility score.
    
    Formula:
        base = (matched / total) * 100
        bonuses for good resume practices
        
    Args:
        resume_text: clean resume text
        matched_keywords: keywords found in resume
        
    Returns:
        dict with score and sub-scores
    """
    # Base score from keyword matching
    base_score = (len(matched_keywords) / len(ALL_KEYWORDS)) * 100
    
    # Bonus points for good practices
    bonus = 0
    text_lower = resume_text.lower()
    
    # Has email address
    if "@" in text_lower:
        bonus += 5
    
    # Has professional summary
    if any(word in text_lower for word in 
           ["summary", "objective", "profile"]):
        bonus += 5
    
    # Has quantified achievements (numbers)
    if re.search(r'\d+', resume_text):
        bonus += 5
    
    # Has education section
    if any(word in text_lower for word in 
           ["education", "degree", "university", 
            "college", "bachelor", "master", "b.tech"]):
        bonus += 5
    
    # Has experience section
    if any(word in text_lower for word in 
           ["experience", "worked", "internship",
            "employment", "position"]):
        bonus += 5
    
    # Calculate final score (max 100)
    raw_score = base_score + bonus
    final_score = min(100, int(raw_score))
    
    # Sub-scores for dashboard
    skills_score = min(100, int(
        (len(matched_keywords) / 20) * 100
    ))
    
    format_score = min(100, int(
        (bonus / 25) * 100
    ))
    
    return {
        "ats_score": final_score,
        "sub_scores": {
            "skills": skills_score,
            "keywords": min(100, int(base_score)),
            "format": format_score,
            "experience": min(100, int(base_score * 0.8))
        }
    }