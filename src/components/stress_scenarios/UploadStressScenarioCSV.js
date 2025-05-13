import React, { useState, useContext } from "react";
import axios from "axios";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

function UploadStressScenarioCSV() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setFlashMessages } = useContext(AppContext);

  const handleUpload = async () => {
    if (!file) {
      setFlashMessages([
        { category: "warning", message: "Please select a file before uploading." },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await axios.post(
        `${API_HOSTNAME}/fi/v1/upload-stress-scenarios/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFlashMessages([
        {
          category: "success",
          message: `✅ Upload successful! Inserted rows: ${res.data.rows}`,
        },
      ]);

      setFile(null);
      document.getElementById("stressFile").value = "";
    } catch (err) {
      console.error(err);
      setFlashMessages([
        {
          category: "danger",
          message:
            "❌ Upload failed: " + (err.response?.data?.error || err.message),
        },
      ]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Stress Scenarios CSV</h2>
      <p className="text-muted">
        CSV must include the following columns:
        <br />
        <code>
          scenario_name, period_number, simulation_number, curve_name,
          curve_adate, curve_year, period_length, parallel_shock_size
        </code>
      </p>

      <div className="mb-3">
        <label htmlFor="stressFile" className="form-label">
          Select CSV File
        </label>
        <input
          type="file"
          accept=".csv"
          className="form-control"
          id="stressFile"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={uploading}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadStressScenarioCSV;