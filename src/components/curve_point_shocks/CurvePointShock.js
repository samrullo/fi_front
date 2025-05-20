import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { CURVE_POINT_SHOCKS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurvePointShockList = () => {
  const [shocks, setShocks] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShocks = async () => {
      try {
        const data = await fetchResource(CURVE_POINT_SHOCKS_ENDPOINT, "curve-point-shocks");

        const flattened = data.map((shock) => {
          const curve = shock.curve_point_details || {};
          const scenario = shock.stress_scenario_details || {};

          return {
            ...shock,
            scenario_name: scenario.scenario_name ?? "",
            period_number: scenario.period_number ?? "",
            simulation_number: scenario.simulation_number ?? "",
            curve_name: curve.curve_name ?? "",
            curve_adate: curve.adate ?? "",
            curve_year: curve.year ?? "",
          };
        });

        setShocks(flattened);
      } catch (err) {
        console.error("Failed to fetch curve point shocks:", err);
      }
    };

    fetchShocks();
  }, []);

  useEffect(() => {
    if (editMode && selectedRow) {
      navigate(`/curve-point-shocks/edit/${selectedRow.id}`);
    }
  }, [selectedRow, editMode, navigate]);

  const columnDefinitions = [
    { field: "scenario_name", headerName: "Scenario", width: 200 },
    { field: "period_number", headerName: "Period", width: 120 },
    { field: "simulation_number", headerName: "Simulation", width: 130 },
    { field: "curve_name", headerName: "Curve Name", width: 180 },
    { field: "curve_adate", headerName: "Curve Date", width: 150 },
    { field: "curve_year", headerName: "Curve Year", width: 120 },
    { field: "shock_size", headerName: "Shock Size (%)", width: 140 },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Curve Point Shocks</h2>
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

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/curve-point-shocks/new")}
      >
        New Shock
      </button>

      <DataTable
        data={shocks}
        columns={columnDefinitions}
        hiddenColumns={[
          "id",
          "curve_point",
          "curve_point_details",
          "stress_scenario",
          "stress_scenario_details",
        ]}
        onRowClick={(event) => {
          if (editMode) {
            setSelectedRow(event.data);
          }
        }}
        width_pct={100}
      />
    </div>
  );
};

export default CurvePointShockList;