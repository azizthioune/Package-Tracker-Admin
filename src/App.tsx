import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PackagesList from "./components/Packages/PackagesList";
import AddPackage from "./components/Packages/AddPackage";
import DeliveriesList from "./components/Deliveries/DeliveriesList";
import AddDelivery from "./components/Deliveries/AddDelivery";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/packages" className="navbar-brand">
          Aziz Thioune 𓃵
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/packages"} className="nav-link">
              Packages
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/deliveries"} className="nav-link">
              Deliveries
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PackagesList />} />
          <Route path="/packages" element={<PackagesList />} />
          <Route path="/add-package" element={<AddPackage />} />
          <Route path="/deliveries" element={<DeliveriesList />} />
          <Route path="/add-delivery" element={<AddDelivery />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
