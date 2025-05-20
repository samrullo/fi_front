// StressScenarioDescription.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenarioDescription = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [descriptions, setDescriptions] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getDescriptions = async () => {
      try {
        const data = await fetchResource(
          STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT,
          "stress-scenario-descriptions"
        );
        setDescriptions(data);
      } catch (error) {
        console.log(`Error fetching scenario descriptions: ${error}`);
      }
    };
    getDescriptions();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/stress-scenario-descriptions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const handleRowClick = (event) => {
    if (editMode) {
      setSelectedRowData(event.data);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Stress Scenario Descriptions</h2>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            id="editModeSwitch"
            checked={editMode}
            onChange={() => setEditMode(!editMode)}
          />
          <label className="form-check-label" htmlFor="editModeSwitch">
            Edit Mode
          </label>
        </div>
      </div>

      <Link className="btn btn-primary mb-3" to="/stress-scenario-descriptions/new">
        New
      </Link>
      <Outlet />
      {descriptions.length === 0 ? (
        <p>No scenario descriptions defined yet</p>
      ) : (
        <DataTable
          data={descriptions}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default StressScenarioDescription;