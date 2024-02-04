import React, { useState } from "react";
import '../Modules/Forms.css'
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
      const response = await axios.post(`/user/login`, {
        username: username,
        password,
      });

      const result = response.data;
      console.log(result, "result");
      console.log(result.message, "Login successful");

      toast.info(result.message, {
        position: "top-center",
      });
      const token = result.token;

      localStorage.setItem("token", token);
      console.log(token, "Token");

      Navigate("/booklist");
    } catch (error) {

        toast.info("Wrong Crediantials, Please try again!!", {
            position: "top-center",
          });
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
