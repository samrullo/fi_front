import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { CURVES_DESCRIPTIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveDescriptionEdit = () => {
  const { descriptionId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch(`${CURVES_DESCRIPTIONS_ENDPOINT}${descriptionId}/`);
        if (!res.ok) throw new Error("Curve description not found");
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch curve description");
        navigate("/curve-descriptions");
      }
    };
    fetchDescription();
  }, [descriptionId, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${CURVES_DESCRIPTIONS_ENDPOINT}${descriptionId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error("Failed to update");
      navigate("/curve-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${CURVES_DESCRIPTIONS_ENDPOINT}${descriptionId}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      navigate("/curve-descriptions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Delete failed");
      console.error(err);
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
    <GenericEditData
      title={`Edit Curve Description ID ${descriptionId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default CurveDescriptionEdit;
