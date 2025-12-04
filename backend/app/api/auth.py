from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt
from app.db.mongodb import get_db
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class RegisterUser(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
async def register_user(payload: RegisterUser):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="DB not initialized")

    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="User exists")

    hashed_pw = pwd_context.hash(payload.password)

    await db.users.insert_one({
        "email": payload.email,
        "full_name": payload.full_name,
        "password": hashed_pw,
        "role": payload.role
    })

    return {"message": "Registered"}


@router.post("/login")
async def login_user(payload: LoginUser):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="DB not initialized")

    user = await db.users.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not pwd_context.verify(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    claims = {
        "sub": str(user["_id"]),
        "email": user["email"],
        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    token = jwt.encode(claims, settings.SECRET_KEY, algorithm="HS256")

    return {"access_token": token, "token_type": "bearer"}
