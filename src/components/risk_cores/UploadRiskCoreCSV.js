// src/components/risk_cores/UploadRiskCoreCSV.js
import React, { useState } from "react";
import axios from "axios";
import { RISK_CORES_UPLOAD_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const UploadRiskCoreCSV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await axios.post(RISK_CORES_UPLOAD_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful: " + JSON.stringify(res.data));
    } catch (err) {
      alert("Error uploading: " + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload RiskCore CSV for Valuation</h2>
      <div className="mb-3">
        <label htmlFor="riskCoreFile" className="form-label">Select CSV File</label>
        <input
          type="file"
          className="form-control"
          id="riskCoreFile"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadRiskCoreCSV;
