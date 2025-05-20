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
  const [editMode, setEditMode] = useState(false);
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
    if (editMode && selectedRowData) {
      navigate(`/vanilla-bonds/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Vanilla Bond SecMaster</h2>
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