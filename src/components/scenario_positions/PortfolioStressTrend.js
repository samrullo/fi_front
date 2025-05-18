import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
import { PORTFOLIO_STRESS_TREND_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const PortfolioStressTrend = () => {
    const [portfolio, setPortfolio] = useState("USIG");
    const [positionDate, setPositionDate] = useState("2025-04-30");
    const [scenarioName, setScenarioName] = useState("USD_SWAP_SHIFT_01");
    const [data, setData] = useState([]);
    const chartRef = useRef();

    const fetchData = async () => {
        try {
            const res = await axios.post(PORTFOLIO_STRESS_TREND_ENDPOINT, {
                portfolio,
                position_date: positionDate,
                scenario_name: scenarioName,
            });
            setData(res.data);
        } catch (err) {
            console.error("Error fetching portfolio stress trend:", err);
        }
    };

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
        }
    }, [data]);

    const drawChart = () => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 50, left: 70 };

        const processedData = data
            .map((d) => ({
                ...d,
                date: new Date(d.date),
                market_value: Number(d.market_value),
            }))
            .filter((d) => !isNaN(d.market_value))
            .sort((a, b) => a.period_number - b.period_number);

        const x = d3
            .scaleLinear()
            .domain(d3.extent(processedData, (d) => d.period_number))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, (d) => d.market_value) * 1.1])
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line()
            .x((d) => x(d.period_number))
            .y((d) => y(d.market_value))
            .curve(d3.curveMonotoneX);

        svg.attr("width", width).attr("height", height);

        svg
            .append("path")
            .datum(processedData)
            .attr("fill", "none")
            .attr("stroke", "#007bff")
            .attr("stroke-width", 3)
            .attr("d", line);

        // X Axis
        svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(processedData.length).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text("Period Number");

        // Y Axis
        svg
            .append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickFormat(d3.format(","))) // Format with commas
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -70) // Shift farther left
            .attr("x", -height / 2)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .text("Market Value");

        // Animated points
        svg
            .selectAll("circle")
            .data(processedData)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(d.period_number))
            .attr("cy", (d) => y(d.market_value))
            .attr("r", 0)
            .attr("fill", "red")
            .transition()
            .delay((_, i) => i * 100)
            .duration(300)
            .attr("r", 4);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">📈 Portfolio Stress Trend</h2>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label fw-bold">Portfolio:</label>
                    <input
                        className="form-control"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Position Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={positionDate}
                        onChange={(e) => setPositionDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Scenario Name:</label>
                    <input
                        className="form-control"
                        value={scenarioName}
                        onChange={(e) => setScenarioName(e.target.value)}
                    />
                </div>
            </div>

            <div className="text-end mb-4">
                <button className="btn btn-primary" onClick={fetchData}>
                    🚀 Generate Chart
                </button>
            </div>

            <div className="border p-3 rounded shadow-sm bg-white">
                <svg ref={chartRef} className="w-100 d-block mx-auto"></svg>
            </div>
        </div>
    );
};

export default PortfolioStressTrend;