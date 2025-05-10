// src/components/vanilla_bonds/VanillaBond.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const VanillaBond = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [bonds, setBonds] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    const getBonds = async () => {
      try {
        const data = await fetchResource(VANILLA_BONDS_ENDPOINT);
        setBonds(data);
      } catch (error) {
        console.log(`Error while fetching vanilla bonds: ${error}`);
      }
    };
    getBonds();
  }, [timestamp]);

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/vanilla-bonds/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <div className="container mt-4">
      <h1>Vanilla Bond SecMaster</h1>
      <Link className="btn btn-primary mb-3" to="/vanilla-bonds/new">
        Add New Bond
      </Link>
      <Outlet />
      {bonds.length === 0 ? (
        <p>No bonds defined yet</p>
      ) : (
        <DataTable
          data={bonds}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default VanillaBond;