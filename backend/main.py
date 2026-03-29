from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import engine, Base
import auth
import os

load_dotenv()

# Creates all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CVPilot API",
    description="AI-powered resume analyzer backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register auth routes
app.include_router(auth.router)

@app.get("/")
def root():
    return {
        "message": "CVPilot API is running 🚀",
        "docs": "Visit /docs to see all endpoints"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "CVPilot",
        "version": "1.0.0"
    }