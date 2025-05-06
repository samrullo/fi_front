import React, { useState } from "react";
import axios from "axios";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";

function UploadStressScenarioCSV() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
      alert(`Upload successful! ${res.data.rows} rows inserted.`);
    } catch (err) {
      alert("Error uploading: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Stress Scenarios CSV</h2>
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
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default UploadStressScenarioCSV;