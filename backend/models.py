from sqlalchemy import Column, Integer, String, Enum, Float, Date, ForeignKey
from database import Base
import enum
from sqlalchemy.orm import relationship


class GenderEnum(enum.Enum):
    male = "male"
    female = "female"

class EventTypeEnum(enum.Enum):
    work = "work"
    training = "training"
    vet = "vet"

class Dog(Base):
    __tablename__ = "dogs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    birthdate = Column(String, nullable=False)
    breed = Column(String, nullable=False)
    color = Column(String, nullable=False)
    chip = Column(String, nullable=True)
    photo = Column(String, nullable=True)
    weight = Column(Float, nullable=True)

class Calendar(Base):
    __tablename__ = "calendar"

    id = Column(Integer, primary_key=True, index=True)
    dog_id = Column(Integer, ForeignKey("dogs.id"), nullable=False)
    employee = Column(String, nullable=True)
    date = Column(Date, nullable=False)
    type = Column(Enum(EventTypeEnum), nullable=False)

    dog = relationship("Dog")