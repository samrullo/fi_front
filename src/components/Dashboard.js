import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <h2>Positions</h2>
      <div className="list-group">
        <Link to="/positions" className="list-group-item">
          View Positions
        </Link>
        <Link to="/positions/new" className="list-group-item">
          Add New Position
        </Link>
        <Link to="/upload_positions" className="list-group-item">
          Upload Positions from CSV
        </Link>
      </div>

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
      </div>

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