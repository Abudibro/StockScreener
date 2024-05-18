import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockFinderPage from "./StockFinder/index.js";
import StockDetailsPage from "./StockDetailsPage/index.js";
import Nav from "./Nav.js";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<StockFinderPage />} />
        <Route path=":symbol" element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;