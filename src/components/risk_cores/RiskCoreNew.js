// src/components/risk_cores/RiskCoreNew.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { RISK_CORES_ENDPOINT, VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const RiskCoreNew = () => {
  const navigate = useNavigate();
  const [bonds, setBonds] = useState([]);
  const [formData, setFormData] = useState({
    security: "",
    risk_date: "",
    price: 0.0,
    yield_to_maturity: 0.0,
    oas: 0.0,
    discounted_pv: 0.0,
    accrued_interest: 0.0,
  });

  useEffect(() => {
    const fetchBonds = async () => {
      try {
        const res = await fetch(VANILLA_BONDS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch bond list");
        const data = await res.json();
        setBonds(data);
        if (data.length > 0) setFormData(f => ({ ...f, security: data[0].id }));
      } catch (err) {
        alert("Error fetching bonds: " + err.message);
      }
    };

    fetchBonds();
  }, []);

  const handleNewData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(RISK_CORES_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create risk core record");

      navigate("/risk-cores", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Security",
      fieldValue: formData.security,
      setFieldValue: (v) => setFormData({ ...formData, security: v }),
      selectOptions: bonds.map((b) => ({ value: b.id, label: `${b.asset_name} (${b.identifier_client})` })),
    },
    { fieldType: "date", fieldLabel: "Risk Date", fieldValue: formData.risk_date, setFieldValue: v => setFormData({ ...formData, risk_date: v }) },
    { fieldType: "number", fieldLabel: "Price", fieldValue: formData.price, setFieldValue: v => setFormData({ ...formData, price: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Yield to Maturity", fieldValue: formData.yield_to_maturity, setFieldValue: v => setFormData({ ...formData, yield_to_maturity: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "OAS", fieldValue: formData.oas, setFieldValue: v => setFormData({ ...formData, oas: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Discounted PV", fieldValue: formData.discounted_pv, setFieldValue: v => setFormData({ ...formData, discounted_pv: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Accrued Interest", fieldValue: formData.accrued_interest, setFieldValue: v => setFormData({ ...formData, accrued_interest: parseFloat(v) }) },
  ];

  return (
    <GenericNewData
      title="New Risk Core Entry"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default RiskCoreNew;