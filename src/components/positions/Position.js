import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { POSITIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const Position = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [positions, setPositions] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchResource(POSITIONS_ENDPOINT, "positions");
        setPositions(data);
      } catch (err) {
        console.error("Failed to fetch positions:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPositions();
  }, [timestamp]);

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/positions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  return (
    <div className="container mt-4">
      <h2>Positions</h2>
      <Link className="btn btn-primary mb-3" to="/positions/new">
        Add New Position
      </Link>
      <Outlet />
      {loading ? (
        <p>Loading...</p>
      ) : positions.length === 0 ? (
        <p>No positions found.</p>
      ) : (
        <DataTable
          data={positions}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={(event) => setSelectedRowData(event.data)}
        />
      )}
    </div>
  );
};

export default Position;