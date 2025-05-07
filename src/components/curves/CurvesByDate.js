import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as d3 from "d3";
import DataTable from "../GenericDataComponents/DataTable";
import { API_HOSTNAME } from "../ApiUtils/ApiEndpoints";

const CurvesByDate = () => {
  const { curveName, adate } = useParams();
  const [curves, setCurves] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchFilteredCurve = async () => {
      try {
        const res = await fetch(`${API_HOSTNAME}/fi/v1/curves/by-date/${curveName}/${adate}/`);
        if (!res.ok) throw new Error("Failed to fetch curve");
        const data = await res.json();
        setCurves(data);
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCurve();
  }, [curveName, adate]);

  useEffect(() => {
    if (!curves.length) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Set dimensions
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale (year)
    const x = d3
      .scaleLinear()
      .domain(d3.extent(curves, (d) => d.year))
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10));

    // Y scale (rate)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(curves, (d) => d.rate) * 1.1])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.rate));

    // Draw line
    svg
      .append("path")
      .datum(curves)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Dots
    svg
      .selectAll("circle")
      .data(curves)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.rate))
      .attr("r", 4)
      .attr("fill", "#007bff");

  }, [curves]);

  return (
    <div className="container mt-4">
      <h2>
        Curve: <strong>{curveName}</strong> on <strong>{adate}</strong>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : curves.length === 0 ? (
        <p>No data found for this curve and date.</p>
      ) : (
        <>
          <DataTable data={curves} hiddenColumns={["id"]} width_pct={100} />
          <h4 className="mt-5">Yield Curve Chart</h4>
          <div ref={chartRef}></div>
        </>
      )}
    </div>
  );
};

export default CurvesByDate;