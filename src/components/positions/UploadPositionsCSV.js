import axios from "axios";
import React, { useState, useContext } from "react";
import AppContext from "../../AppContext"; // Adjust path if needed

function UploadPositionsCSV() {
  const [file, setFile] = useState(null);
  const { setFlashMessages } = useContext(AppContext);

  const handleUpload = async () => {
    if (!file) {
      setFlashMessages([
        { category: "warning", message: "Please select a CSV file before uploading." },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload-positions/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFlashMessages([
        { category: "success", message: "✅ Success: " + res.data.status },
      ]);
      setFile(null);
      document.querySelector("input[type='file']").value = "";
    } catch (err) {
      setFlashMessages([
        {
          category: "danger",
          message: "❌ Error: " + (err.response?.data?.error || err.message),
        },
      ]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Positions CSV</h2>
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
}

export default UploadPositionsCSV;