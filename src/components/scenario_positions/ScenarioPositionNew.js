import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { SCENARIO_POSITIONS_ENDPOINT, STRESS_SCENARIOS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const ScenarioPositionNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [scenarioList, setScenarioList] = useState([]);
  const [formData, setFormData] = useState({
    scenario_id: null,
    portfolio_name: "",
    position_date: "",
    lot_id: 0,
    security_id: null,
    quantity: 0,
    notional_amount: 0,
    par_value: 0,
    book_price: 0,
    book_value: 0,
    discounted_price: null,
    discounted_value: null,
  });

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await fetch(STRESS_SCENARIOS_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch stress scenarios");
        const data = await res.json();
        setScenarioList(data);
        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            scenario_id: { value: data[0].id, label: data[0].scenario_details?.name || `Scenario ${data[0].id}` }
          }));
        }
      } catch (err) {
        setFlashMessages([
          { category: "danger", message: "Error loading scenarios: " + err.message }
        ]);
      }
    };

    fetchScenarios();
  }, [setFlashMessages]);

  const handleNewData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(SCENARIO_POSITIONS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, scenario_id: formData.scenario_id.value }),
      });

      if (!res.ok) throw new Error("Failed to create Scenario Position");

      setFlashMessages([
        { category: "success", message: "Scenario position created successfully." }
      ]);

      navigate("/scenario-positions", {
        replace: true,
        state: { timestamp: new Date().getTime() },
      });
    } catch (err) {
      setFlashMessages([
        { category: "danger", message: "Error: " + err.message }
      ]);
    }
  };

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Scenario",
      fieldValue: formData.scenario_id,
      setFieldValue: (v) => setFormData({ ...formData, scenario_id: v }),
      selectOptions: scenarioList.map((s) => ({
        value: s.id,
        label:
          `${s.scenario_details.name} period ${s.period_number} simulation ${s.simulation_number} curve ${s.curve_details.curve_name.name} adate ${s.curve_details.adate} year ${s.curve_details.year} shock ${s.parallel_shock_size}` ||
          `Scenario ${s.id}`,
      })),
    },
    { fieldType: "text", fieldLabel: "Portfolio Name", fieldValue: formData.portfolio_name, setFieldValue: (v) => setFormData({ ...formData, portfolio_name: v }) },
    { fieldType: "date", fieldLabel: "Position Date", fieldValue: formData.position_date, setFieldValue: (v) => setFormData({ ...formData, position_date: v }) },
    { fieldType: "number", fieldLabel: "Lot ID", fieldValue: formData.lot_id, setFieldValue: (v) => setFormData({ ...formData, lot_id: parseInt(v) }) },
    { fieldType: "number", fieldLabel: "Security ID", fieldValue: formData.security_id, setFieldValue: (v) => setFormData({ ...formData, security_id: parseInt(v) }) },
    { fieldType: "number", fieldLabel: "Quantity", fieldValue: formData.quantity, setFieldValue: (v) => setFormData({ ...formData, quantity: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Notional Amount", fieldValue: formData.notional_amount, setFieldValue: (v) => setFormData({ ...formData, notional_amount: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Par Value", fieldValue: formData.par_value, setFieldValue: (v) => setFormData({ ...formData, par_value: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Book Price", fieldValue: formData.book_price, setFieldValue: (v) => setFormData({ ...formData, book_price: parseFloat(v) }) },
    { fieldType: "number", fieldLabel: "Book Value", fieldValue: formData.book_value, setFieldValue: (v) => setFormData({ ...formData, book_value: parseFloat(v) }) },
  ];

  return (
    <GenericNewData
      title="New Scenario Position"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default ScenarioPositionNew;