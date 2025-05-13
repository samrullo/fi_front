import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  CURVES_DESCRIPTIONS_ENDPOINT,
  API_HOSTNAME,
} from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const CurveByDateSelector = () => {
  const [curveName, setCurveName] = useState("");
  const [adate, setAdate] = useState("");
  const [availableCurves, setAvailableCurves] = useState([]);
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        const res = await fetch(CURVES_DESCRIPTIONS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch curves");
        const data = await res.json();

        const uniqueNames = [...new Set(data.map((c) => c.name))];
        setAvailableCurves(uniqueNames);
        if (uniqueNames.length > 0) setCurveName(uniqueNames[0]);
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Error loading curve names: " + err.message },
        ]);
      }
    };

    fetchCurves();
  }, [setFlashMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curveName || !adate) {
      setFlashMessages([
        { category: "warning", message: "Please select both curve name and date." },
      ]);
      return;
    }
    navigate(`/curve-points/by-date/${curveName}/${adate}`);
  };

  const handleDownload = async () => {
    if (!curveName || !adate) {
      setFlashMessages([
        { category: "warning", message: "Please select both curve name and date." },
      ]);
      return;
    }

    try {
      const res = await fetch(
        `${API_HOSTNAME}/fi/v1/curves/by-date/${curveName}/${adate}/`
      );
      if (!res.ok) throw new Error("Failed to fetch curve data");

      const data = await res.json();
      const header = ["curve_name", "adate", "year", "rate"];
      const rows = data.map((c) => [c.curve_name, c.adate, c.year, c.rate]);

      const csvContent = [header, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `curve_${curveName}_${adate}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setFlashMessages([
        { category: "success", message: "CSV downloaded successfully." },
      ]);
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error downloading curve CSV: " + err.message },
      ]);
    }
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

        <button type="submit" className="btn btn-primary me-2">
          Go to Curve
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleDownload}
        >
          Download CSV
        </button>
      </form>
    </div>
  );
};

export default CurveByDateSelector;