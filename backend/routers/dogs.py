from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil, os
from datetime import datetime
from database import SessionLocal
from models import Dog
from schemas import DogResponse

router = APIRouter(prefix="/dogs", tags=["dogs"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[DogResponse])
def get_dogs(db: Session = Depends(get_db)):
    return db.query(Dog).all()

@router.post("/", response_model=DogResponse)
async def create_dog(
    name: str = Form(...),
    gender: str = Form(...),
    birthdate: str = Form(...),  # получаем DD.MM.YYYY
    breed: str = Form(...),
    color: str = Form(...),
    chip: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        birthdate_obj = datetime.strptime(birthdate, "%d.%m.%Y").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Неверный формат даты, используйте DD.MM.YYYY")

    file_path = None
    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    new_dog = Dog(
        name=name,
        gender=gender,
        birthdate=birthdate_obj,
        breed=breed,
        color=color,
        chip=chip,
        photo=file_path
    )

    db.add(new_dog)
    db.commit()
    db.refresh(new_dog)

    return new_dog