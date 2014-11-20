curl -s -d \
'{
    "auth":
    {
       "RAX-KSKEY:apiKeyCredentials":
       {  
          "username": "<<acc_name>>",  
          "apiKey": "<<api_key>>"}
    }  
}' \
-H 'Content-Type: application/json' \
'https://identity.api.rackspacecloud.com/v2.0/tokens' | python -m json.tool