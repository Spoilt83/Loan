from flask import Flask, request, jsonify
from flask import send_from_directory
#from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='loan/build', static_url_path='')
CORS(app)

@app.route('/api', methods=['POST'])
@cross_origin()
def loan_application():
    data = request.json
    requested_amount = float(data['amountRequested'])
    decision = ''
    if requested_amount > 50000:
        decision = 'Refused'
    elif requested_amount == 50000:
        decision = 'Undecided'
    else:
        decision = 'Approved'
    return jsonify({'decision': decision})

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()