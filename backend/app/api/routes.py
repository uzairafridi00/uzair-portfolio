from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@router.get("/projects")
def get_projects():
    return [
        {"title": "ESP Failure Detection", "tech": "PINN, PyTorch"},
        {"title": "ML SaaS Idea Generator", "tech": "NLP, Transformers"},
    ]

@router.post("/contact")
def send_message(form: ContactForm):
    return {"status": "success", "message": f"Thanks {form.name}, I’ll reply soon!"}
