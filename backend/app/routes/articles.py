# backend/routes/articles.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(prefix="/articles", tags=["Articles"])

# Create Article
@router.post("/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

# Get All Articles
@router.get("/", response_model=list[schemas.Article])
def get_articles(db: Session = Depends(get_db)):
    return db.query(models.Article).all()

# Get Article by ID
@router.get("/{article_id}", response_model=schemas.Article)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

# Update Article
@router.put("/{article_id}", response_model=schemas.Article)
def update_article(article_id: int, updated: schemas.ArticleCreate, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    for key, value in updated.dict().items():
        setattr(article, key, value)
    db.commit()
    db.refresh(article)
    return article

# Delete Article
@router.delete("/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return {"message": f"Article {article_id} deleted successfully"}