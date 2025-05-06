import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenarioNew = () => {
  const navigate = useNavigate();
  const [scenarioId, setScenarioId] = useState(1);
  const [periodNumber, setPeriodNumber] = useState(1);
  const [simulationNumber, setSimulationNumber] = useState(1);
  const [curveId, setCurveId] = useState(1);
  const [periodLength, setPeriodLength] = useState(1.0);
  const [shockSize, setShockSize] = useState(0.0);

  const handleNewData = async (e) => {
    e.preventDefault();
    const res = await fetch(STRESS_SCENARIOS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario_id: scenarioId,
        period_number: periodNumber,
        simulation_number: simulationNumber,
        curve: curveId,
        period_length: periodLength,
        parallel_shock_size: shockSize,
      }),
    });

    if (!res.ok) {
      alert("Failed to create new stress scenario");
    } else {
      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    }
  };

  const formFields = [
    { fieldType: "number", fieldLabel: "Scenario ID", fieldValue: scenarioId, setFieldValue: setScenarioId },
    { fieldType: "number", fieldLabel: "Period Number", fieldValue: periodNumber, setFieldValue: setPeriodNumber },
    { fieldType: "number", fieldLabel: "Simulation Number", fieldValue: simulationNumber, setFieldValue: setSimulationNumber },
    { fieldType: "number", fieldLabel: "Curve ID", fieldValue: curveId, setFieldValue: setCurveId },
    { fieldType: "number", fieldLabel: "Period Length (years)", fieldValue: periodLength, setFieldValue: setPeriodLength },
    { fieldType: "number", fieldLabel: "Shock Size (%)", fieldValue: shockSize, setFieldValue: setShockSize },
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