// src/components/positions/UploadPositionsCSV.js
import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../AppContext";
import { UPLOAD_POSITIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints"; // ✅ Adjusted to use the centralized endpoint

const UploadPositionsCSV = () => {
  const [file, setFile] = useState(null);
  const { setFlashMessages } = useContext(AppContext);

  const handleUpload = async () => {
    if (!file) {
      setFlashMessages([
        {
          category: "warning",
          message: "⚠️ Please select a CSV file before uploading.",
        },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${UPLOAD_POSITIONS_ENDPOINT}`, // ✅ Centralized base used
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFlashMessages([
        {
          category: "success",
          message: `✅ Success: ${res.data.status}`,
        },
      ]);

      // Reset file input
      setFile(null);
      document.getElementById("uploadCsv").value = "";
    } catch (err) {
      setFlashMessages([
        {
          category: "danger",
          message:
            "❌ Error uploading file: " +
            (err.response?.data?.error || err.message),
        },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Positions CSV</h2>
      <p className="text-muted">
        Please upload a CSV with the following columns:
        <br />
        <code>
          portfolio_name, position_date, identifier_client, quantity,
          book_price, curve_name
        </code>
      </p>
      <div className="mb-3">
        <label htmlFor="uploadCsv" className="form-label">
          Select CSV File
        </label>
        <input
          id="uploadCsv"
          type="file"
          accept=".csv"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload CSV
      </button>
    </div>
  );
};

export default UploadPositionsCSV;