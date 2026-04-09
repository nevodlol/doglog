from database import Base, engine
from models import Dog

Base.metadata.create_all(bind=engine)