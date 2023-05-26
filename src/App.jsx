import { useState } from "react";
import "./App.css";
import Mian from "./Comp/Mian";
import History from "./Comp/History";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Mian />} path="/" />
          <Route element={<History />} path="history" />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
