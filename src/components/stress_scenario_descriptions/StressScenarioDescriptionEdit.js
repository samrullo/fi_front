import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const StressScenarioDescriptionEdit = () => {
  const { descriptionId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch(`${STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT}${descriptionId}/`);
        if (!res.ok) throw new Error("Failed to fetch scenario description");
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
      } catch (err) {
        alert("Error loading scenario description: " + err.message);
      }
    };
    fetchDescription();
  }, [descriptionId]);

  const handleEdit = async () => {
    try {
      const res = await fetch(`${STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT}${descriptionId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error("Failed to update");

      navigate("/stress-scenario-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT}${descriptionId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      navigate("/stress-scenario-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const formFields = [
    { fieldType: "text", fieldLabel: "Name", fieldValue: name, setFieldValue: setName },
    { fieldType: "textarea", fieldLabel: "Description", fieldValue: description, setFieldValue: setDescription },
  ];

  return (
    <GenericEditData
      title={`Edit Scenario Description ID ${descriptionId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default StressScenarioDescriptionEdit;