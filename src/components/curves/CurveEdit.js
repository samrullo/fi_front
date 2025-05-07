import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { CURVEPOINTS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurveEdit = () => {
  const navigate = useNavigate();
  const { curveId } = useParams();

  const [curveNameId, setCurveNameId] = useState(null);
  const [curveName, setCurveName] = useState("");
  const [adate, setAdate] = useState("");
  const [year, setYear] = useState(1);
  const [rate, setRate] = useState(0.0);

  useEffect(() => {
    const fetchCurve = async () => {
      try {
        const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curveId}/`);
        if (!res.ok) throw new Error("Curve not found");
        const data = await res.json();
        setCurveNameId(data.curve);
        setCurveName(data.curve_name);
        setAdate(data.adate);
        setYear(data.year);
        setRate(data.rate);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch curve data");
        navigate("/curves");
      }
    };

    fetchCurve();
  }, [curveId, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curveId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curve: curveNameId,
          adate,
          year,
          rate,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      navigate("/curves", {
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
      const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curveId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      navigate("/curves", {
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
      fieldLabel: "Curve Name",
      fieldValue: curveName,
      setFieldValue: setCurveName,
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
    <GenericEditData
      title={`Edit Curve ID ${curveId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default CurveEdit;