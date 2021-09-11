import db
import security
from datetime import datetime

tableName = 'Goals'

def create_goal_table():
    db.create_table(tableName, {
        'goal_id': 'S'
    })

def delete_goal_table():
    db.delete_table(tableName)

def get_goal(goal_id):
    return db.get_item(tableName, {
        'goal_id': goal_id
    })

def create_goal(username, title):
    goal_id = security.generateID()
    db.put_item(tableName, {
        'goal_id': goal_id,
        'username': username,
        'title': title,
        'completed': False,
        'timestamp': str(datetime.now())
    })

def get_user_goals(username):
    return db.scan(tableName, {
        'username': username
    })

def update_goal(goal_id, newItem):
    db.update_item(tableName, {
        'goal_id': goal_id
    }, newItem)


def delete_goal(goal_id):
    db.delete_item(tableName, {
        'goal_id': goal_id
    })
