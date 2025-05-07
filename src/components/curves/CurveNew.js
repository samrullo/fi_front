import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { CURVES_ENDPOINT, CURVEPOINTS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveNew = () => {
  const navigate = useNavigate();

  const [curveList, setCurveList] = useState([]);
  const [selectedCurve, setSelectedCurve] = useState(null);
  const [adate, setAdate] = useState("");
  const [year, setYear] = useState(1);
  const [rate, setRate] = useState(0.0);

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        const res = await fetch(CURVES_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch curves");
        const data = await res.json();
        setCurveList(data);
        if (data.length > 0) setSelectedCurve(data[0].id);
      } catch (err) {
        alert("Error loading curve names: " + err.message);
      }
    };

    fetchCurves();
  }, []);

  const handleNewData = async (e) => {
    e.preventDefault();
    console.log(`selectedCurve is ${JSON.stringify(selectedCurve)}`)

    try {
      const res = await fetch(CURVEPOINTS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curve: selectedCurve.value,
          adate,
          year,
          rate,
        }),
      });

      if (!res.ok) throw new Error("Failed to create curve point");

      navigate("/curves", {
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
      fieldLabel: "Curve Name",
      fieldValue: selectedCurve,
      setFieldValue: setSelectedCurve,
      selectOptions: curveList.map((c) => ({
        value: c.id,
        label: c.curve_name,
      })),
    },
    {
      fieldType: "date",
      fieldLabel: "Adate",
      fieldValue: adate,
      setFieldValue: setAdate,
    },
    {
      fieldType: "number",
      fieldLabel: "Year",
      fieldValue: year,
      setFieldValue: setYear,
    },
    {
      fieldType: "number",
      fieldLabel: "Rate (%)",
      fieldValue: rate,
      setFieldValue: setRate,
    },
  ];

  return (
    <GenericNewData
      title="New Curve Point"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default CurveNew;