from pydantic import BaseModel, field_serializer
from typing import Optional
from datetime import date
from enum import Enum

class EventTypeEnum(str, Enum):
    work = "work"
    training = "training"
    vet = "vet"

class GenderEnum(str, Enum):
    male = "male"
    female = "female"

class DogResponse(BaseModel):
    id: int
    name: str
    gender: GenderEnum
    birthdate: str
    breed: str
    color: str
    chip: Optional[str]
    photo: Optional[str]
    weight: Optional[float]

    class Config:
        from_attributes = True

class DogUpdate(BaseModel):
    name: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birthdate: Optional[str] = None
    breed: Optional[str] = None
    color: Optional[str] = None
    chip: Optional[str] = None
    photo: Optional[str] = None
    weight: Optional[float] = None

class CalendarBase(BaseModel):
    dog_id: int
    employee: str
    date: date
    type: EventTypeEnum

class CalendarCreate(CalendarBase):
    pass

class DogMini(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CalendarResponse(BaseModel):
    id: int
    dog: DogMini
    employee: str
    date: date
    type: str

    class Config:
        from_attributes = True