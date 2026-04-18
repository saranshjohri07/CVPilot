import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_feedback(resume_text: str) -> list:
    """
    Generate 5 specific resume improvement tips
    using Groq Llama3 model.
    Returns list of 5 tip dicts.
    """
    truncated_text = resume_text[:2000]

    system_prompt = """You are an expert resume coach
for tech freshers in India applying for their first job.

Analyze the resume and return EXACTLY 5 improvement tips.

Return ONLY a JSON array. No extra text. No markdown.
No explanation before or after.

Each object must have exactly these 3 fields:
- tip: specific actionable advice (not generic)
- category: exactly one of [Skills, Format, Keywords, Experience, Summary]
- priority: exactly one of [high, medium, low]

Example:
[
  {
    "tip": "Add quantified achievements like 'Reduced load time by 40%'",
    "category": "Experience",
    "priority": "high"
  }
]"""

    user_prompt = f"""Analyze this resume and give 5 specific improvement tips:

{truncated_text}

Return ONLY the JSON array, nothing else."""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=800
        )

        response_text = response.choices[0].message.content.strip()

        # Clean markdown if present
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0]
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0]

        tips = json.loads(response_text.strip())

        validated = []
        for tip in tips[:5]:
            validated.append({
                "tip": str(tip.get("tip", "Improve your resume")),
                "category": str(tip.get("category", "General")),
                "priority": str(tip.get("priority", "medium"))
            })

        return validated

    except Exception as e:
        print(f"Feedback generation error: {e}")
        return get_fallback_tips()


def ask_ai(resume_text: str, question: str) -> str:
    """
    Answer a specific question about the resume.
    Used for the AI chat feature.
    """
    truncated_text = resume_text[:1500]

    system_prompt = """You are an expert resume coach
for tech freshers in India.

You have access to the user's resume.
Answer their question specifically based on their resume.
Be direct, helpful, and specific.
Keep response under 150 words.
No generic advice — tailor everything to their resume."""

    user_prompt = f"""My resume:
{truncated_text}

My question: {question}"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Ask AI error: {e}")
        return "Sorry, I couldn't process your question. Please try again."


def get_fallback_tips() -> list:
    """Fallback if API fails — app never crashes."""
    return [
        {
            "tip": "Add quantified achievements — use numbers like '40% improvement'",
            "category": "Experience",
            "priority": "high"
        },
        {
            "tip": "Include a professional summary at the top of your resume",
            "category": "Summary",
            "priority": "high"
        },
        {
            "tip": "Add more technical skills relevant to your target role",
            "category": "Skills",
            "priority": "medium"
        },
        {
            "tip": "Use action verbs: Built, Developed, Implemented, Designed",
            "category": "Format",
            "priority": "medium"
        },
        {
            "tip": "Add keywords from job descriptions to improve ATS score",
            "category": "Keywords",
            "priority": "low"
        }
    ]