import argparse
from configparser import ConfigParser
import sys
import os

from client.infrastructure.rackspace_api.exceptions import NoArgumentsError, MissingArgumentsException
from client.infrastructure.rackspace_api.rs_auth_token import rs_get_aut_token
from client.infrastructure.rackspace_api.rs_purge import rs_send_purge


_account_name = ''
_account_api_key = ''
_mail = ''


def __parse_arguments():
    global _account_name, _account_api_key, _mail

    parser = argparse.ArgumentParser(description="Rackspace API utils for Enbrite.ly")
    parser.add_argument('-u', dest='_user_name', help='User name')
    parser.add_argument('-k', dest='_user_key', help="User's API key")
    parser.add_argument('-m', dest='_user_mail', help="User's e-mail address")
    params = parser.parse_args()

    _account_name = params._user_name
    _account_api_key = params._user_key
    _mail = params._user_mail

    if _account_name is None or _account_api_key is None:
        if (_account_name is None and _account_api_key is not None) or (_account_name is not None and _account_api_key is None):
            raise MissingArgumentsException("Please use both -u and -k arguments, or none to use ~/.rackspace.ini")

        else:
            raise NoArgumentsError()


def __parse_config_file():
    global _account_name, _account_api_key, _mail

    if not os.path.isfile(os.path.expanduser("~/.dmpop")):
        raise FileNotFoundError()
    config = ConfigParser()
    config.read(os.path.expanduser("~/.dmpop"))
    if "Rackspace" in config.sections():
        if "username" in config.options("Rackspace") and "apikey" in config.options("Rackspace"):
            _account_name = config.get("Rackspace", "username")
            _account_api_key = config.get("Rackspace", "apikey")
            _mail = config.get("Rackspace", "usermail")

        else:
            raise MissingArgumentsException("Your configuration file contains errors. "
                                            "Please check it, and rerun the program")
    else:
        raise MissingArgumentsException("Your configuration file misses [Rackspace] section.")


if __name__ == '__main__':

    main_url = "https://cdn5.clouddrive.com/v1/MossoCloudFS_923043/923043/"
    jateknet_url = "%sclient-scripts/jatek/en.js" % main_url

    try:
        __parse_arguments()
    except NoArgumentsError:
        try:
            __parse_config_file()

            _token_id = rs_get_aut_token(_account_name, _account_api_key)
            rs_send_purge(jateknet_url, _token_id, _mail)

        except FileNotFoundError:
            print("No configuration file found", file=sys.stderr)
        except MissingArgumentsException as e:
            print(e, file=sys.stderr)

    except MissingArgumentsException as e:
        print(e, file=sys.stderr)