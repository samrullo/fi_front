import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="list-group">
        <Link to="/positions/20250425" className="list-group-item">US IG Positions</Link>
        <Link to="/upload_positions" className="list-group-item">Upload Positions</Link>
      </div>

      <h2>Curves</h2>
      <div className="list-group">
        <Link to="/curves" className="list-group-item">View Curves</Link>
        <Link to="/curves-by-date" className="list-group-item">Curves by date and name</Link>
        <Link to="/curves/new" className="list-group-item">Add New Curve</Link>
        <Link to="/curves/bulk" className="list-group-item">Add Curve in bulk</Link>
      </div>

      <h2>Stress Scenarios</h2>
      <div className="list-group">
        <Link to="/stress-scenarios" className="list-group-item">Stress Scenarios</Link>
        <Link to="/stress-scenarios/new" className="list-group-item">Add New Scenario</Link>
        <Link to="/upload-stress-scenarios" className="list-group-item">Add Stress Scenarios in bulk</Link>
      </div>
    </>
  );
};

export default Dashboard;
