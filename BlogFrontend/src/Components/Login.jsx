import React, { useState } from "react";

const Login = () => {
  // State for login credentials
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted", login);
    alert("You have logged in successfully!");

    // Reset form fields
    setLogin({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={login.username}
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="password" // Use type="password" for security
          placeholder="Password"
          value={login.password}
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;