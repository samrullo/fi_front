import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { POSITIONS_ENDPOINT, VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const PositionEdit = () => {
  const { positionId } = useParams();
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
    const fetchSecurityOptions = async () => {
      try {
        const res = await fetch(VANILLA_BONDS_ENDPOINT);
        const data = await res.json();
        setSecurityOptions(data.map(b => ({
          value: b.id,
          label: `${b.asset_name} (${b.identifier_client})`,
        })));
      } catch (err) {
        setFlashMessages([{ category: "danger", message: "Failed to load bond list." }]);
      }
    };

    const fetchPosition = async () => {
      try {
        const res = await fetch(`${POSITIONS_ENDPOINT}${positionId}/`);
        if (!res.ok) throw new Error("Failed to fetch position");
        const data = await res.json();
        setSecurityId({ value: data.security, label: data.identifier_client || `ID ${data.security}` });
        setFormData({ ...data });
      } catch (err) {
        setFlashMessages([{ category: "danger", message: "Failed to fetch position: " + err.message }]);
        navigate("/positions");
      }
    };

    fetchSecurityOptions();
    fetchPosition();
  }, [positionId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, security_id: securityId.value };

    try {
      const res = await fetch(`${POSITIONS_ENDPOINT}${positionId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update");

      setFlashMessages([{ category: "success", message: "Position updated successfully!" }]);
      navigate("/positions", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      setFlashMessages([{ category: "danger", message: "Update failed: " + err.message }]);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${POSITIONS_ENDPOINT}${positionId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setFlashMessages([{ category: "warning", message: "Position deleted." }]);
      navigate("/positions", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      setFlashMessages([{ category: "danger", message: "Delete failed: " + err.message }]);
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
    <GenericEditData
      title={`Edit Position ID ${positionId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default PositionEdit;