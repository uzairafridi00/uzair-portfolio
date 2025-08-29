# backend/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ArticleBase(BaseModel):
    title: str
    content: str
    author: Optional[str] = "Uzair Afridi"

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True