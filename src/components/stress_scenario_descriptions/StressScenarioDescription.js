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
    if (selectedRowData) {
      navigate(`/stress-scenario-descriptions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <div className="container mt-4">
      <h2>Stress Scenario Descriptions</h2>
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