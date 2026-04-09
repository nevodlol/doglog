from pydantic import BaseModel, field_serializer
from typing import Optional
from datetime import date
from enum import Enum

class GenderEnum(str, Enum):
    male = "male"
    female = "female"

class DogResponse(BaseModel):
    id: int
    name: str
    gender: GenderEnum
    birthdate: date
    breed: str
    color: str
    chip: Optional[str]
    photo: Optional[str]

    @field_serializer("birthdate")
    def serialize_birthdate(self, value: date):
        return value.strftime("%d.%m.%Y")

    class Config:
        from_attributes = True