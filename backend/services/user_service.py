from sqlalchemy.orm import Session

from models.user import User


def create_user(
    db: Session,
    username: str,
    email: str,
    password: str
):
    new_user = User(
        username=username,
        email=email,
        password=password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user