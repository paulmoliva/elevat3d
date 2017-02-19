import os


class Config:
    config = {
        'microsoft_client_id': 'msid',
        'microsoft_secret': 'msecretid',
        'root_url': 'http://localhost:5000',
        'pubnub_subscribe_key': 'hello',
        'pubnub_publish_key': 'world',
        'secret_key': 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    }

    @staticmethod
    def get(config_name):
        found = os.getenv(config_name)
        if not found:
            found = Config.config.get(config_name)
        return found
