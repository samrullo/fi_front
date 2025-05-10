// src/components/risk_cores/RiskCoreEdit.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { RISK_CORES_ENDPOINT, VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const RiskCoreEdit = () => {
  const navigate = useNavigate();
  const { riskCoreId } = useParams();

  const [securityId, setSecurityId] = useState(null);
  const [bonds, setBonds] = useState([]);
  const [riskDate, setRiskDate] = useState("");
  const [price, setPrice] = useState(0.0);
  const [ytm, setYtm] = useState(0.0);
  const [oas, setOas] = useState(0.0);
  const [pv, setPv] = useState(0.0);
  const [accruedInterest, setAccruedInterest] = useState(0.0);

  useEffect(() => {
    const fetchRiskCore = async () => {
      try {
        const res = await fetch(`${RISK_CORES_ENDPOINT}${riskCoreId}/`);
        if (!res.ok) throw new Error("Failed to fetch risk core record");
        const data = await res.json();
        setSecurityId(data.security);
        setRiskDate(data.risk_date);
        setPrice(data.price);
        setYtm(data.yield_to_maturity);
        setOas(data.oas);
        setPv(data.discounted_pv);
        setAccruedInterest(data.accrued_interest);
      } catch (err) {
        alert("Error loading risk core record: " + err.message);
        navigate("/risk-cores");
      }
    };

    const fetchBonds = async () => {
      try {
        const res = await fetch(VANILLA_BONDS_ENDPOINT);
        const data = await res.json();
        setBonds(data);
      } catch (err) {
        console.error("Failed to load bonds: ", err);
      }
    };

    fetchRiskCore();
    fetchBonds();
  }, [riskCoreId, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${RISK_CORES_ENDPOINT}${riskCoreId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          security: securityId,
          risk_date: riskDate,
          price,
          yield_to_maturity: ytm,
          oas,
          discounted_pv: pv,
          accrued_interest: accruedInterest
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      navigate("/risk-cores", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${RISK_CORES_ENDPOINT}${riskCoreId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
      navigate("/risk-cores", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Bond",
      fieldValue: securityId,
      setFieldValue: setSecurityId,
      selectOptions: bonds.map((b) => ({ value: b.id, label: `${b.asset_name} (${b.identifier_client})` })),
    },
    { fieldType: "date", fieldLabel: "Risk Date", fieldValue: riskDate, setFieldValue: setRiskDate },
    { fieldType: "number", fieldLabel: "Price", fieldValue: price, setFieldValue: setPrice },
    { fieldType: "number", fieldLabel: "Yield to Maturity", fieldValue: ytm, setFieldValue: setYtm },
    { fieldType: "number", fieldLabel: "OAS", fieldValue: oas, setFieldValue: setOas },
    { fieldType: "number", fieldLabel: "Discounted PV", fieldValue: pv, setFieldValue: setPv },
    { fieldType: "number", fieldLabel: "Accrued Interest", fieldValue: accruedInterest, setFieldValue: setAccruedInterest },
  ];

  return (
    <GenericEditData
      title={`Edit Risk Core ID ${riskCoreId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default RiskCoreEdit;