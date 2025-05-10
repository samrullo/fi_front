import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="list-group">
        <Link to="/positions/20250425" className="list-group-item">
          US IG Positions
        </Link>
        <Link to="/upload_positions" className="list-group-item">
          Upload Positions
        </Link>
      </div>

      <h2>Curve Descriptions</h2>
      <div className="list-group">
        <Link to="/curve-descriptions" className="list-group-item">
          Manage Curve Descriptions
        </Link>
      </div>

      <h2>Curve Points</h2>
      <div className="list-group">
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

      <h2>Stress Scenario Descriptions</h2>
      <div className="list-group">
        <Link to="/stress-scenario-descriptions" className="list-group-item">
          Stress Scenario Descriptions
        </Link>
      </div>

      <h2>Stress Scenarios</h2>
      <div className="list-group">
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
    </>
  );
};

export default Dashboard;