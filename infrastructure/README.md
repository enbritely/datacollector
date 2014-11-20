1. Copy API key from account/account settings -> API key
2. rackspace_get_auth_token.sh -> insert user_name and API key
3. Search for token id
    "token": {
		"RAX-AUTH:authenticatedBy": [
		    "APIKEY"
		],
		"expires": "2014-11-21T11:57:55.372Z",
		"id": "f463a8118304487b12ce4ccc04f1e754",
4. Search for in "name": "cloudFilesCDN" for
    "endpoints": [
			{
			    "publicURL": "https://cdn5.clouddrive.com/v1/MossoCloudFS_923043",
			    "region": "IAD",
5. rackspace_purge.sh -> insert token_id, e-mail and address (if necessary)

PURGE LIMIT: 25 / day