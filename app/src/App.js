import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockFinderPage from "./StockFinder";
import StockDetailsPage from "./StockDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockFinderPage />} />
        <Route path=":symbol" element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;