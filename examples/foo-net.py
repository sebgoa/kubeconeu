import requests

def handler(event, context):
   print event['data']
   try:
     r = requests.post('http://foo:8080', data={'from':'foonet'}, timeout=1)
     print r.status_code
     print r.json()
   except:
     pass
   return event['data']
