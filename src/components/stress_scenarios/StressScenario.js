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

  useEffect(() => {
    const getScenarios = async () => {
      try {
        const data = await fetchResource(STRESS_SCENARIOS_ENDPOINT, "stress-scenarios");

        // Flatten nested curve_details while keeping curve FK
        const flattened = data.map((item) => {
          const curve = item.curve_details || {};
          return {
            ...item,
            curve_id: item.curve, // preserve FK
            curve_name: curve.curve_name || "",
            adate: curve.adate || "",
            year: curve.year || "",
            rate: curve.rate || "",
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
    if (selectedRowData) {
      navigate(`/stress-scenarios/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <>
      <h1>Stress Scenarios</h1>
      <Link className="btn btn-primary mb-3" to="/stress-scenarios/new">
        New
      </Link>
      <Outlet />
      {scenarios.length === 0 ? (
        <p>No stress scenarios defined yet</p>
      ) : (
        <DataTable
          data={scenarios}
          hiddenColumns={["id", "curve", "curve_details"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
};

export default StressScenario;