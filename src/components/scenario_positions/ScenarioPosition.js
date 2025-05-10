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

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchResource(SCENARIO_POSITIONS_ENDPOINT, "scenario-positions");

        const flattened = data.map((item) => {
          const scenario = item.scenario || {};
          const scenarioDetails = scenario.scenario_details || {};
          const curve = scenario.curve_details || {};
          const curveName = curve.curve_name || {};
          const bond = item.security || {};

          return {
            ...item,
            scenario_name: scenarioDetails.name || "",
            period_number: scenario.period_number ?? "",
            simulation_number: scenario.simulation_number ?? "",
            curve_name: curveName.name || "",
            curve_adate: curve.adate || "",
            curve_year:curve.year || "",
            shock_size: scenario.parallel_shock_size ?? "",
            identifier_client: bond.identifier_client || "",
            asset_name: bond.asset_name || "",
            asset_currency: bond.currency || "",
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
    if (selectedRowData) {
      navigate(`/scenario-positions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const columns = [
    { field: "scenario_name", headerName: "Scenario Name" },
    { field: "period_number", headerName: "Period #" },
    { field: "simulation_number", headerName: "Simulation #" },
    { field: "curve_name", headerName: "Curve" },
    { field: "curve_adate", headerName: "As-of Date" },
    {field:"curve_year",headerName:"Curve Year"},
    { field: "shock_size", headerName: "Shock Size (%)" },
    { field: "identifier_client", headerName: "Security ID" },
    { field: "asset_name", headerName: "Asset Name" },
    { field: "asset_currency", headerName: "Currency" },
    { field: "portfolio_name", headerName: "Portfolio" },
    { field: "position_date", headerName: "Position Date" },
    { field: "lot_id", headerName: "Lot ID" },
    { field: "quantity", headerName: "Quantity" },
    { field: "book_price", headerName: "Book Price" },
    { field: "book_value", headerName: "Book Value" },
  ];

  return (
    <div className="container mt-4">
      <h2>Scenario Positions</h2>
      <Link className="btn btn-primary mb-3" to="/scenario-positions/new">
        Add New Scenario Position
      </Link>
      <Outlet />
      {positions.length === 0 ? (
        <p>No scenario positions defined yet</p>
      ) : (
        <DataTable
          data={positions}
          columns={columns}
          hiddenColumns={["id","scenario","security"]}
          width_pct={100}
          onRowClick={(event) => setSelectedRowData(event.data)}
        />
      )}
    </div>
  );
};

export default ScenarioPosition;