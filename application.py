import json
import urllib

import flask
from flask import session

import requests

from config import Config
from helpers import pubnub_helpers

application = flask.Flask(__name__)


@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def hello_world(path):
    if flask.request.args.get('o'):
        endpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?'
        options = {
            "client_id": Config.get('microsoft_client_id'),
            "redirect_uri": Config.get('root_url'),
            "response_type": 'code',
            "scope": 'Files.Read'
        }
        params = urllib.parse.urlencode(options)
        return flask.redirect(endpoint + params)
    elif flask.request.args.get('code'):
        code = flask.request.args.get('code')
        options = {
            "client_id": Config.get('microsoft_client_id'),
            "client_secret": Config.get('microsoft_secret'),
            "code": code,
            "redirect_uri": Config.get('root_url'),
            "grant_type": "authorization_code",
            "scope": "Files.Read"
        }
        resp = requests.post(
            'https://login.microsoftonline.com/common/oauth2/v2.0/token?',
            data=options,
            headers ={'Content-Type':'application/x-www-form-urlencoded', 'Accept':'application/json'}
        )

        resp = json.loads(resp.text)
        try:
            token = resp['access_token']
        except KeyError:
            current_user = json.dumps(session.get('user', None))
            return flask.render_template(
                'index.html',
                currentUser=current_user
            )
        user_info = json.loads(requests.get(
            'https://graph.microsoft.com/v1.0/me',
            headers = {'Authorization': "Bearer {0}".format(token)}
        ).text)

        pubnub_helpers.publish_user_info(user_info)
        current_user = json.dumps(session.get('user', None))
        return flask.render_template(
            'index.html',
             currentUser=current_user
        )
    elif flask.request.args.get('out'):
        session['user'] = None
        return flask.render_template(
            'index.html',
            currentUser=json.dumps(None)
        )
    else:
        pubnub_helpers.get_pubnub_user(session.get('user'))
        current_user = json.dumps(session.get('user', None))
        return flask.render_template(
            'index.html',
            currentUser=current_user
        )

application.secret_key = Config.get('secret_key')

if __name__ == "__main__":
    application.debug = True
    application.run()
