import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./layout/Register";
import Login from "./layout/Login";
import "./App.css";
import Main from "./layout/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
