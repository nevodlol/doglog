from database import Base, engine
from models import Dog, Calendar

Base.metadata.create_all(bind=engine)