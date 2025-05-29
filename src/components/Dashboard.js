import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <p className="lead">
        Welcome to <strong>FI Analytics</strong> — your control center for managing fixed income data, stress testing, curve shocks, and portfolio analytics. Use the tools below to view, create, and upload records across all core modules.
      </p>

      {/* Portfolio Positions */}
      <div className="mb-5">
        <h2>Portfolio Positions</h2>
        <div className="list-group">
          <Link to="/positions" className="list-group-item">
            View Positions
          </Link>
          <Link to="/positions/new" className="list-group-item">
            Add New Position
          </Link>
          <Link to="/upload-positions" className="list-group-item">
            Upload Positions from CSV
          </Link>
        </div>
      </div>

      {/* Scenario Positions */}
      <div className="mb-5">
        <h2>Scenario Positions</h2>
        <div className="list-group">
          <Link to="/scenario-positions" className="list-group-item">
            View Scenario Positions
          </Link>
          <Link to="/scenario-positions/new" className="list-group-item">
            Add New Scenario Position
          </Link>
          <Link to="/upload-scenario-positions" className="list-group-item">
            Upload Scenario Positions from CSV
          </Link>
          <Link to="/scenario-positions/generate" className="list-group-item">
            Generate Scenario Positions from Portfolio
          </Link>
          <Link to="/scenario-positions/by_portfolio_and_date" className="list-group-item">
            Filter Scenario Positions by Portfolio and Date
          </Link>
        </div>
      </div>

      {/* Vanilla Bond SecMaster */}
      <div className="mb-5">
        <h2>Vanilla Bond SecMaster</h2>
        <div className="list-group">
          <Link to="/vanilla-bonds" className="list-group-item">
            View Bonds
          </Link>
          <Link to="/vanilla-bonds/new" className="list-group-item">
            Add New Bond
          </Link>
          <Link to="/upload-vanilla-bonds" className="list-group-item">
            Upload Vanilla Bonds from CSV
          </Link>
        </div>
      </div>

      {/* Risk Core Analytics */}
      <div className="mb-5">
        <h2>Risk Core Analytics</h2>
        <div className="list-group">
          <Link to="/risk-cores" className="list-group-item">
            View Risk Core Data
          </Link>
          <Link to="/risk-cores/new" className="list-group-item">
            Add New Risk Core Record
          </Link>
          <Link to="/upload-risk-cores" className="list-group-item">
            Upload Risk Cores from CSV
          </Link>
        </div>
      </div>

      {/* Yield Curve Data */}
      <div className="mb-5">
        <h2>Curve Data</h2>
        <div className="list-group">
          <Link to="/curve-descriptions" className="list-group-item">
            Manage Curve Descriptions
          </Link>
          <Link to="/curve-points" className="list-group-item">
            View Curve Points
          </Link>
          <Link to="/curves-by-date" className="list-group-item">
            Curve Points by Date and Name
          </Link>
          <Link to="/curve-points/new" className="list-group-item">
            Add New Curve Point
          </Link>
          <Link to="/curve-points/bulk" className="list-group-item">
            Upload Curve Points CSV
          </Link>
        </div>
      </div>

      {/* Curve Point Shocks */}
      <div className="mb-5">
        <h2>Curve Point Shocks</h2>
        <div className="list-group">
          <Link to="/curve-point-shocks" className="list-group-item">
            View Curve Point Shocks
          </Link>
          <Link to="/curve-point-shocks/new" className="list-group-item">
            Add New Curve Point Shock
          </Link>
        </div>
      </div>

      {/* Stress Testing */}
      <div className="mb-5">
        <h2>Stress Scenarios</h2>
        <div className="list-group">
          <Link to="/stress-scenario-descriptions" className="list-group-item">
            Stress Scenario Descriptions
          </Link>
          <Link to="/stress-scenarios" className="list-group-item">
            View Stress Scenarios
          </Link>
          <Link to="/stress-scenarios/new" className="list-group-item">
            Add New Stress Scenario
          </Link>
          <Link to="/upload-stress-scenarios" className="list-group-item">
            Upload Stress Scenarios CSV
          </Link>
        </div>
      </div>

      {/* 📈 Portfolio Analytics */}
      <div className="mb-5">
        <h2>Portfolio Analytics</h2>
        <div className="list-group">
          <Link to="/portfolio-stress-trend" className="list-group-item">
            View Stress Scenario Trend Chart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;