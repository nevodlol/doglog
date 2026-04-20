from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil, os
from database import SessionLocal
from models import Dog, GenderEnum
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
    gender: GenderEnum = Form(...),
    birthdate: str = Form(...),
    breed: str = Form(...),
    color: str = Form(...),
    chip: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):

    file_path = None
    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    new_dog = Dog(
        name=name,
        gender=gender,
        birthdate=birthdate,
        breed=breed,
        color=color,
        chip=chip,
        photo=file_path
    )

    db.add(new_dog)
    db.commit()
    db.refresh(new_dog)

    return new_dog

@router.delete("/{dog_id}")
def delete_dog(dog_id: int, db: Session = Depends(get_db)):
    dog = db.query(Dog).filter(Dog.id == dog_id).first()

    if not dog:
        raise HTTPException(status_code=404, detail="Собака не найдена")

    if dog.photo:
        try:
            os.remove(dog.photo)
        except FileNotFoundError:
            pass

    db.delete(dog)
    db.commit()

    return {"message": "Собака удалена", "id": dog_id}