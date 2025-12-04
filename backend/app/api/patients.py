from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.deps import get_current_user
from app.db.mongodb import get_db

router = APIRouter(prefix="/patients", tags=["Patients"])


class PatientProfile(BaseModel):
    age: int
    gender: str
    blood_group: str
    allergies: str
    medical_history: str


@router.post("/profile")
async def create_patient_profile(
    profile: PatientProfile,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    # current_user contains: { "user_id": ..., "email": ... }
    user_id = current_user["user_id"]

    # Check if profile already exists for this user
    existing = await db.patient_profiles.find_one({"user_id": user_id})
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists")

    doc = profile.dict()
    doc["user_id"] = user_id

    await db.patient_profiles.insert_one(doc)
    return {"message": "Profile created successfully", "profile": doc}


@router.get("/me")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    db = get_db()
    user_id = current_user["user_id"]

    profile = await db.patient_profiles.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    profile["_id"] = str(profile["_id"])
    return profile

@router.put("/profile")
async def update_patient_profile(
    profile: PatientProfile,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    user_id = current_user["user_id"]

    existing = await db.patient_profiles.find_one({"user_id": user_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Profile does not exist")

    # update data
    update_doc = {"$set": profile.dict()}

    await db.patient_profiles.update_one(
        {"user_id": user_id},
        update_doc
    )

    return {"message": "Profile updated successfully"}

@router.delete("/profile")
async def delete_patient_profile(
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    user_id = current_user["user_id"]

    existing = await db.patient_profiles.find_one({"user_id": user_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Profile not found")

    await db.patient_profiles.delete_one({"user_id": user_id})

    return {"message": "Profile deleted successfully"}
