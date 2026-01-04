from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from backend import models, schema
from backend.Database import get_db
from backend.credentials import passworddehash
from backend.oauth import create_access_token

router = APIRouter(
    tags=["LOGIN"],
    prefix="/login"
)

@router.post("/", response_model=schema.Token)
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.CREATEUSER).filter(
        models.CREATEUSER.email == request.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist"
        )

    if not passworddehash(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid password"
        )

    access_token = create_access_token({"user_id": user.user_id})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
