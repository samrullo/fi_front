import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";

const DataTable = ({ data, columns, hiddenColumns, onRowClick, width_pct }) => {
  if (!width_pct) width_pct = 50;
  const [rowData, setRowData] = useState(data);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const handleFilterChange = (event) => {
    const { column, filter } = event;
    if (filter) {
      const filterValue = filter.toLowerCase();
      const filteredRows = data.filter((row) =>
        row[column.field]?.toString().toLowerCase().includes(filterValue)
      );
      setRowData(filteredRows);
    } else {
      setRowData(data);
    }
  };

  const generateAllColumnDefs = () =>
    Object.keys(data[0] || {}).map((columnKey) => ({
      field: columnKey,
      headerName: columnKey,
      valueFormatter: (params) =>
        params.value ? params.value.toLocaleString() : null,
      sortable: true,
      filter: true,
      filterParams: {
        filterOptions: ["contains", "notContains", "startsWith", "endsWith"],
        suppressAndOrCondition: true,
      },
    }));

  const baseColumnDefs = columns
    ? columns.map((col) => ({
        ...col,
        sortable: true,
        filter: true,
        filterParams: {
          filterOptions: ["contains", "notContains", "startsWith", "endsWith"],
          suppressAndOrCondition: true,
        },
        valueFormatter: (params) =>
          params.value ? params.value.toLocaleString() : null,
      }))
    : generateAllColumnDefs();

  const myHiddenColumns = hiddenColumns || [];
  const columnDefs = baseColumnDefs.map((colDef) =>
    myHiddenColumns.includes(colDef.field)
      ? { ...colDef, hide: true }
      : colDef
  );

  return (
    <div className="container mt-5">
      <div
        className="ag-theme-material"
        style={{ height: "400px", width: `${width_pct}%` }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onFilterChanged={handleFilterChange}
          onRowClicked={onRowClick}
        />
      </div>
    </div>
  );
};

export default DataTable;