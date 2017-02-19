import flask, time
from flask import session
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNOperationType, PNStatusCategory
from config import Config

pnconfig = PNConfiguration()
pnconfig.subscribe_key = Config.get('pubnub_subscribe_key')
pnconfig.publish_key = Config.get('pubnub_publish_key')
pnconfig.ssl = False

pubnub = PubNub(pnconfig)


class MySubscribeCallback(SubscribeCallback):
    def status(self, pubnub, status):
        pass
        # The status object returned is always related to subscribe but could contain
        # information about subscribe, heartbeat, or errors
        # use the operationType to switch on different options
        if status.operation == PNOperationType.PNSubscribeOperation \
                or status.operation == PNOperationType.PNUnsubscribeOperation:
            if status.category == PNStatusCategory.PNConnectedCategory:
                pass
                # This is expected for a subscribe, this means there is no error or issue whatsoever
            elif status.category == PNStatusCategory.PNReconnectedCategory:
                pass
                # This usually occurs if subscribe temporarily fails but reconnects. This means
                # there was an error but there is no longer any issue
            elif status.category == PNStatusCategory.PNDisconnectedCategory:
                pass
                # This is the expected category for an unsubscribe. This means there
                # was no error in unsubscribing from everything
            elif status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
                pass
                # This is usually an issue with the internet connection, this is an error, handle
                # appropriately retry will be called automatically
            elif status.category == PNStatusCategory.PNAccessDeniedCategory:
                pass
                # This means that PAM does allow this client to subscribe to this
                # channel and channel group configuration. This is another explicit error
            else:
                pass
                # This is usually an issue with the internet connection, this is an error, handle appropriately
                # retry will be called automatically
        elif status.operation == PNOperationType.PNSubscribeOperation:
            # Heartbeat operations can in fact have errors, so it is important to check first for an error.
            # For more information on how to configure heartbeat notifications through the status
            # PNObjectEventListener callback, consult <link to the PNCONFIGURATION heartbeart config>
            if status.is_error():
                pass
                # There was an error with the heartbeat operation, handle here
            else:
                pass
                # Heartbeat operation was successful
        else:
            pass
            # Encountered unknown status type

    def presence(self, pubnub, presence):
        pass  # handle incoming presence data

    def message(self, pubnub, message):
        if hasattr(message, 'user'):
            session['user'] = message.user
            print(session['user'])


def publish_callback(result, status):
    pass


def publish_user_info(user):
    pubnub.publish().channel('elevate-users').message(user).async(publish_callback)
    session['user'] = user
    print('go')


def get_pubnub_user(user):
    if not user:
        return ''
    pubnub.add_listener(MySubscribeCallback())
    pubnub.subscribe().channels('users-{0}'.format(user['id'])).execute()
    print('subscribed to ' + 'users-{0}'.format(user['id']))
    pubnub.publish().channel('elevate-users').message({'request_user': user}).async(publish_callback)
    time.sleep(1)

