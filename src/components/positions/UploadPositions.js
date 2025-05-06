import axios from 'axios';
import React, { useState } from 'react';

function UploadCSV() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload-positions/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Success: " + res.data.status);
    } catch (err) {
      alert("Error uploading file: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default UploadCSV;