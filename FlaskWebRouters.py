from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Serve the index.html at the root URL
@app.route('/')
def home():
	return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'index.html')

# Optionally, serve static files if needed in the future
# @app.route('/<path:filename>')
# def static_files(filename):
#     return send_from_directory(os.path.dirname(os.path.abspath(__file__)), filename)

if __name__ == '__main__':
	app.run(debug=True)
