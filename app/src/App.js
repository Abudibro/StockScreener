import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockFinderPage from "./StockFinder";
import StockDetailsPage from "./StockDetailsPage";
import Nav from "./Nav";

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