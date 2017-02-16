import flask
application = flask.Flask(__name__)

@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def hello_world(path):
    return flask.render_template('index.html')

if __name__ == "__main__":
    application.debug = True
    application.run()
