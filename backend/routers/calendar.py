from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List

from database import SessionLocal
from models import Calendar, Dog
from schemas import CalendarCreate, CalendarResponse

router = APIRouter(prefix="/calendar", tags=["calendar"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[CalendarResponse])
def get_events(db: Session = Depends(get_db)):
    return db.query(Calendar).all()


@router.post("/", response_model=CalendarResponse)
def create_event(event: CalendarCreate, db: Session = Depends(get_db)):
    
    dog = db.query(Dog).filter(Dog.id == event.dog_id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Собака не найдена")

    new_event = Calendar(
        dog_id=event.dog_id,
        employee=event.employee,
        date=event.date,
        type=event.type
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Calendar).filter(Calendar.id == event_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Событие не найдено")

    db.delete(event)
    db.commit()

    return {"message": "Событие удалено", "id": event_id}