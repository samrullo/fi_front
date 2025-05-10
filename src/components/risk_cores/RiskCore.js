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
    if (selectedRowData) {
      navigate(`/risk-cores/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <div className="container mt-4">
      <h1>Risk Core Records</h1>
      <Link className="btn btn-primary mb-3" to="/risk-cores/new">
        Add New RiskCore
      </Link>
      <Outlet />
      {riskCores.length === 0 ? (
        <p>No risk core records found</p>
      ) : (
        <DataTable
          data={riskCores}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default RiskCore;
