import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { SCENARIO_POSITIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const ScenarioPosition = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [positions, setPositions] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const hiddenColumns = ["id", "scenario", "security", "risk_scenario"];

  // CSV Export
  const exportToCSV = (data, filename = "scenario_positions.csv") => {
    if (!data.length) return;

    const visibleKeys = Object.keys(data[0]).filter((key) => !hiddenColumns.includes(key));
    const header = visibleKeys.join(",");
    const rows = data.map((row) =>
      visibleKeys.map((key) => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(",")
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchResource(SCENARIO_POSITIONS_ENDPOINT, "scenario-positions");

        const flattened = data.map((item) => {
          const scenario = item.scenario || {};
          const scenarioDetails = scenario.scenario_details || {};
          const shocks = scenario.curve_point_shocks || [];
          const firstShock = shocks[0] || {};
          const curve = firstShock.curve_point_details || {};
          const bond = item.security || {};

          return {
            ...item,
            scenario_name: scenarioDetails.name || "",
            period_number: scenario.period_number ?? "",
            simulation_number: scenario.simulation_number ?? "",
            curve_name: curve.curve_name || "",
            curve_adate: curve.adate || "",
            identifier_client: bond.identifier_client || "",
            asset_name: bond.asset_name || "",
            asset_currency: bond.currency || "",
            coupon: bond.fixed_coupon || "",
            maturity: bond.maturity || ""
          };
        });

        setPositions(flattened);
      } catch (err) {
        console.error("Failed to fetch scenario positions:", err);
      }
    };

    loadPositions();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/scenario-positions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const columns = [
    { field: "scenario_name", headerName: "Scenario Name" },
    { field: "period_number", headerName: "Period #" },
    { field: "simulation_number", headerName: "Simulation #" },
    { field: "curve_name", headerName: "Curve" },
    { field: "curve_adate", headerName: "As-of Date" },
    { field: "identifier_client", headerName: "Security ID" },
    { field: "asset_name", headerName: "Asset Name" },
    { field: "asset_currency", headerName: "Currency" },
    { field: "coupon", headerName: "Coupon" },
    { field: "maturity", headerName: "Maturity" },
    { field: "portfolio_name", headerName: "Portfolio" },
    { field: "position_date", headerName: "Position Date" },
    { field: "lot_id", headerName: "Lot ID" },
    { field: "quantity", headerName: "Quantity" },
    { field: "book_price", headerName: "Book Price" },
    { field: "book_value", headerName: "Book Value" },
    { field: "discounted_value", headerName: "Discounted Value" },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Scenario Positions</h2>
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

      <div className="d-flex mb-3">
        <Link className="btn btn-primary" to="/scenario-positions/new">
          Add New Scenario Position
        </Link>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => exportToCSV(positions)}
        >
          Download CSV
        </button>
      </div>

      <Outlet />

      {positions.length === 0 ? (
        <p>No scenario positions defined yet</p>
      ) : (
        <DataTable
          data={positions}
          columns={columns}
          hiddenColumns={hiddenColumns}
          width_pct={100}
          onRowClick={(event) => {
            if (editMode) {
              setSelectedRowData(event.data);
            }
          }}
        />
      )}
    </div>
  );
};

export default ScenarioPosition;