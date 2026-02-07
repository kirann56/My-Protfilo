from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from Database import get_db
import models, schema
from oauth import create_access_token

router = APIRouter(tags=["AUTH"])

@router.post("/auth", response_model=schema.Token)
def auth_user(
    request: schema.User,
    db: Session = Depends(get_db)
):
    # First, try to find existing user
    user = db.query(models.CREATEUSER).filter(
        models.CREATEUSER.email == request.email
    ).first()

    # If user doesn't exist, create new user
    if not user:
        user = models.CREATEUSER(
            username=request.username,
            email=request.email
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Now user definitely exists (either found or created)
    # Make sure we have the latest data
    db.refresh(user)

    access_token = create_access_token(
        data={"user_id": user.user_id}
    )
    

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.user_id,
        "username": user.username
    }