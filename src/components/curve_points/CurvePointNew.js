import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import {
  CURVES_DESCRIPTIONS_ENDPOINT,
  CURVEPOINTS_ENDPOINT,
} from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const CurvePointNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [curveList, setCurveList] = useState([]);
  const [selectedCurve, setSelectedCurve] = useState(null);
  const [adate, setAdate] = useState("");
  const [year, setYear] = useState(1);
  const [rate, setRate] = useState(0.0);

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        const res = await fetch(CURVES_DESCRIPTIONS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch curves");

        const data = await res.json();
        setCurveList(data);

        if (data.length > 0) {
          setSelectedCurve({ value: data[0].id, label: data[0].curve_name });
        }
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Error loading curve names: " + err.message },
        ]);
      }
    };

    fetchCurves();
  }, [setFlashMessages]);

  const handleNewData = async (e) => {
    e.preventDefault();
    console.log(`selectedCurve is ${JSON.stringify(selectedCurve)}`);

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

      setFlashMessages([
        { category: "success", message: "Curve point created successfully." },
      ]);

      navigate("/curve-points", {
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

export default CurvePointNew;