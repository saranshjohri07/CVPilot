# CVPilot 🧠
> Know Your Resume. Land Your Role.

CVPilot is an AI-powered resume analyzer that extracts 
resume text, calculates ATS compatibility scores, identifies 
missing keywords, matches job roles, and provides intelligent 
suggestions to improve job application success.

---

## ✨ Features

- 📊 **ATS Score** — Know exactly how recruiters' systems rate your resume
- 🔍 **Keyword Analysis** — See matched and missing keywords instantly  
- 💼 **Job Matching** — Match your resume to top 3 relevant job roles
- 🔐 **Auth System** — Secure JWT authentication with bcrypt
- 🤖 **AI Feedback** — 5 specific improvement tips via OpenAI *(coming soon)*
- 🎯 **Sub-scores** — Skills, Keywords, Format, Experience breakdown *(coming soon)*
- 📝 **Goal Tracker** — Track your job application goals *(coming soon)*

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite | UI framework |
| Styling | Tailwind CSS | Utility-first CSS |
| Backend | FastAPI (Python) | REST API |
| Database | SQLite → MySQL | Data persistence |
| NLP | spaCy + PyMuPDF | Resume parsing + extraction |
| Auth | JWT + bcrypt | Secure authentication |
| AI | OpenAI GPT-3.5 | Resume feedback *(coming soon)* |
| Deployment | Vercel + Railway | Hosting *(coming soon)* |

---

## 🧠 NLP Pipeline
```
PDF File
   ↓ PyMuPDF
Raw Text Extraction
   ↓ spaCy + regex  
Text Cleaning + Tokenization
   ↓ Custom Algorithm
Keyword Matching (101 keywords across 10 roles)
   ↓ Scoring Formula
ATS Score (0-100) + Sub-scores
   ↓ Role Comparison
Top 3 Job Matches with % and missing skills
```

---

## 📡 API Endpoints
```
AUTH:
POST  /auth/register     → Create account
POST  /auth/login        → Login, receive JWT token

RESUME:
POST  /resume/upload     → Upload PDF + full analysis
GET   /resume/history    → All resumes by current user  
GET   /resume/{id}       → Get specific resume analysis

SYSTEM:
GET   /                  → Server status
GET   /health            → Health check
```

---

## ⚙️ Local Setup

### Prerequisites
```
Python 3.10+
Node.js 18+
Git
```

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
```
API → `http://localhost:8000`
Docs → `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App → `http://localhost:5173`

### Environment Variables

`backend/.env`:
```env
SECRET_KEY=your_secret_key_here
OPENAI_API_KEY=sk-add-when-ready
DATABASE_URL=sqlite:///./cvpilot.db
```

`frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=CVPilot
```

---

## 📁 Project Structure
```
CVPilot/
├── backend/
│   ├── main.py              ← FastAPI app + routers
│   ├── auth.py              ← JWT register/login/bcrypt
│   ├── resume.py            ← Upload + analysis endpoints
│   ├── parser.py            ← PyMuPDF PDF text extraction
│   ├── nlp.py               ← spaCy NLP + scoring + matching
│   ├── database.py          ← SQLite connection + sessions
│   ├── models.py            ← User + Resume DB tables
│   ├── schemas.py           ← Pydantic request validation
│   └── keyword_data/
│       └── roles.py         ← 10 job role keyword profiles
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.jsx         ← Landing page
        │   ├── Login.jsx        ← Auth form
        │   ├── Register.jsx     ← Auth form
        │   ├── Upload.jsx       ← PDF drag/drop upload
        │   └── Result.jsx       ← Analysis dashboard
        ├── components/
        │   └── Navbar.jsx       ← Navigation + auth state
        ├── context/
        │   └── AuthContext.jsx  ← Global auth state
        ├── services/
        │   └── api.js           ← Axios + JWT interceptor
        └── utils/
            └── tokenHelper.js   ← localStorage JWT utils
```

---

## 🗺️ Build Progress

- [x] Project scaffold — FastAPI + React + Tailwind + CORS
- [x] JWT Authentication — register, login, bcrypt, protected routes
- [x] Resume upload — PDF parsing with PyMuPDF
- [x] NLP pipeline — spaCy keyword extraction (101 keywords, 10 roles)
- [x] ATS scoring — custom algorithm 0-100 with bonuses
- [x] Job matching — top 3 roles with match % and missing skills
- [x] Result dashboard — score, matched/missing keywords, job cards
- [ ] AI feedback — OpenAI GPT-3.5 improvement tips
- [ ] SaaS dashboard — charts, sub-scores, goal tracker
- [ ] Production deployment — Railway + Vercel

---

## 👨‍💻 Author
**Saransh Johri** — [@saranshjohri07](https://github.com/saranshjohri07)

---

## 📄 License
MIT — feel free to use and learn from this project.
