import hashlib
import uuid

def hash(password):
    sha256 = hashlib.sha256()
    sha256.update(password.encode())
    password_hash = sha256.hexdigest()
    return password_hash

def generateID():
    return str(uuid.uuid4())

def saltAndHash(password):
    password_salt = generateID()
    password_hash = hash(password+password_salt)
    return [password_salt, password_hash]
