from sqlalchemy import Column, Integer, String, Date, Enum
from database import Base
import enum


class GenderEnum(enum.Enum):
    male = "male"
    female = "female"


class Dog(Base):
    __tablename__ = "dogs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    birthdate = Column(Date, nullable=False)
    breed = Column(String, nullable=False)
    color = Column(String, nullable=False)
    chip = Column(String, nullable=True)
    photo = Column(String, nullable=True)