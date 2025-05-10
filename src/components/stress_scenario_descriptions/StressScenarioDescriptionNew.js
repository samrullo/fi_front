import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenarioDescriptionNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNewData = async (e) => {
    e.preventDefault();
    const res = await fetch(STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      navigate("/stress-scenario-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } else {
      alert("Failed to create scenario description");
    }
  };

  const formFields = [
    { fieldType: "text", fieldLabel: "Name", fieldValue: name, setFieldValue: setName },
    { fieldType: "textarea", fieldLabel: "Description", fieldValue: description, setFieldValue: setDescription },
  ];

  return (
    <GenericNewData
      title="New Stress Scenario Description"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default StressScenarioDescriptionNew;

