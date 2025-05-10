import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { CURVES_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveDescriptionNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNewData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(CURVES_DESCRIPTIONS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error("Failed to create curve description");

      navigate("/curve-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const formFields = [
    {
      fieldType: "text",
      fieldLabel: "Name",
      fieldValue: name,
      setFieldValue: setName,
    },
    {
      fieldType: "textarea",
      fieldLabel: "Description",
      fieldValue: description,
      setFieldValue: setDescription,
    },
  ];

  return (
    <GenericNewData
      title="New Curve Description"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default CurveDescriptionNew;