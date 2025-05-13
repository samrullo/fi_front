import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import {
  SCENARIO_POSITIONS_ENDPOINT,
  STRESS_SCENARIOS_ENDPOINT,
  VANILLA_BONDS_ENDPOINT,
} from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const ScenarioPositionEdit = () => {
  const { scenarioPositionId } = useParams();
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [formData, setFormData] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [bonds, setBonds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scenRes, bondRes, posRes] = await Promise.all([
          fetch(STRESS_SCENARIOS_ENDPOINT),
          fetch(VANILLA_BONDS_ENDPOINT),
          fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`),
        ]);

        if (!scenRes.ok || !bondRes.ok || !posRes.ok)
          throw new Error("Failed to load required data.");

        const [scenarioData, bondData, positionData] = await Promise.all([
          scenRes.json(),
          bondRes.json(),
          posRes.json(),
        ]);

        setScenarios(scenarioData);
        setBonds(bondData);

        const selectedScenario = scenarioData.find((s) => s.id === positionData.scenario);
        const selectedBond = bondData.find((b) => b.id === positionData.security);

        setFormData({
          ...positionData,
          scenario_id: selectedScenario
            ? { value: selectedScenario.id, label: selectedScenario.scenario_details?.name || selectedScenario.id }
            : null,
          security_id: selectedBond
            ? { value: selectedBond.id, label: selectedBond.identifier_client }
            : null,
        });
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Failed to load scenario position data: " + err.message },
        ]);
        navigate("/scenario-positions");
      }
    };

    fetchData();
  }, [scenarioPositionId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          scenario_id: formData.scenario_id.value,
          security_id: formData.security_id.value,
        }),
      });

      if (!res.ok) throw new Error("Failed to update scenario position");

      setFlashMessages([
        { category: "success", message: "Scenario position updated successfully." },
      ]);

      navigate("/scenario-positions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error updating scenario position: " + err.message },
      ]);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${SCENARIO_POSITIONS_ENDPOINT}${scenarioPositionId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setFlashMessages([
        { category: "success", message: "Scenario position deleted successfully." },
      ]);

      navigate("/scenario-positions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Delete failed: " + err.message },
      ]);
    }
  };

  if (!formData) return <p>Loading...</p>;

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Scenario",
      fieldValue: formData.scenario_id,
      setFieldValue: (v) => setFormData({ ...formData, scenario_id: v }),
      selectOptions: scenarios.map((s) => ({
        value: s.id,
        label: `${s.scenario_details?.name} period ${s.period_number} simulation ${s.simulation_number}`,
      })),
    },
    {
      fieldType: "select",
      fieldLabel: "Security",
      fieldValue: formData.security_id,
      setFieldValue: (v) => setFormData({ ...formData, security_id: v }),
      selectOptions: bonds.map((b) => ({
        value: b.id,
        label: b.identifier_client,
      })),
    },
    {
      fieldType: "text",
      fieldLabel: "Portfolio Name",
      fieldValue: formData.portfolio_name,
      setFieldValue: (v) => setFormData({ ...formData, portfolio_name: v }),
    },
    {
      fieldType: "date",
      fieldLabel: "Position Date",
      fieldValue: formData.position_date,
      setFieldValue: (v) => setFormData({ ...formData, position_date: v }),
    },
    {
      fieldType: "number",
      fieldLabel: "Lot ID",
      fieldValue: formData.lot_id,
      setFieldValue: (v) => setFormData({ ...formData, lot_id: parseInt(v) }),
    },
    {
      fieldType: "number",
      fieldLabel: "Quantity",
      fieldValue: formData.quantity,
      setFieldValue: (v) => setFormData({ ...formData, quantity: parseFloat(v) }),
    },
    {
      fieldType: "number",
      fieldLabel: "Notional Amount",
      fieldValue: formData.notional_amount,
      setFieldValue: (v) => setFormData({ ...formData, notional_amount: parseFloat(v) }),
    },
    {
      fieldType: "number",
      fieldLabel: "Par Value",
      fieldValue: formData.par_value,
      setFieldValue: (v) => setFormData({ ...formData, par_value: parseFloat(v) }),
    },
    {
      fieldType: "number",
      fieldLabel: "Book Price",
      fieldValue: formData.book_price,
      setFieldValue: (v) => setFormData({ ...formData, book_price: parseFloat(v) }),
    },
    {
      fieldType: "number",
      fieldLabel: "Book Value",
      fieldValue: formData.book_value,
      setFieldValue: (v) => setFormData({ ...formData, book_value: parseFloat(v) }),
    },
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