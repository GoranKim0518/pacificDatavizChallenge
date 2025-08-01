import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import * as d3 from "d3";
import {
  processEducationComputerDataForD3,
  getHeatMapColor,
  type D3HeatmapDataPoint,
} from "../../data/chartData";
import type { D3ChartMargin } from "../../types/chart";

const Y_LABEL_MARGIN_RIGHT = -17;

export default function EducationComputerChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickedCellRef = useRef<string | null>(null);

  const { data: heatmapData, countries, levels } = useMemo(
    () => processEducationComputerDataForD3(),
    []
  );

  const CELL_HEIGHT = 28;
  const LEGEND_SPACE = 60;
  const margin: D3ChartMargin = { top: 10, right: 80, bottom: 140, left: 68 };

  const chartH = levels.length * CELL_HEIGHT;
  const dynMinHeight = chartH + margin.top + margin.bottom + LEGEND_SPACE;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateCellStates = useCallback(
    (
      cells: d3.Selection<
        SVGRectElement,
        D3HeatmapDataPoint,
        SVGGElement,
        unknown
      >
    ) => {
      cells
        .style("filter", (d) => {
          const id = `${d.country}-${d.level}`;
          return clickedCellRef.current === id
            ? "none"
            : "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const setDims = () => {
      const { clientWidth, clientHeight } = containerRef.current!;
      setDimensions({ width: clientWidth, height: clientHeight });
    };
    setDims();
    let resizeObs: ResizeObserver | null = null;
    if (
      typeof window !== "undefined" &&
      typeof window.ResizeObserver !== "undefined" &&
      containerRef.current
    ) {
      resizeObs = new window.ResizeObserver(() => setDims());
      resizeObs.observe(containerRef.current);
    } else {
      window.addEventListener("resize", setDims);
    }
    return () => {
      if (resizeObs) {
        resizeObs.disconnect();
      } else {
        window.removeEventListener("resize", setDims);
      }
    };
  }, []);

  useEffect(() => {
    if (
      !svgRef.current ||
      !heatmapData.length ||
      !dimensions.width ||
      !dimensions.height
    )
      return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = dimensions.width;
    const H = dimensions.height;

    const availW = W - margin.left - margin.right;
    const availH = H - margin.top - margin.bottom;

    const cellW = availW / countries.length;
    const cellH = availH / levels.length;
    const cellSize = Math.min(cellW, cellH);

    const chartW = cellSize * countries.length;
    const realChartH = cellSize * levels.length;
    const fullChartHeight = realChartH + LEGEND_SPACE;

    const xOffset = Math.max(0, (availW - chartW) / 2);
    const yOffset = Math.max(0, (availH - fullChartHeight) / 2);

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left + xOffset},${margin.top + yOffset})`
      );

    const xScale = d3
      .scaleBand<string>()
      .domain(countries)
      .range([0, chartW])
      .padding(0);
    const yScale = d3
      .scaleBand<string>()
      .domain(levels)
      .range([0, realChartH])
      .padding(0);

    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("pointer-events", "none");

    const tooltipRect = tooltip
      .append("rect")
      .attr("fill", "rgba(255,255,255,0.95)")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("rx", 4)
      .attr("ry", 4)
      .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))");

    const tooltipText = tooltip.append("g").attr("class", "tooltip-text");

    const cells = g
      .selectAll<SVGRectElement, D3HeatmapDataPoint>("rect")
      .data(heatmapData, (d: any) => `${d.country}-${d.level}`)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.country)!)
      .attr("y", (d) => yScale(d.level)!)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", (d) => getHeatMapColor(d.value))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))")
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .attr("stroke-width", 2)
          .attr("stroke", "#333");
        const [mx, my] = d3.pointer(event, svg.node());

        tooltipText.selectAll("*").remove();
        tooltipText
          .append("text")
          .attr("x", 8)
          .attr("y", 16)
          .style("font-weight", "bold")
          .style("font-size", "14px")
          .text(d.country);
        tooltipText
          .append("text")
          .attr("x", 8)
          .attr("y", 30)
          .style("font-size", "11px")
          .text(`Level: ${d.level}`);
        tooltipText
          .append("text")
          .attr("x", 8)
          .attr("y", 44)
          .style("font-size", "12px")
          .style("fill", getHeatMapColor(d.value))
          .style("font-weight", 600)
          .text(`Access: ${d.value !== null ? `${d.value}%` : "No Data"}`);
        tooltipText
          .append("text")
          .attr("x", 8)
          .attr("y", 58)
          .style("font-size", "11px")
          .text(`Year: ${d.year ?? "N/A"}`);

        const bb = tooltipText.node()!.getBBox();
        const pad = 8;
        tooltipRect
          .attr("width", bb.width + pad * 2)
          .attr("height", bb.height + pad * 2);

        let tx = mx + 10,
          ty = my - 10;
        if (tx + bb.width + pad * 2 > W) tx = mx - bb.width - pad * 2 - 10;
        if (ty + bb.height + pad * 2 > H - margin.bottom)
          ty = my - bb.height - pad * 2 - 10;

        tooltip.attr("transform", `translate(${tx},${ty})`).style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#fff");
        tooltip.style("opacity", 0);
      })
      .on("click", (_, d) => {
        const id = `${d.country}-${d.level}`;
        clickedCellRef.current = clickedCellRef.current === id ? null : id;
        updateCellStates(cells);
      });

    g.append("g")
      .attr("transform", `translate(0,${realChartH})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .style("fill", "#666")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "10px")
      .style("fill", "#666")
      .attr("x", Y_LABEL_MARGIN_RIGHT)
      .attr("text-anchor", "end")
      .each(function (d: any) {
        const label = d as string;
        const tokens = label.split(" ");
        d3.select(this).text(null);
        tokens.forEach((word, j) => {
          d3.select(this)
            .append("tspan")
            .attr("x", Y_LABEL_MARGIN_RIGHT)
            .attr("dy", j === 0 ? 0 : 12)
            .text(word);
        });
      });

    const legendData = [
      { range: "80-100%", color: "#08306b" },
      { range: "60-79%", color: "#2171b5" },
      { range: "40-59%", color: "#4292c6" },
      { range: "20-39%", color: "#6baed6" },
      { range: "1-19%", color: "#c6dbef" },
      { range: "0%", color: "#deebf7" },
      { range: "No Data", color: "#f3f4f6" },
    ];

    const legend = g
      .append("g")
      .attr("transform", `translate(0, ${realChartH + 40})`);

    const itemW = chartW / legendData.length;

    const legendItem = legend
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (_d, i) => `translate(${i * itemW},0)`);

    legendItem
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 0.5);

    legendItem
      .append("text")
      .attr("x", 22)
      .attr("y", 7.5)
      .attr("dy", "0.35em")
      .style("font-size", "11px")
      .style("fill", "#666")
      .text((d) => d.range);
  }, [
    heatmapData,
    countries,
    levels,
    updateCellStates,
    dimensions.width,
    dimensions.height,
  ]);

  return (
    <>
      <div
        ref={containerRef}
        className="bg-white border border-gray-300 p-6"
        style={{
          marginTop: "2rem",
          minHeight: dynMinHeight,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ overflow: "visible", display: "block" }}
        />
      </div>

      <div
        className="text-xs text-gray-600 text-left"
        style={{
          fontFamily: "inherit",
          marginTop: "-10px",
          paddingTop: "6px",
          paddingBottom: "10px",
          marginBottom: "0",
          maxWidth: "100%",
        }}
      >
        <strong>Source:</strong> Computer access by education level & country (
        <a
          href="https://stats.pacificdata.org/vis?lc=en&df[ds]=SPC2&df[id]=DF_BP50&df[ag]=SPC&df[vs]=1.0&av=true&lo=1&lom=LASTNOBSERVATIONS&dq=A.SE_ACS_CMPTR.._T._T._T._T._T._T.._T&to[TIME_PERIOD]=false&pd=%2C"
          style={{ color: "#2563eb", textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          link
        </a>
        )
      </div>
    </>
  );
}