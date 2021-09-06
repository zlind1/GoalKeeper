import db
import security

tableName = 'Users'

def create_user_table():
    db.create_table(tableName, {
        'username': 'S'
    })

def get_user(username):
    return db.get_item(tableName, {
        'username': username
    })

def create_user(username, password):
    [password_salt, password_hash] = security.saltAndHash(password)
    db.put_item(tableName, {
        'username': username,
        'password_salt': password_salt,
        'password_hash': password_hash
    })

def login(username, password):
    response = {
        'msg': ''
    }
    user = get_user(username)
    if user:
        password_salt = user['password_salt']
        password_hash = security.hash(password+password_salt)
        if password_hash == user['password_hash']:
            response['msg'] = 'Login success'
        else:
            response['msg'] = 'Incorrect password'
    else:
        response['msg'] = 'User not found'
    return response

def signup(username, password):
    response = {
        'msg': ''
    }
    user = get_user(username)
    if user:
        response['msg'] = 'Username taken'
    else:
        create_user(username, password)
        response['msg'] = 'Signup success'
    return response
