import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericEditData from "../GenericDataComponents/GenericEditData";
import { VANILLA_BONDS_ENDPOINT } from "../ApiUtils/ApiEndpoints";
import AppContext from "../../AppContext";

const VanillaBondEdit = () => {
  const navigate = useNavigate();
  const { bondId } = useParams();
  const { setFlashMessages } = useContext(AppContext);

  const [identifier_client, setIdentifierClient] = useState("");
  const [asset_name, setAssetName] = useState("");
  const [fixed_coupon, setFixedCoupon] = useState(0);
  const [frequency, setFrequency] = useState(2);
  const [maturity, setMaturity] = useState("");

  useEffect(() => {
    const fetchBond = async () => {
      try {
        const res = await fetch(`${VANILLA_BONDS_ENDPOINT}${bondId}/`);
        if (!res.ok) throw new Error("Failed to fetch bond");
        const data = await res.json();
        setIdentifierClient(data.identifier_client);
        setAssetName(data.asset_name);
        setFixedCoupon(data.fixed_coupon);
        setFrequency(data.frequency);
        setMaturity(data.maturity);
      } catch (err) {
        setFlashMessages([{ category: "danger", message: "Error loading bond: " + err.message }]);
        navigate("/vanilla-bonds");
      }
    };

    fetchBond();
  }, [bondId, navigate, setFlashMessages]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${VANILLA_BONDS_ENDPOINT}${bondId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier_client,
          asset_name,
          fixed_coupon: parseFloat(fixed_coupon),
          frequency: parseInt(frequency),
          maturity,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setFlashMessages([{ category: "success", message: "Bond updated successfully!" }]);
      navigate("/vanilla-bonds", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      setFlashMessages([{ category: "danger", message: "Error: " + err.message }]);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${VANILLA_BONDS_ENDPOINT}${bondId}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setFlashMessages([{ category: "warning", message: "Bond deleted." }]);
      navigate("/vanilla-bonds", { replace: true, state: { timestamp: new Date().getTime() } });
    } catch (err) {
      setFlashMessages([{ category: "danger", message: "Delete failed: " + err.message }]);
    }
  };

  const formFields = [
    { fieldType: "text", fieldLabel: "Client Identifier", fieldValue: identifier_client, setFieldValue: setIdentifierClient },
    { fieldType: "text", fieldLabel: "Asset Name", fieldValue: asset_name, setFieldValue: setAssetName },
    { fieldType: "number", fieldLabel: "Fixed Coupon", fieldValue: fixed_coupon, setFieldValue: setFixedCoupon },
    { fieldType: "number", fieldLabel: "Coupon Frequency", fieldValue: frequency, setFieldValue: setFrequency },
    { fieldType: "date", fieldLabel: "Maturity Date", fieldValue: maturity, setFieldValue: setMaturity },
  ];

  return (
    <GenericEditData
      title={`Edit Vanilla Bond ID ${bondId}`}
      formFields={formFields}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default VanillaBondEdit;