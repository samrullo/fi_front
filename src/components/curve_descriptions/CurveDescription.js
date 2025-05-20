// CurveDescription.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { CURVES_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveDescription = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [curveDescriptions, setCurveDescriptions] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getDescriptions = async () => {
      try {
        const data = await fetchResource(CURVES_DESCRIPTIONS_ENDPOINT, "curve-descriptions");
        setCurveDescriptions(data);
      } catch (error) {
        console.log(`Error while fetching curve descriptions: ${error}`);
      }
    };
    getDescriptions();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/curve-descriptions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const handleRowClick = (event) => {
    if (editMode) {
      setSelectedRowData(event.data);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Curve Descriptions</h2>
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

      <Link className="btn btn-primary mb-3" to="/curve-descriptions/new">
        Add New Curve Description
      </Link>

      <Outlet />

      {curveDescriptions.length === 0 ? (
        <p>No curve descriptions found</p>
      ) : (
        <DataTable
          data={curveDescriptions}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default CurveDescription;