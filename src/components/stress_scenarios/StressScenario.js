import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenario = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [scenarios, setScenarios] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getScenarios = async () => {
      try {
        const data = await fetchResource(STRESS_SCENARIOS_ENDPOINT, "stress-scenarios");

        const flattened = data.map((item) => {
          const scenario = item.scenario_details || {};
          const shocks = item.curve_point_shocks || [];
          const firstShock = shocks[0] || {};
          const curve = firstShock.curve_point_details || {};

          return {
            ...item,
            scenario_name: scenario.name || "",
            shock_count: shocks.length,
            curve_name: curve.curve_name || "",
            curve_adate: curve.adate || "",
          };
        });

        setScenarios(flattened);
      } catch (error) {
        console.log(`Error while fetching stress scenarios: ${error}`);
      }
    };

    getScenarios();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/stress-scenarios/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const handleRowClick = (event) => {
    if (editMode) {
      setSelectedRowData(event.data);
    }
  };

  const columnDefinitions = [
    { field: "scenario_name", headerName: "Scenario Name", width: 200 },
    { field: "period_number", headerName: "Period #", width: 120 },
    { field: "simulation_number", headerName: "Simulation #", width: 130 },
    { field: "period_length", headerName: "Length (years)", width: 140 },
    { field: "shock_count", headerName: "Shock Count", width: 120 },
    { field: "curve_name", headerName: "Curve Name", width: 150 },
    { field: "curve_adate", headerName: "As of Date", width: 130 },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Stress Scenarios</h1>
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

      <Link className="btn btn-primary mb-3" to="/stress-scenarios/new">
        New
      </Link>

      <Outlet />
      {scenarios.length === 0 ? (
        <p>No stress scenarios defined yet</p>
      ) : (
        <DataTable
          data={scenarios}
          columns={columnDefinitions}
          hiddenColumns={["id", "scenario", "scenario_details", "curve_point_shocks"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default StressScenario;