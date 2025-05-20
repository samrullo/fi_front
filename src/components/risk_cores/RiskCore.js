// src/components/risk_cores/RiskCore.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { RISK_CORES_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const RiskCore = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [riskCores, setRiskCores] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const hiddenColumns = ["id"];

  useEffect(() => {
    const getRiskCores = async () => {
      try {
        const data = await fetchResource(RISK_CORES_ENDPOINT, "risk-cores");
        setRiskCores(data);
      } catch (error) {
        console.log(`Error while fetching risk cores: ${error}`);
      }
    };
    getRiskCores();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/risk-cores/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const columns = [
    { field: "security_name", headerName: "Security Name" },
    { field: "identifier_client", headerName: "Client ID" },
    { field: "curve_name", headerName: "Curve" },
    { field: "risk_date", headerName: "Risk Date" },
    { field: "price", headerName: "Price" },
    { field: "accrued_interest", headerName: "Accrued Interest" },
    { field: "yield_to_maturity", headerName: "YTM (%)" },
    { field: "oas", headerName: "OAS" },
    { field: "discounted_pv", headerName: "Discounted PV" },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Risk Core Records</h1>
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

      <Link className="btn btn-primary mb-3" to="/risk-cores/new">
        Add New RiskCore
      </Link>

      <Outlet />
      {riskCores.length === 0 ? (
        <p>No risk core records found</p>
      ) : (
        <DataTable
          data={riskCores}
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

export default RiskCore;