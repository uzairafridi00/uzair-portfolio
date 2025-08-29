# backend/main.py
from fastapi import FastAPI
from database import SessionLocal, engine
import models
from routes import articles

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Blog API with SQLite")

# Include Article Routes
app.include_router(articles.router)

@app.get("/")
def root():
    return {"message": "Welcome to Uzair Afridi's Blog API 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

