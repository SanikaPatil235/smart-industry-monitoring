import { useEffect, useState } from "react";
import Login from "./Login";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const [machines, setMachines] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const chartData = {
    labels: machines.map(machine => machine.name),

    datasets: [
      {
        label: "Temperature",
        data: machines.map(machine => machine.temp),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626"
        ]
      }
    ]
  };

  useEffect(() => {

    const fetchData = () => {

      fetch("http://127.0.0.1:5000/machines")
        .then((response) => response.json())
        .then((data) => {
          setMachines(data);
        });

    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);

  }, []);
    if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  return (

    <div style={{
      display: "flex",
      fontFamily: "Arial"
    }}>

      {/* Sidebar */}

      <div style={{
        width: "220px",
        height: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}>

        <h2>Industry System</h2>

        <hr />

        <p>Dashboard</p>
        <p>Machines</p>
        <p>Alerts</p>
        <p>Analytics</p>

      </div>

      {/* Main Content */}

      <div style={{
        flex: 1,
        padding: "20px",
        background: "#f3f4f6",
        minHeight: "100vh"
      }}>

        <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>

  <h1>Smart Industry Monitoring Dashboard</h1>

  <button
    onClick={() => setIsLoggedIn(false)}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >

    Logout

  </button>

</div>

        {/* Top Cards */}

        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}>

          <div style={{
            background: "linear-gradient(to right, #2563eb, #1d4ed8)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}>
            <h3>Total Machines</h3>
            <h2>{machines.length}</h2>
          </div>

          <div style={{
            background: "linear-gradient(to right, #16a34a, #15803d)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}>
            <h3>Running Machines</h3>

            <h2>
              {
                machines.filter(
                  machine => machine.status === "Running"
                ).length
              }
            </h2>

          </div>

          <div style={{
            background: "linear-gradient(to right, #dc2626, #b91c1c)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px"
          }}>
            <h3>Critical Alerts</h3>

            <h2>
              {
                machines.filter(
                  machine => machine.status === "WARNING"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Machine Table */}

        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>

          <h2>Machine Status</h2>

          <table
            width="100%"
            cellPadding="15"
            style={{
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr style={{
                background: "#e5e7eb"
              }}>
                <th>Machine</th>
                <th>Status</th>
                <th>Temperature</th>
                <th>Health</th>
              </tr>

            </thead>

            <tbody>

              {machines.map((machine, index) => (

                <tr
                  key={index}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}
                >

                  <td>{machine.name}</td>

                  <td>

                    <span style={{
                      background:
                        machine.status === "WARNING"
                          ? "#ffcccc"
                          : "#ccffcc",

                      color:
                        machine.status === "WARNING"
                          ? "red"
                          : "green",

                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold"
                    }}>

                      {machine.status}

                    </span>

                  </td>

                  <td>{machine.temp}°C</td>

                  <td>

                    <div style={{
                      background: "#e5e7eb",
                      borderRadius: "10px",
                      width: "120px",
                      margin: "auto"
                    }}>

                      <div style={{
                        width: `${machine.health}%`,
                        background:
                          machine.health > 80
                            ? "green"
                            : machine.health > 65
                            ? "orange"
                            : "red",

                        color: "white",
                        padding: "5px",
                        borderRadius: "10px",
                        textAlign: "center"
                      }}>

                        {machine.health}%

                      </div>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Analytics */}

        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>

          <h2>Temperature Analytics</h2>

          <Bar data={chartData} />

        </div>

        {/* Alerts */}

        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>

          <h2>System Alerts</h2>

          {

            machines.filter(
              machine => machine.status === "WARNING"
            ).length === 0

            ?

            <p style={{ color: "green" }}>
              No active alerts
            </p>

            :

            machines.map((machine, index) => (

              machine.status === "WARNING" && (

                <div
                  key={index}
                  style={{
                    background: "#ffe5e5",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    color: "red"
                  }}
                >

                  ALERT:
                  {" "}
                  {machine.name}
                  {" "}
                  temperature exceeded safe limit

                </div>

              )

            ))

          }

        </div>

      </div>

    </div>

  );
}

export default App;