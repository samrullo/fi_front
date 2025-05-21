import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from "../../AppContext";
import { CURVEPOINTS_UPLOAD_ENDPOINT } from "../ApiUtils/ApiEndpoints";

function UploadCurvePointsCSV() {
  const [file, setFile] = useState(null);
  const { setFlashMessages } = useContext(AppContext);

  const handleUpload = async () => {
    if (!file) {
      setFlashMessages([
        {
          category: 'warning',
          message: '⚠️ Please select a CSV file before uploading.',
        },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(CURVEPOINTS_UPLOAD_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFlashMessages([
        {
          category: 'success',
          message: `✅ Upload successful: ${res.data.points} curve points uploaded.`,
        },
      ]);

      setFile(null);
      document.getElementById("curvePointsFile").value = ""; // Reset input
    } catch (err) {
      setFlashMessages([
        {
          category: 'danger',
          message:
            "❌ Error uploading file: " +
            (err.response?.data?.error || err.message),
        },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Curve Points CSV</h2>
      <p className="text-muted">
        Please upload a CSV with the following columns:
        <br />
        <code>curve_name, adate, year, rate</code>
      </p>

      <div className="mb-3">
        <label htmlFor="curvePointsFile" className="form-label">
          Select CSV File
        </label>
        <input
          type="file"
          className="form-control"
          id="curvePointsFile"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button className="btn btn-primary" onClick={handleUpload}>
        Upload CSV
      </button>
    </div>
  );
}

export default UploadCurvePointsCSV;