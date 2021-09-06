import boto3

endpoint_url = 'https://dynamodb.us-west-1.amazonaws.com'

def open_db():
    return boto3.resource('dynamodb', endpoint_url=endpoint_url, region_name='us-west-1')

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
