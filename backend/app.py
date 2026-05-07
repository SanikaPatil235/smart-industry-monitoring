from flask import Flask, jsonify
from flask_cors import CORS
import random
import mysql.connector

app = Flask(__name__)

CORS(app)

# MySQL Connection

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sanika@1234",
    database="industry_monitoring"
)

cursor = db.cursor()

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

        # Store Data in MySQL

        query = """
        INSERT INTO machine_logs
        (machine_name, temperature, status, health)
        VALUES (%s, %s, %s, %s)
        """

        values = (name, temp, status, health)

        cursor.execute(query, values)

        db.commit()

        # Add Data to API Response

        machines.append({
            "name": name,
            "status": status,
            "temp": temp,
            "health": health
        })

    return jsonify(machines)

if __name__ == '__main__':
    app.run(debug=True)