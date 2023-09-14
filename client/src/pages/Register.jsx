import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        // If the server responds with an error
        setError(err.response.data.message);
        if (err.response.status === 409) {
          alert("User already exists!");
        }
      } else {
        // Handle unexpected errors gracefully
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Register
        </button>
        {err && <p>{err}</p>}
        <br />
        <span>
          Do you have an account?{" "}
          <Link className="button" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
