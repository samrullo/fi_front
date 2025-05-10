// src/components/vanilla_bonds/VanillaBondNew.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const VanillaBondNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier_client: "",
    asset_name: "",
    fixed_coupon: "",
    frequency: 2,
    maturity: "",
  });

  const handleNewData = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      fixed_coupon: parseFloat(formData.fixed_coupon),
      frequency: parseInt(formData.frequency),
    };

    try {
      const res = await fetch(VANILLA_BONDS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create bond record");

      navigate("/vanilla-bonds", {
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
      fieldLabel: "Client ID",
      fieldValue: formData.identifier_client,
      setFieldValue: (v) => setFormData({ ...formData, identifier_client: v }),
    },
    {
      fieldType: "text",
      fieldLabel: "Asset Name",
      fieldValue: formData.asset_name,
      setFieldValue: (v) => setFormData({ ...formData, asset_name: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Fixed Coupon",
      fieldValue: formData.fixed_coupon,
      setFieldValue: (v) => setFormData({ ...formData, fixed_coupon: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Frequency",
      fieldValue: formData.frequency,
      setFieldValue: (v) => setFormData({ ...formData, frequency: v }),
    },
    {
      fieldType: "date",
      fieldLabel: "Maturity Date",
      fieldValue: formData.maturity,
      setFieldValue: (v) => setFormData({ ...formData, maturity: v }),
    },
  ];

  return (
    <GenericNewData
      title="New Vanilla Bond"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default VanillaBondNew;