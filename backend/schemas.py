from pydantic import BaseModel, EmailStr

# ─── REQUEST SCHEMAS (coming IN from React) ───────

class UserRegister(BaseModel):
    email: EmailStr      # must be valid email
    password: str        # any string

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ─── RESPONSE SCHEMAS (going OUT to React) ────────

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True