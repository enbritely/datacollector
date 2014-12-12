import json
import requests


def rs_get_aut_token(username, userapikey):
    payload = '{"auth":{"RAX-KSKEY:apiKeyCredentials":{"username": "%s",  "apiKey": "%s"}}}' % (username, userapikey)
    header = {'content-type': 'application/json'}
    r = requests.post(url="https://identity.api.rackspacecloud.com/v2.0/tokens", data=payload, headers=header)
    result = json.loads(r.text)
    token_id = result['access']['token']['id']
    print("Got token starting with: %s" % str(token_id)[0:7])
    return token_id