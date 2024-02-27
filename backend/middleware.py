from flask import session
from functools import wraps
from db import users


def needs_auth():
    def _needs_auth(f):
        @wraps(f)
        def __needs_auth(*args, **kwargs):
            if "username" not in session:
                return {}, 401
            
            username = session["username"]
            user = users.find_one({"username": session["username"]})
            print(user)
            
            if not user:
                return {}, 401
            result = f(user, *args, **kwargs)
            return result

        return __needs_auth

    return _needs_auth
