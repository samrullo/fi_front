import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericNewData from "../GenericDataComponents/GenericNewData";
import { POSITIONS_ENDPOINT, VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const PositionNew = () => {
  const navigate = useNavigate();
  const { setFlashMessages } = useContext(AppContext);

  const [securityOptions, setSecurityOptions] = useState([]);
  const [securityId, setSecurityId] = useState(null);
  const [formData, setFormData] = useState({
    portfolio_name: "",
    position_date: "",
    lot_id: 0,
    quantity: 0,
    notional_amount: 0,
    par_value: 0,
    book_price: 0,
    book_value: 0,
    discounted_price: 0,
    discounted_value: 0,
  });

  useEffect(() => {
    const loadSecurities = async () => {
      try {
        const res = await fetch(VANILLA_BONDS_ENDPOINT);
        const data = await res.json();
        const formattedOptions = data.map(bond => ({
          value: bond.id,
          label: `${bond.asset_name} (${bond.identifier_client})`,
        }));
        setSecurityOptions(formattedOptions);
        if (formattedOptions.length > 0) setSecurityId(formattedOptions[0]);
      } catch (err) {
        setFlashMessages([{ category: "danger", message: "Failed to load securities." }]);
      }
    };

    loadSecurities();
  }, [setFlashMessages]);

  const handleNewData = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      security_id: securityId?.value,
    };

    try {
      const res = await fetch(POSITIONS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create position");

      setFlashMessages([{ category: "success", message: "Position created successfully." }]);
      navigate("/positions", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      setFlashMessages([{ category: "danger", message: "Error: " + err.message }]);
    }
  };

  const formFields = [
    {
      fieldType: "select",
      fieldLabel: "Security",
      fieldValue: securityId,
      setFieldValue: setSecurityId,
      selectOptions: securityOptions,
    },
    { fieldType: "text", fieldLabel: "Portfolio Name", fieldValue: formData.portfolio_name, setFieldValue: v => setFormData({ ...formData, portfolio_name: v }) },
    { fieldType: "date", fieldLabel: "Position Date", fieldValue: formData.position_date, setFieldValue: v => setFormData({ ...formData, position_date: v }) },
    { fieldType: "number", fieldLabel: "Lot ID", fieldValue: formData.lot_id, setFieldValue: v => setFormData({ ...formData, lot_id: v }) },
    { fieldType: "number", fieldLabel: "Quantity", fieldValue: formData.quantity, setFieldValue: v => setFormData({ ...formData, quantity: v }) },
    { fieldType: "number", fieldLabel: "Notional Amount", fieldValue: formData.notional_amount, setFieldValue: v => setFormData({ ...formData, notional_amount: v }) },
    { fieldType: "number", fieldLabel: "Par Value", fieldValue: formData.par_value, setFieldValue: v => setFormData({ ...formData, par_value: v }) },
    { fieldType: "number", fieldLabel: "Book Price", fieldValue: formData.book_price, setFieldValue: v => setFormData({ ...formData, book_price: v }) },
    { fieldType: "number", fieldLabel: "Book Value", fieldValue: formData.book_value, setFieldValue: v => setFormData({ ...formData, book_value: v }) },
    { fieldType: "number", fieldLabel: "Discounted Price", fieldValue: formData.discounted_price, setFieldValue: v => setFormData({ ...formData, discounted_price: v }) },
    { fieldType: "number", fieldLabel: "Discounted Value", fieldValue: formData.discounted_value, setFieldValue: v => setFormData({ ...formData, discounted_value: v }) },
  ];

  return (
    <GenericNewData
      title="New Position"
      formFields={formFields}
      handleNewData={handleNewData}
    />
  );
};

export default PositionNew;