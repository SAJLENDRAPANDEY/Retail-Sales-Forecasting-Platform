from fastapi import APIRouter

from backend.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest
)

from backend.database.user_db import (
    register_user,
    login_user
)

router = APIRouter()


@router.post("/register")
def register(
    data: RegisterRequest
):

    try:

        register_user(

            data.name,

            data.email,

            data.password

        )

        return {

            "success": True,

            "message":
            "Registration Successful"

        }

    except Exception:

        return {

            "success": False,

            "message":
            "User Already Exists"

        }


@router.post("/login")
def login(
    data: LoginRequest
):

    user = login_user(

        data.email,

        data.password

    )

    if user:

        return {

            "success": True,

            "message":
            "Login Successful",

            "user_id":
            user[0],

            "name":
            user[1]

        }

    return {

        "success": False,

        "message":
        "Invalid Credentials"

    }