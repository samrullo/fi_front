import React, { useState } from "react";
import axios from "axios";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";

const UploadVanillaBondsCSV = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API_HOSTNAME}/fi/v1/upload-vanilla-bonds/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(`Upload successful: ${res.data.records_created} records added`);
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Vanilla Bonds CSV</h2>
      <div className="mb-3">
        <label htmlFor="vanillaBondFile" className="form-label">
          Select CSV File
        </label>
        <input
          type="file"
          className="form-control"
          id="vanillaBondFile"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadVanillaBondsCSV;