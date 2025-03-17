import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Blogs from "./Components/Blogs";
import Create from "./Components/Create";
import Myblog from "./Components/Myblog";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import Navbar from "./Navbar/Navbar";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myblog" element={<Myblog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
