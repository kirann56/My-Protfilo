from sqlalchemy.orm import Session
from fastapi import status,Depends,HTTPException,APIRouter
from Database import get_db
from oauth import get_current_user
import models,schema
from sqlalchemy import func

router=APIRouter(tags=['PROFILE_UPVOTE'],
                 prefix='/profile_upvote')


@router.post('/')
def profile_upvote(
    db: Session = Depends(get_db),
    get_current_user: int = Depends(get_current_user)
):
    current_user_id = get_current_user.user_id

    
    user_exist = db.query(models.PROFILE_UPVOTE).filter(
        models.PROFILE_UPVOTE.user_id == current_user_id
    ).first()

    if user_exist is None:
        user_upvote = models.PROFILE_UPVOTE(user_id=current_user_id)
        db.add(user_upvote)
        db.commit()
        db.refresh(user_upvote)
        return {"message": "Thanks for Up-Voting Me"}

    return {"message": "You have already up-voted"}




@router.get('/getall-upvotes')
def get_all_upvotes(db: Session = Depends(get_db)):
    total_upvotes = db.query(models.PROFILE_UPVOTE).count()
    return {"total_profile_upvotes": total_upvotes}

@router.get('/is_upvote')
def is_upvote(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    current_id = current_user.user_id

    upvote = db.query(models.PROFILE_UPVOTE).filter(
        models.PROFILE_UPVOTE.user_id == current_id
    ).first()

    return {
        "is_upvoted": upvote is not None
    }

    

