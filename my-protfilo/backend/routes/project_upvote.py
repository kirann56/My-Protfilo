from backend import models,schema
from fastapi import status,Depends,HTTPException,APIRouter
from sqlalchemy.orm import Session
from backend.Database import get_db
from backend.oauth import get_current_user

router=APIRouter(
    tags=['PROJECTS_UPVOTES'],
    prefix='/project_upvote'
)

@router.post('/')
def upvote_project(request:schema.ProjectUpvote,db:Session=Depends(get_db),get_current_user:int=Depends(get_current_user)):
    current_user_id=get_current_user.user_id
    project=db.query(models.PROJECTS).filter(models.PROJECTS.project_id==request.project_id).first()
    
    existing = db.query(models.PROJECT_UPVOTE).filter(
        models.PROJECT_UPVOTE.project_id == request.project_id,
        models.PROJECT_UPVOTE.user_id == current_user_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Already liked"
        )

    if request.dir==1:
        if not project:
            return {f"project with this id {request.project_id} doesn't exist"}
        
        
        upvotes=models.PROJECT_UPVOTE(user_id=current_user_id,project_id=request.project_id)
        db.add(upvotes)
        db.commit()
        db.refresh(upvotes)
        return {f"Thanks for Upvoting for {request.project_id} user id {current_user_id}"}
    else:
        if not project:
            return {f"project with this id {request.project_id} doesn't exist"}
        upvotes=models.PROJECT_UPVOTE(user_id=current_user_id,project_id=request.project_id)
        db.delete(upvotes)
        db.commit()
        db.refresh(upvotes)
        return {f"Successfully Un-Voted the Project {request.project_id} user id {current_user_id}"}
    



@router.get('/is_project_upvote')
def GetProjectUpvote(request:schema.ProjectUpvoteCheck,db:Session=Depends(get_db)):

    upvoted=db.query(models.PROJECT_UPVOTE).filter(models.PROJECT_UPVOTE.project_id==request.project_id,models.PROJECT_UPVOTE.user_id==request.user_id).first()
    
    return {
        "is_upvoted": upvoted is not None
    }



