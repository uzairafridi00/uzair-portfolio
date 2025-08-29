from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base

class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String(100), default="Uzair Afridi")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
