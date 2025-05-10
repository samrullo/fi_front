import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  SCENARIO_POSITIONS_ENDPOINT,
  STRESS_SCENARIOS_ENDPOINT,
  VANILLA_BONDS_ENDPOINT,
} from "../ApiUtils/ApiEndpoints";

const ScenarioPositionEdit = () => {
  const { scenarioPositionId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [bonds, setBonds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [scenRes, bondRes, posRes] = await Promise.all([
        fetch(STRESS_SCENARIOS_ENDPOINT),
        fetch(VANILLA_BONDS_ENDPOINT),
        fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`),
      ]);

      const [scenarioData, bondData, positionData] = await Promise.all([
        scenRes.json(),
        bondRes.json(),
        posRes.json(),
      ]);

      setScenarios(scenarioData);
      setBonds(bondData);

      // Map scenario and bond into select-compatible format
      const selectedScenario = scenarioData.find((s) => s.id === positionData.scenario);
      const selectedBond = bondData.find((b) => b.id === positionData.security);

      setFormData({
        ...positionData,
        scenario: selectedScenario ? { value: selectedScenario.id, label: selectedScenario.scenario_details?.name || selectedScenario.id } : null,
        security: selectedBond ? { value: selectedBond.id, label: selectedBond.identifier_client } : null,
      });
    };

    fetchData();
  }, [scenarioPositionId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          scenario_id: formData.scenario.value,
          security: formData.security.value,
        }),
      });
      if (!res.ok) throw new Error("Failed to update scenario position");

      navigate("/scenario-positions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      navigate("/scenario-positions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  if (!formData) return <p>Loading...</p>;

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Scenario",
      fieldValue: formData.scenario,
      setFieldValue: (v) => setFormData({ ...formData, scenario: v }),
      selectOptions: scenarios.map((s) => ({
        value: s.id,
        label: s.scenario_details?.name || `Scenario ${s.id}`,
      })),
    },
    {
      fieldType: "select",
      fieldLabel: "Bond",
      fieldValue: formData.security,
      setFieldValue: (v) => setFormData({ ...formData, security: v }),
      selectOptions: bonds.map((b) => ({
        value: b.id,
        label: b.identifier_client,
      })),
    },
    { fieldType: "text", fieldLabel: "Portfolio Name", fieldValue: formData.portfolio_name, setFieldValue: (v) => setFormData({ ...formData, portfolio_name: v }) },
    { fieldType: "date", fieldLabel: "Position Date", fieldValue: formData.position_date, setFieldValue: (v) => setFormData({ ...formData, position_date: v }) },
    { fieldType: "number", fieldLabel: "Lot ID", fieldValue: formData.lot_id, setFieldValue: (v) => setFormData({ ...formData, lot_id: parseInt(v) }) },
    { fieldType: "number", fieldLabel: "Quantity", fieldValue: formData.quantity, setFieldValue: (v) => setFormData({ ...formData, quantity: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Notional Amount", fieldValue: formData.notional_amount, setFieldValue: (v) => setFormData({ ...formData, notional_amount: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Par Value", fieldValue: formData.par_value, setFieldValue: (v) => setFormData({ ...formData, par_value: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Book Price", fieldValue: formData.book_price, setFieldValue: (v) => setFormData({ ...formData, book_price: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Book Value", fieldValue: formData.book_value, setFieldValue: (v) => setFormData({ ...formData, book_value: parseFloat(v) }) },
  ];

  return (
    <GenericEditData
      title={`Edit Scenario Position ${scenarioPositionId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ScenarioPositionEdit;