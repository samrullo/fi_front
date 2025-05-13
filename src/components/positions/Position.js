import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import { fetchResource } from "../ApiUtils/fetch_data";
import { POSITIONS_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const Position = () => {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const { timestamp } = state ?? {};
  const [positions, setPositions] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const rawData = await fetchResource(POSITIONS_ENDPOINT, "positions");

        const flattened = rawData.map((item) => {
          const sec = item.security || {};
          return {
            ...item,
            identifier_client: sec.identifier_client || "",
            asset_name: sec.asset_name || "",
            fixed_coupon: sec.fixed_coupon || "",
            frequency: sec.frequency || "",
            maturity: sec.maturity || "",
            currency: sec.currency || "",
          };
        });

        setPositions(flattened);
      } catch (err) {
        console.error("Failed to fetch positions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPositions();
  }, [timestamp]);

  useEffect(() => {
    if (selectedRowData) {
      navigate(`/positions/edit/${selectedRowData.id}`);
    }
  }, [selectedRowData]);

  const columns = [
    { field: "portfolio_name", headerName: "Portfolio" },
    { field: "identifier_client", headerName: "Client ID" },
    { field: "asset_name", headerName: "Asset Name" },
    { field: "fixed_coupon", headerName: "Coupon (%)" },
    { field: "frequency", headerName: "Frequency" },
    { field: "maturity", headerName: "Maturity Date" },
    { field: "currency", headerName: "Currency" },
    { field: "position_date", headerName: "Date" },
    { field: "lot_id", headerName: "Lot ID" },
    { field: "quantity", headerName: "Quantity" },
    { field: "notional_amount", headerName: "Notional" },
    { field: "par_value", headerName: "Par Value" },
    { field: "book_price", headerName: "Book Price" },
    { field: "book_value", headerName: "Book Value" },
    { field: "discounted_price", headerName: "Disc. Price" },
    { field: "discounted_value", headerName: "Disc. Value" },
  ];

  return (
    <div className="container mt-4">
      <h2>Positions</h2>
      <Link className="btn btn-primary mb-3" to="/positions/new">
        Add New Position
      </Link>
      <Outlet />
      {loading ? (
        <p>Loading...</p>
      ) : positions.length === 0 ? (
        <p>No positions found.</p>
      ) : (
        <DataTable
          data={positions}
          columns={columns}
          hiddenColumns={["id"]}
          width_pct={100}
          onRowClick={(event) => setSelectedRowData(event.data)}
        />
      )}
    </div>
  );
};

export default Position;