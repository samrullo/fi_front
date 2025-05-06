import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";

const CurvesByDate = () => {
  const { curveName, adate } = useParams();
  const [curves, setCurves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredCurve = async () => {
      try {
        const res = await fetch(`${API_HOSTNAME}/fi/v1/curves/by-date/${curveName}/${adate}/`);
        if (!res.ok) throw new Error("Failed to fetch curve");
        const data = await res.json();
        setCurves(data);
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCurve();
  }, [curveName, adate]);

  return (
    <div className="container mt-4">
      <h2>Curve: <strong>{curveName}</strong> on <strong>{adate}</strong></h2>
      {loading ? (
        <p>Loading...</p>
      ) : curves.length === 0 ? (
        <p>No data found for this curve and date.</p>
      ) : (
        <DataTable data={curves} hiddenColumns={["id"]} width_pct={100} />
      )}
    </div>
  );
};

export default CurvesByDate;