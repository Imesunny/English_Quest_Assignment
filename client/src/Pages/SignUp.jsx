import React, { useState } from "react";
import "../Modules/Forms.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const notify = (message) => toast(message);
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        username,
        password,
        roles: [selectedRole],
      });

      const result = response.data;
      console.log(result.message, "user registration successful");
      toast.info(result.message, {
        position: "top-center",
      });
      Navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegistration} className="formss">
        <h2>User Registration</h2>
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
        <label>
          <input
            type="radio"
            name="role"
            value="CREATOR"
            checked={selectedRole === "CREATOR"}
            onChange={() => setSelectedRole("CREATOR")}
          />
          CREATOR
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="role"
            value="VIEW_ALL"
            checked={selectedRole === "VIEW_ALL"}
            onChange={() => setSelectedRole("VIEW_ALL")}
          />
          VIEW_ALL
        </label>
        <br />
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default SignUp;
