import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "../GenericDataComponents/DataTable";
import { SCENARIO_POSITIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const ScenarioPositionsByPortfolioNameAndPositionDate = () => {
  const navigate = useNavigate();

  const [portfolioName, setPortfolioName] = useState("");
  const [positionDate, setPositionDate] = useState("");
  const [positions, setPositions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loading, setLoading] = useState(false);

  const hiddenColumns = ["id", "scenario", "security", "risk_scenario"];

  const fetchFilteredPositions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SCENARIO_POSITIONS_ENDPOINT}by_portfolio_and_date/`, {
        params: {
          portfolio_name: portfolioName,
          position_date: positionDate,
        },
      });

      const data = response.data;

      

      setPositions(data);
    } catch (error) {
      console.error("❌ Failed to fetch filtered scenario positions:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (editMode && selectedRowData) {
    navigate(`/scenario-positions/edit/${selectedRowData.id}`);
  }

  const columns = [
    { field: "portfolio_name", headerName: "Portfolio" },
    { field: "position_date", headerName: "Position Date" },
    { field: "scenario_name", headerName: "Scenario Name" },
    { field: "period_number", headerName: "Period #" },
    { field: "simulation_number", headerName: "Simulation #" },
    { field: "curve_name", headerName: "Curve" },
    { field: "identifier_client", headerName: "Security ID" },
    { field: "asset_name", headerName: "Asset Name" },
    { field: "asset_currency", headerName: "Currency" },
    { field: "coupon", headerName: "Coupon" },
    { field: "maturity", headerName: "Maturity" },
    { field: "lot_id", headerName: "Lot ID" },
    { field: "quantity", headerName: "Quantity" },
    { field: "book_price", headerName: "Book Price" },
    { field: "book_value", headerName: "Book Value" },
    { field: "discounted_price", headerName: "Discounted Price" },
    { field: "discounted_value", headerName: "Discounted Value" },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Scenario Positions Filtered By Portfolio and Position Date</h2>
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

      <div className="d-flex gap-2 mb-3 align-items-end">
        <div>
          <label className="form-label">Portfolio Name</label>
          <input
            className="form-control"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            placeholder="e.g. Portfolio1"
          />
        </div>

        <div>
          <label className="form-label">Position Date</label>
          <input
            className="form-control"
            type="date"
            value={positionDate}
            onChange={(e) => setPositionDate(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={fetchFilteredPositions} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Positions"}
        </button>

        <Link className="btn btn-success ms-2" to="/scenario-positions/new">
          Add New
        </Link>

        <button className="btn btn-secondary ms-2" onClick={() => exportToCSV(positions)}>
          Download CSV
        </button>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading scenario positions...</div>
      ) : positions.length === 0 ? (
        <p>No scenario positions found.</p>
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

export default ScenarioPositionsByPortfolioNameAndPositionDate;