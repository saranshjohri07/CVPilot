from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="CVPilot API",
    description="AI-powered resume analyzer backend",
    version="1.0.0"
)

# CORS — allows React (localhost:5173) to call our API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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