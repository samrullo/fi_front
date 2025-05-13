import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from "../../AppContext";

function UploadCurvePointsCSV() {
  const [file, setFile] = useState(null);
  const { setFlashMessages } = useContext(AppContext);

  const handleUpload = async () => {
    if (!file) {
      setFlashMessages([
        { category: 'warning', message: 'Please select a file first.' },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/fi/v1/upload-curve/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setFlashMessages([
        { category: 'success', message: `Upload successful: ${res.data.points} points uploaded` },
      ]);
      setFile(null);
      document.getElementById("curvePointsFile").value = ""; // reset input
    } catch (err) {
      setFlashMessages([
        {
          category: 'danger',
          message: "Error uploading: " + (err.response?.data?.error || err.message),
        },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Curve Points CSV</h2>
      <div className="mb-3">
        <label htmlFor="curvePointsFile" className="form-label">Select CSV File</label>
        <input
          type="file"
          className="form-control"
          id="curvePointsFile"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default UploadCurvePointsCSV;