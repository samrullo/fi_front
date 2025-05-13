import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { CURVE_POINT_SHOCKS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const CurvePointShockEdit = () => {
  const { shockId } = useParams();
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [shock, setShock] = useState({
    curve_point: 1,
    stress_scenario: 1,
    shock_size: 0.0,
  });

  useEffect(() => {
    const fetchShock = async () => {
      const res = await fetch(`${CURVE_POINT_SHOCKS_ENDPOINT}${shockId}/`);
      if (res.ok) {
        const data = await res.json();
        setShock(data);
      } else {
        setFlashMessages([
          { category: "danger", message: "Failed to fetch shock." },
        ]);
        navigate("/curve-point-shocks");
      }
    };
    fetchShock();
  }, [shockId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${CURVE_POINT_SHOCKS_ENDPOINT}${shockId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shock),
    });

    if (res.ok) {
      setFlashMessages([
        { category: "success", message: "Shock updated successfully." },
      ]);
      navigate("/curve-point-shocks", {
        state: { timestamp: new Date().getTime() },
      });
    } else {
      setFlashMessages([
        { category: "danger", message: "Failed to update shock." },
      ]);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`${CURVE_POINT_SHOCKS_ENDPOINT}${shockId}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFlashMessages([
        { category: "success", message: "Shock deleted successfully." },
      ]);
      navigate("/curve-point-shocks", {
        state: { timestamp: new Date().getTime() },
      });
    } else {
      setFlashMessages([
        { category: "danger", message: "Failed to delete shock." },
      ]);
    }
  };

  const formFields = [
    {
      fieldType: "number",
      fieldLabel: "Curve Point ID",
      fieldValue: shock.curve_point,
      setFieldValue: (v) => setShock({ ...shock, curve_point: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Stress Scenario ID",
      fieldValue: shock.stress_scenario,
      setFieldValue: (v) => setShock({ ...shock, stress_scenario: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Shock Size (%)",
      fieldValue: shock.shock_size,
      setFieldValue: (v) => setShock({ ...shock, shock_size: v }),
    },
  ];

  return (
    <GenericEditData
      title={`Edit Shock ID ${shockId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default CurvePointShockEdit;