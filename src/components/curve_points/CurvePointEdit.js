import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { CURVEPOINTS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const CurvePointEdit = () => {
  const navigate = useNavigate();
  const { curvePointId } = useParams();
  const { setFlashMessages } = useContext(AppContext);

  const [curveNameId, setCurveNameId] = useState(null);
  const [curveName, setCurveName] = useState("");
  const [adate, setAdate] = useState("");
  const [year, setYear] = useState(1);
  const [rate, setRate] = useState(0.0);

  useEffect(() => {
    const fetchCurve = async () => {
      try {
        const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curvePointId}/`);
        if (!res.ok) throw new Error("Curve point not found");

        const data = await res.json();
        setCurveNameId(data.curve);
        setCurveName(data.curve_name);
        setAdate(data.adate);
        setYear(data.year);
        setRate(data.rate);
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Failed to fetch curve point data." },
        ]);
        console.error(err);
        navigate("/curve-points");
      }
    };

    fetchCurve();
  }, [curvePointId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curvePointId}/`, {
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

      setFlashMessages([
        { category: "success", message: "Curve point updated successfully." },
      ]);

      navigate("/curve-points", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Update failed." },
      ]);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${CURVEPOINTS_ENDPOINT}${curvePointId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setFlashMessages([
        { category: "success", message: "Curve point deleted successfully." },
      ]);

      navigate("/curve-points", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Delete failed." },
      ]);
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
      title={`Edit Curve Point ID ${curvePointId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default CurvePointEdit;