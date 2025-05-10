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
    if (selectedRowData) {
      navigate(`/curve-descriptions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const handleRowClick = (event) => {
    setSelectedRowData(event.data);
  };

  return (
    <>
      <h1>Curve Descriptions</h1>
      <Link className="btn btn-primary" to="/curve-descriptions/new">
        New
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
    </>
  );
};

export default CurveDescription;
