import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
  // Initial state
  const initialData = {
    username: '',
    password: '',
    role: 'author', // Default role
  };

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validation
    if (!data.username || !data.password) {
      alert('Username and password are required!');
      return;
    }

    setLoading(true); // Disable the submit button

    try {
      // Send POST request to register user
      const response = await axios.post('http://localhost:3000/users/register', data);

      if (response.status === 201) {
        alert('User registered successfully!');
        setData(initialData); // Reset the form fields
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with an error status code (e.g., 400, 409)
        if (error.response.status === 409) {
          alert('Username already exists!');
        } else {
          alert('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // No response received from the server
        alert('No response from the server. Please check your connection.');
      } else {
        // Something went wrong while setting up the request
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Re-enable the submit button
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <input
          type="text"
          placeholder="username"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <br />

        {/* Password Input */}
        <input
          type="text" // Use type="password" for security
          placeholder="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <br />

        {/* Role Select Dropdown */}
        <select name="role" value={data.role} onChange={handleChange}>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
        </select>
        <br />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </>
  );
};

export default Signup;