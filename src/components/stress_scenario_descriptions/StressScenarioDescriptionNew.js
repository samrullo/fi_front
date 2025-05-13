import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const StressScenarioDescriptionNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNewData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error("Failed to create scenario description");

      setFlashMessages([
        { category: "success", message: "Scenario description created successfully." },
      ]);

      navigate("/stress-scenario-descriptions", {
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