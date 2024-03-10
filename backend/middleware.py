from flask import session, Blueprint
from functools import wraps
from config import load_config
import psycopg2 
import psycopg2.extras
# from db import users

config = load_config()
conn = psycopg2.connect(**config)

middleware = Blueprint('middleware', __name__)

def needs_auth():
    def _needs_auth(f):
        @wraps(f)
        def __needs_auth(*args, **kwargs):
            print("inside needs auth")

            print(session)
            id = session.get('uid')

            if not id:
                print("no user")
                return {}, 401
            
            print(id)

            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cursor.execute('SELECT * FROM test.users WHERE user_id = %s', (id,))
            account = cursor.fetchone()
            print(account)

            if not account:
                return {}, 401
            
            result = f(account, *args, **kwargs)
            print(result)
            return result

        return __needs_auth

    return _needs_auth
