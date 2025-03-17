import React, { useState } from "react";
import "./Singin.css";
const Signin = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    role: "",
  });

  function handleChange(e) {
    const { name, value } = e.target; 
    setRegister({
      ...register,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("form is submitted" , register);
    alert("you register successfully!");
    
    setRegister({
      username: "",
      password: "",
      role: "",
    });
  }
  return (
    <>
      <h1>Signin form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={register.username}
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="password"
          value={register.password}
          name="password"
          onChange={handleChange}
          required
        />
        <select value={register.role} name="role" onChange={handleChange} required>
          <option value="">select role</option>
          <option value="author">author</option>
          <option value="admin">admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Signin;
