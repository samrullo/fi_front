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
    if (selectedRowData) {
      navigate(`/curve-points/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <>
      <h1>Curve Points</h1>
      <Link className="btn btn-primary" to="/curve-points/new">
        New
      </Link>
      <Outlet />
      {curvePoints.length === 0 ? (
        <p>No curve points defined yet</p>
      ) : (
        <DataTable
          data={curvePoints}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
};

export default CurvePoint;