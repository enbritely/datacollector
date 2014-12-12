import requests


def rs_send_purge(url, auth_token, user_mail):
    if user_mail is not None:
        header = {'X-Auth-Token': str(auth_token), "X-Purge-Email": str(user_mail)}
    else:
        header = {'X-Auth-Token': str(auth_token)}
    r = requests.delete(url=url, headers=header)
    print("Purge return: %s" % str(r.status_code))
