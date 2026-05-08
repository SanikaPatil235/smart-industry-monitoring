from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)

CORS(app)

@app.route('/machines', methods=['GET'])
def get_machines():

    machines = []

    machine_names = [
        "Pump_1",
        "Motor_2",
        "Generator_1"
    ]

    for name in machine_names:

        temp = random.randint(60, 100)

        status = "Running"

        if temp > 90:
            status = "WARNING"

        health = 100 - (temp - 60)

        if health < 50:
            health = 50

        machines.append({
            "name": name,
            "status": status,
            "temp": temp,
            "health": health
        })

    return jsonify(machines)

if __name__ == '__main__':
    app.run(debug=True)