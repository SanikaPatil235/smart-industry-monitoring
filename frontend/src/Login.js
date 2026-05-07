function Login({ onLogin }) {

  const handleLogin = () => {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

      onLogin();

    } else {

      alert("Invalid Credentials");

    }

  };

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6"
    }}>

      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center" }}>
          Industry Monitoring Login
        </h2>

        <input
          id="username"
          placeholder="Username"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px"
          }}
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >

          Login

        </button>

      </div>

    </div>

  );
}

export default Login;