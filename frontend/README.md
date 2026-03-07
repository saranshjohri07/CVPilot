# CVPilot 🧠
> Know Your Resume. Land Your Role.

CVPilot is an AI-powered resume analyzer that extracts 
resume text, calculates ATS compatibility scores, identifies 
missing keywords, and provides intelligent suggestions to 
improve job application success.

---

## ✨ Features
- 📊 **ATS Score** — Know exactly how recruiters' systems rate your resume
- 🔍 **Keyword Analysis** — See matched and missing keywords instantly
- 🤖 **AI Feedback** — Get 5 specific improvement tips powered by OpenAI
- 💼 **Job Matching** — Match your resume to top 3 relevant job roles
- 🎯 **Sub-scores** — Skills, Keywords, Format, Experience breakdown
- 📝 **Goal Tracker** — Track your job application goals

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Tailwind CSS + Vite |
| Backend | FastAPI (Python) |
| Database | SQLite → MySQL |
| NLP | spaCy + PyMuPDF |
| AI Feedback | OpenAI GPT-3.5-turbo |
| Auth | JWT (python-jose + bcrypt) |
| Deployment | Vercel + Railway |

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```
> API runs on http://localhost:8000
> Swagger docs at http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
> App runs on http://localhost:5173

### Environment Variables

Create `backend/.env`:
```env
SECRET_KEY=your_secret_key
OPENAI_API_KEY=sk-your-key
DATABASE_URL=sqlite:///./cvpilot.db
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=CVPilot
```

---

## 📁 Project Structure
```
CVPilot/
├── backend/
│   ├── main.py          ← FastAPI app
│   ├── auth.py          ← JWT authentication
│   ├── parser.py        ← PDF text extraction
│   ├── scorer.py        ← ATS scoring engine
│   ├── matcher.py       ← Job role matching
│   ├── feedback.py      ← OpenAI integration
│   ├── database.py      ← SQLite connection
│   └── models.py        ← Database tables
│
└── frontend/
    └── src/
        ├── pages/       ← Home, Upload, Result, Login
        ├── components/  ← ScoreGauge, FeedbackCards etc.
        ├── services/    ← API calls (axios)
        ├── context/     ← Auth state
        └── utils/       ← Helper functions
```

---

## 📡 API Endpoints
```
GET  /health              → Server health check
POST /auth/register       → Create account
POST /auth/login          → Login, get JWT token
POST /resume/upload       → Upload PDF resume
POST /analyze/{id}        → Run ATS analysis
GET  /resume/{id}         → Get resume results
GET  /user/history        → Past resume uploads
```

---

## 🗺️ Build Progress

- [x] Project scaffold — FastAPI + React + Tailwind
- [ ] JWT Authentication — register, login, protected routes
- [ ] Resume upload — PDF parsing with PyMuPDF + spaCy
- [ ] ATS scoring — keyword matching + job role matcher
- [ ] AI feedback — OpenAI GPT-3.5 integration
- [ ] Dashboard UI — scores, feedback, job matches, goals
- [ ] Production deployment — Railway + Vercel

---

## 👨‍💻 Author
**Saransh Johri** — [@saranshjohri07](https://github.com/saranshjohri07)

---

## 📄 License
MIT License — feel free to use and learn from this project.