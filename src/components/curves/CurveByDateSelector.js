import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURVES_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveByDateSelector = () => {
  const [curveName, setCurveName] = useState("");
  const [adate, setAdate] = useState("");
  const [availableCurves, setAvailableCurves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        const res = await fetch(CURVES_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch curves");
        const data = await res.json();

        const uniqueNames = [...new Set(data.map(c => c.curve_name))];
        setAvailableCurves(uniqueNames);
        if (uniqueNames.length > 0) setCurveName(uniqueNames[0]);
      } catch (err) {
        alert("Error loading curve names: " + err.message);
      }
    };

    fetchCurves();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curveName || !adate) {
      alert("Please select both curve name and date.");
      return;
    }
    navigate(`/curves/by-date/${curveName}/${adate}`);
  };

  return (
    <div className="container mt-4">
      <h2>Select Curve by Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Curve Name</label>
          <select
            className="form-control"
            value={curveName}
            onChange={(e) => setCurveName(e.target.value)}
          >
            {availableCurves.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">As of Date</label>
          <input
            type="date"
            className="form-control"
            value={adate}
            onChange={(e) => setAdate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Go to Curve
        </button>
      </form>
    </div>
  );
};

export default CurveByDateSelector;