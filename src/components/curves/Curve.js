import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { CURVEPOINTS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const Curve = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [curves, setCurves] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    const getCurves = async () => {
      try {
        const data = await fetchResource(CURVEPOINTS_ENDPOINT, "curve-points");
        setCurves(data);
      } catch (error) {
        console.log(`Error while fetching curves: ${error}`);
      }
    };
    getCurves();
  }, [timestamp]);

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/curves/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <>
      <h1>Curves</h1>
      <Link className="btn btn-primary" to="/curves/new">New</Link>
      <Outlet />
      {curves.length === 0 ? (
        <p>No curves defined yet</p>
      ) : (
        <DataTable
          data={curves}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
};

export default Curve;