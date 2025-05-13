import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const StressScenarioEdit = () => {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const { setFlashMessages } = useContext(AppContext);

  const [scenario, setScenario] = useState({
    scenario: 0,
    period_number: 0,
    simulation_number: 0,
    period_length: 0.0,
  });

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`);
        if (!res.ok) throw new Error("Failed to fetch scenario");

        const data = await res.json();
        setScenario({
          scenario: data.scenario,
          period_number: data.period_number,
          simulation_number: data.simulation_number,
          period_length: data.period_length,
        });
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Error fetching scenario: " + err.message },
        ]);
        navigate("/stress-scenarios");
      }
    };

    fetchScenario();
  }, [scenarioId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scenario),
      });

      if (!res.ok) throw new Error("Failed to update scenario");

      setFlashMessages([
        { category: "success", message: "Scenario updated successfully." },
      ]);

      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error updating scenario: " + err.message },
      ]);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${STRESS_SCENARIOS_ENDPOINT}${scenarioId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete scenario");

      setFlashMessages([
        { category: "success", message: "Scenario deleted successfully." },
      ]);

      navigate("/stress-scenarios", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error deleting scenario: " + err.message },
      ]);
    }
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Scenario ID",
      fieldValue: scenario.scenario,
      setFieldValue: (v) => setScenario({ ...scenario, scenario: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Period Number",
      fieldValue: scenario.period_number,
      setFieldValue: (v) => setScenario({ ...scenario, period_number: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Simulation Number",
      fieldValue: scenario.simulation_number,
      setFieldValue: (v) => setScenario({ ...scenario, simulation_number: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Period Length (years)",
      fieldValue: scenario.period_length,
      setFieldValue: (v) => setScenario({ ...scenario, period_length: v }),
    },
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