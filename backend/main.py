import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dogs, calendar
from fastapi.staticfiles import StaticFiles

app = FastAPI()

_default_origins = "http://localhost:5173,http://127.0.0.1:5173"
_origins_raw = os.getenv("CORS_ORIGINS", _default_origins)
origins = [o.strip() for o in _origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dogs.router)
app.include_router(calendar.router)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def root():
    return {"message": "оно работает!"}