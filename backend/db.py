import boto3
from boto3.dynamodb.conditions import Attr

import os

endpoint_url = 'https://dynamodb.us-west-1.amazonaws.com'

def open_db():
    return boto3.resource(
        'dynamodb',
        endpoint_url=endpoint_url,
        region_name='us-west-1',
        aws_access_key_id=os.environ.get('ACCESS_KEY'),
        aws_secret_access_key=os.environ.get('SECRET_KEY')
    )

def create_table(tableName, primaryKey):
    dynamodb = open_db()
    key = list(primaryKey.keys())[0]
    value = primaryKey[key]
    keySchema = [{
        'AttributeName': key,
        'KeyType': 'HASH'
    }]
    attributeDefinitions = [{
        'AttributeName': key,
        'AttributeType': value
    }]
    dynamodb.create_table(
        TableName=tableName,
        KeySchema=keySchema,
        AttributeDefinitions=attributeDefinitions,
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )

def delete_table(tableName):
    dynamodb = open_db()
    table = dynamodb.Table(tableName)
    table.delete()

def put_item(tableName, item):
    dynamodb = open_db()
    table = dynamodb.Table(tableName)
    table.put_item(
       Item=item
    )

def get_item(tableName, key):
    dynamodb = open_db()
    table = dynamodb.Table(tableName)
    try:
        response = table.get_item(Key=key)
    except Exception as e:
        print(e)
    else:
        if 'Item' in response:
            return response['Item']

def scan(tableName, scanKey):
    dynamodb = open_db()
    table = dynamodb.Table(tableName)
    key = list(scanKey.keys())[0]
    filterExpression = Attr(key).eq(scanKey[key])
    return table.scan(FilterExpression=filterExpression)['Items']

def update_item(tableName, key, newItem):
    dynamodb = open_db()
    table = dynamodb.Table(tableName)
    updateExpression = 'SET'
    expressionAttributeValues = {}
    for i, attr in enumerate(newItem):
        flag = f':attr{i}'
        updateExpression += f' {attr} = {flag}'
        expressionAttributeValues[flag] = newItem[attr]
        if i < len(newItem.keys()) - 1:
            updateExpression += ','
    table.update_item(Key=key, UpdateExpression=updateExpression,
        ExpressionAttributeValues=expressionAttributeValues)
