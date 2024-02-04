import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const notify = (message) => toast(message);
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username: username,
        password,
      });

      const result = response.data;
      console.log(result.message, "Login successful");

      toast.info(result.message, {
        position: "top-center",
      });
      const token = result.token;

      const { roles } = result;
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));
      console.log(token, "Token");

      Navigate("/booklist");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="formss">
        <h2>User Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
