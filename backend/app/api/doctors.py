from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from app.db.mongodb import get_db
from app.core.deps import get_current_user

router = APIRouter(prefix="/doctors", tags=["Doctors"])


class DoctorProfile(BaseModel):
    specialization: str
    experience_years: int
    clinic_address: str | None = None
    license_number: str


@router.post("/profile")
async def create_doctor_profile(
    profile: DoctorProfile,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()

    # Only doctors can create doctor profiles
    if current_user["email"] is None:
        raise HTTPException(status_code=401, detail="Invalid user")

    # get user document
    user = await db.users.find_one({"email": current_user["email"]})
    if user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can create profiles")

    existing = await db.doctor_profiles.find_one({"user_id": current_user["user_id"]})
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists")

    doc = profile.dict()
    doc["user_id"] = current_user["user_id"]

    await db.doctor_profiles.insert_one(doc)

    return {"message": "Doctor profile created successfully"}
    


@router.get("/me")
async def get_doctor_profile(
    current_user: dict = Depends(get_current_user)
):
    db = get_db()

    user = await db.users.find_one({"email": current_user["email"]})
    if user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")

    profile = await db.doctor_profiles.find_one({"user_id": current_user["user_id"]})
    if not profile:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    profile["_id"] = str(profile["_id"])
    return profile



@router.put("/profile")
async def update_doctor_profile(
    profile: DoctorProfile,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()

    user = await db.users.find_one({"email": current_user["email"]})
    if user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")

    existing = await db.doctor_profiles.find_one({"user_id": current_user["user_id"]})
    if not existing:
        raise HTTPException(status_code=404, detail="Profile does not exist")

    await db.doctor_profiles.update_one(
        {"user_id": current_user["user_id"]}, 
        {"$set": profile.dict()}
    )

    return {"message": "Doctor profile updated successfully"}



@router.delete("/profile")
async def delete_doctor_profile(
    current_user: dict = Depends(get_current_user)
):
    db = get_db()

    user = await db.users.find_one({"email": current_user["email"]})
    if user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")

    existing = await db.doctor_profiles.find_one({"user_id": current_user["user_id"]})
    if not existing:
        raise HTTPException(status_code=404, detail="Profile not found")

    await db.doctor_profiles.delete_one({"user_id": current_user["user_id"]})

    return {"message": "Doctor profile deleted successfully"}
