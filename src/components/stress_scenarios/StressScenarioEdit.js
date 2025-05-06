import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenarioEdit = () => {
  const navigate = useNavigate();
  const { scenarioId } = useParams();

  const [scenario, setScenario] = useState({
    scenario_id: 0,
    period_number: 0,
    simulation_number: 0,
    curve: 1,
    period_length: 0.0,
    parallel_shock_size: 0.0,
  });

  useEffect(() => {
    const fetchScenario = async () => {
      const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`);
      if (res.ok) {
        const data = await res.json();
        setScenario(data);
      } else {
        alert("Failed to fetch scenario");
        navigate("/stress-scenarios");
      }
    };
    fetchScenario();
  }, [scenarioId, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scenario),
    });

    if (!res.ok) {
      alert("Failed to update");
    } else {
      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete");
    } else {
      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    }
  };

  const formFields = [
    { fieldType: "number", fieldLabel: "Scenario ID", fieldValue: scenario.scenario_id, setFieldValue: (v) => setScenario({ ...scenario, scenario_id: v }) },
    { fieldType: "number", fieldLabel: "Period Number", fieldValue: scenario.period_number, setFieldValue: (v) => setScenario({ ...scenario, period_number: v }) },
    { fieldType: "number", fieldLabel: "Simulation Number", fieldValue: scenario.simulation_number, setFieldValue: (v) => setScenario({ ...scenario, simulation_number: v }) },
    { fieldType: "number", fieldLabel: "Curve ID", fieldValue: scenario.curve, setFieldValue: (v) => setScenario({ ...scenario, curve: v }) },
    { fieldType: "number", fieldLabel: "Period Length (years)", fieldValue: scenario.period_length, setFieldValue: (v) => setScenario({ ...scenario, period_length: v }) },
    { fieldType: "number", fieldLabel: "Shock Size (%)", fieldValue: scenario.parallel_shock_size, setFieldValue: (v) => setScenario({ ...scenario, parallel_shock_size: v }) },
  ];

  return (
    <GenericEditData
      title={`Edit Scenario ID ${scenarioId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default StressScenarioEdit;