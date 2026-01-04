from sqlalchemy.orm import Session
from fastapi import status,Depends,HTTPException,APIRouter
from backend.Database import get_db
from backend.oauth import get_current_user
from backend import models,schema


router=APIRouter(tags=['/PROFILE_UPVOTE'],
                 prefix='/profile_upvote')

@router.post('/')
def profile_upvote(db:Session=Depends(get_db),current_user:int=Depends(get_current_user)):
    user=get_current_user()
    upvote=models.PROFILE_UPVOTE(user_id=user.user_id)
    

