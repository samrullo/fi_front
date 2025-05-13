import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const StressScenarioNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [scenarioId, setScenarioId] = useState(1);
  const [periodNumber, setPeriodNumber] = useState(1);
  const [simulationNumber, setSimulationNumber] = useState(1);
  const [periodLength, setPeriodLength] = useState(1.0);

  const handleNewData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(STRESS_SCENARIOS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenarioId,
          period_number: periodNumber,
          simulation_number: simulationNumber,
          period_length: periodLength,
        }),
      });

      if (!res.ok) throw new Error("Failed to create new stress scenario");

      setFlashMessages([
        { category: "success", message: "Stress scenario created successfully." },
      ]);

      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error: " + err.message },
      ]);
    }
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Scenario ID",
      fieldValue: scenarioId,
      setFieldValue: setScenarioId,
    },
    {
      fieldType: "number",
      fieldLabel: "Period Number",
      fieldValue: periodNumber,
      setFieldValue: setPeriodNumber,
    },
    {
      fieldType: "number",
      fieldLabel: "Simulation Number",
      fieldValue: simulationNumber,
      setFieldValue: setSimulationNumber,
    },
    {
      fieldType: "number",
      fieldLabel: "Period Length (years)",
      fieldValue: periodLength,
      setFieldValue: setPeriodLength,
    },
  ];

  return (
    <GenericNewData
      title="New Stress Scenario"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default StressScenarioNew;