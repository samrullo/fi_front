import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { CURVE_POINT_SHOCKS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const CurvePointShockNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [curvePoint, setCurvePoint] = useState(1);
  const [scenarioId, setScenarioId] = useState(1);
  const [shockSize, setShockSize] = useState(0.0);

  const handleNewData = async (e) => {
    e.preventDefault();
    const res = await fetch(CURVE_POINT_SHOCKS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        curve_point: curvePoint,
        stress_scenario: scenarioId,
        shock_size: shockSize,
      }),
    });

    if (res.ok) {
      setFlashMessages([
        { category: "success", message: "Shock created successfully." },
      ]);
      navigate("/curve-point-shocks", {
        state: { timestamp: new Date().getTime() },
      });
    } else {
      setFlashMessages([
        { category: "danger", message: "Failed to create shock." },
      ]);
    }
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Curve Point ID",
      fieldValue: curvePoint,
      setFieldValue: setCurvePoint,
    },
    {
      fieldType: "number",
      fieldLabel: "Stress Scenario ID",
      fieldValue: scenarioId,
      setFieldValue: setScenarioId,
    },
    {
      fieldType: "number",
      fieldLabel: "Shock Size (%)",
      fieldValue: shockSize,
      setFieldValue: setShockSize,
    },
  ];

  return (
    <GenericNewData
      title="New Curve Point Shock"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default CurvePointShockNew;