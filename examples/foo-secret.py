def handler(event, context):
    print os.env('')
    return event['data']
