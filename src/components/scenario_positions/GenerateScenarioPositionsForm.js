// src/components/scenario_positions/GenerateScenarioPositionsForm.js
import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../../AppContext";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";

const GenerateScenarioPositionsForm = () => {
  const [portfolioName, setPortfolioName] = useState("");
  const [positionDate, setPositionDate] = useState("");
  const [scenarioName, setScenarioName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setFlashMessages } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!portfolioName || !positionDate || !scenarioName) {
      setFlashMessages([
        { category: "warning", message: "All fields are required." },
      ]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_HOSTNAME}/fi/v1/generate-scenario-positions/`, {
        portfolio_name: portfolioName,
        position_date: positionDate,
        scenario_name: scenarioName,
      });

      setFlashMessages([
        {
          category: "success",
          message: `✅ Success: ${response.data.status}`,
        },
      ]);
    } catch (error) {
      setFlashMessages([
        {
          category: "danger",
          message:
            "❌ Error: " +
            (error.response?.data?.error || error.message),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Generate Scenario Positions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Portfolio Name</label>
          <input
            type="text"
            className="form-control"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position Date</label>
          <input
            type="date"
            className="form-control"
            value={positionDate}
            onChange={(e) => setPositionDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Scenario Name</label>
          <input
            type="text"
            className="form-control"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default GenerateScenarioPositionsForm;