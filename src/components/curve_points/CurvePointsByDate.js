import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as d3 from "d3";
import DataTable from "../GenericDataComponents/DataTable";
import { API_HOSTNAME, CURVEPOINTS_BY_DATE_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const CurvePointsByDate = () => {
  const { curveName, adate } = useParams();
  const [curvePoints, setCurvePoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchFilteredCurvePoints = async () => {
      try {
        const res = await fetch(
          `${CURVEPOINTS_BY_DATE_ENDPOINT(curveName,adate)}`
        );
        if (!res.ok) throw new Error("Failed to fetch curve points");
        const data = await res.json();
        setCurvePoints(data);
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCurvePoints();
  }, [curveName, adate]);

  useEffect(() => {
    if (!curvePoints.length) return;

    d3.select(chartRef.current).selectAll("*").remove();

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

    const x = d3
      .scaleLinear()
      .domain(d3.extent(curvePoints, (d) => d.year))
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(curvePoints, (d) => d.rate) * 1.1])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.rate));

    svg
      .append("path")
      .datum(curvePoints)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(curvePoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.rate))
      .attr("r", 4)
      .attr("fill", "#007bff");
  }, [curvePoints]);

  return (
    <div className="container mt-4">
      <h2>
        Curve: <strong>{curveName}</strong> on <strong>{adate}</strong>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : curvePoints.length === 0 ? (
        <p>No curve points found for this curve and date.</p>
      ) : (
        <>
          <DataTable data={curvePoints} hiddenColumns={["id"]} width_pct={100} />
          <h4 className="mt-5">Yield Curve Chart</h4>
          <div ref={chartRef}></div>
        </>
      )}
    </div>
  );
};

export default CurvePointsByDate;