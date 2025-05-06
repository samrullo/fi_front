import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";

const CurveNew = () => {
  const navigate = useNavigate();
  const [curveName, setCurveName] = useState("");
  const [adate, setAdate] = useState("");
  const [year, setYear] = useState(1);
  const [rate, setRate] = useState(0.0);

  const handleNewData = (e) => {
    e.preventDefault();
    const curves = JSON.parse(localStorage.getItem("curves")) || [];
    curves.push({
      id: curves.length,
      curve_name: curveName,
      adate,
      year,
      rate,
    });
    localStorage.setItem("curves", JSON.stringify(curves));
    navigate("/curves", {
      replace: true,
      state: { timestamp: new Date().getTime() },
    });
  };

  const formFields = [
    { fieldType: "text", fieldLabel: "Curve Name", fieldValue: curveName, setFieldValue: setCurveName },
    { fieldType: "date", fieldLabel: "Adate", fieldValue: adate, setFieldValue: setAdate },
    { fieldType: "number", fieldLabel: "Year", fieldValue: year, setFieldValue: setYear },
    { fieldType: "number", fieldLabel: "Rate (%)", fieldValue: rate, setFieldValue: setRate },
  ];

  return (
    <GenericNewData
      title="New Curve"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default CurveNew;