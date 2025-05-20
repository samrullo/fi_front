import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { CURVEPOINTS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurvePoint = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [curvePoints, setCurvePoints] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getCurvePoints = async () => {
      try {
        const data = await fetchResource(CURVEPOINTS_ENDPOINT, "curve-points");
        setCurvePoints(data);
      } catch (error) {
        console.log(`Error while fetching curve points: ${error}`);
      }
    };
    getCurvePoints();
  }, [timestamp]);

  useEffect(() => {
    if (editMode && selectedRowData) {
      navigate(`/curve-points/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData, editMode, navigate]);

  const handleRowClick = (event) => {
    if (editMode) {
      setSelectedRowData(event.data);
    }
  };

  const columns = [
    { field: "curve_description", headerName: "Curve ID" },
    { field: "curve_name", headerName: "Curve Name" },
    { field: "curve_desc", headerName: "Description" },
    { field: "adate", headerName: "As-of Date" },
    { field: "year", headerName: "Tenor (Years)" },
    { field: "rate", headerName: "Rate (%)" },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Curve Points</h2>
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

      <Link className="btn btn-primary mb-3" to="/curve-points/new">
        New
      </Link>

      <Outlet />
      {curvePoints.length === 0 ? (
        <p>No curve points defined yet</p>
      ) : (
        <DataTable
          data={curvePoints}
          columns={columns}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default CurvePoint;