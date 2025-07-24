import { useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import {
  processEducationComputerDataForD3,
  getHeatMapColor,
  type D3HeatmapDataPoint,
} from '../../data/chartData';
import type { LegendItem, D3ChartMargin } from '../../types/chart';

const EducationComputerChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const clickedCellRef = useRef<string | null>(null);


  const { data: heatmapData, countries, levels } = useMemo(
    () => processEducationComputerDataForD3(),
    []
  );

  const updateCellStates = useCallback(
    (
      cells: d3.Selection<SVGRectElement, D3HeatmapDataPoint, SVGGElement, unknown>
    ) => {
      cells
        .style('filter', d => {
          const id = `${d.country}-${d.level}`;
          return clickedCellRef.current === id
            ? 'none'
            : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.15))';
        })
        .attr('fill', d => getHeatMapColor(d.value))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1);
    },
    []
  );

  /* ------------------------------------------------------------------ */
  /*                           DRAW CHART                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!svgRef.current || !heatmapData.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    /* ---------- sizing ---------- */
    const W = svgRef.current.clientWidth;
    const H = svgRef.current.clientHeight;

    const margin: D3ChartMargin = { top: 20, right: 80, bottom: 80, left: 120 };
    const availW = W - margin.left - margin.right;
    const availH = H - margin.top - margin.bottom;

    const cellW = availW / countries.length;
    const cellH = availH / levels.length;
    const cellSize = Math.max(Math.min(cellW, cellH), 25) + 2;

    const chartW = cellSize * countries.length;
    const chartH = cellSize * levels.length;

    const xOffset = Math.max(0, (availW - chartW) / 2);
    /* raise the chart 15 px */
    const yOffset = Math.max(0, (availH - chartH) / 2) - 15;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left + xOffset},${margin.top + yOffset})`);

    /* ---------- scales ---------- */
    const xScale = d3.scaleBand<string>().domain(countries).range([0, chartW]).padding(0);
    const yScale = d3.scaleBand<string>().domain(levels).range([0, chartH]).padding(0);

    /* ---------- tooltip ---------- */
    const tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    const tooltipRect = tooltip
      .append('rect')
      .attr('fill', 'rgba(255, 255, 255, 0.95)')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('rx', 4)
      .attr('ry', 4)
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))');

    const tooltipText = tooltip.append('g').attr('class', 'tooltip-text');

    /* ---------- cells ---------- */
    const cells = g
      .selectAll<SVGRectElement, D3HeatmapDataPoint>('rect')
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.country)!)
      .attr('y', d => yScale(d.level)!)
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fill', d => getHeatMapColor(d.value))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.15))')
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget).attr('stroke-width', 2).attr('stroke', '#333');

        const [mx, my] = d3.pointer(event, svg.node());

        /* build tooltip */
        tooltipText.selectAll('*').remove();
        tooltipText
          .append('text')
          .attr('x', 8)
          .attr('y', 16)
          .style('font-weight', 'bold')
          .style('font-size', '14px')
          .text(d.country);
        tooltipText
          .append('text')
          .attr('x', 8)
          .attr('y', 30)
          .style('font-size', '11px')
          .text(`Level: ${d.level}`);
        tooltipText
          .append('text')
          .attr('x', 8)
          .attr('y', 44)
          .style('font-size', '12px')
          .style('fill', getHeatMapColor(d.value))
          .style('font-weight', 600)
          .text(`Access: ${d.value !== null ? `${d.value}%` : 'No Data'}`);
        tooltipText
          .append('text')
          .attr('x', 8)
          .attr('y', 58)
          .style('font-size', '11px')
          .text(`Year: ${d.year ?? 'N/A'}`);

        const bb = tooltipText.node()!.getBBox();
        const pad = 8;
        tooltipRect.attr('width', bb.width + pad * 2).attr('height', bb.height + pad * 2);

        let tx = mx + 10,
          ty = my - 10;
        if (tx + bb.width + pad * 2 > W) tx = mx - bb.width - pad * 2 - 10;
        if (ty + bb.height + pad * 2 > H - margin.bottom) ty = my - bb.height - pad * 2 - 10;

        tooltip.attr('transform', `translate(${tx},${ty})`).style('opacity', 1);
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-width', 1).attr('stroke', '#ffffff');
        tooltip.style('opacity', 0);
      })
      .on('click', (_, d) => {
        const id = `${d.country}-${d.level}`;
        clickedCellRef.current = clickedCellRef.current === id ? null : id;
        updateCellStates(cells);
      });

    /* ---------- axes ---------- */
    g.append('g')
      .attr('transform', `translate(0,${chartH})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', '10px')
      .style('fill', '#666')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#666');

    /* ---------- legend closer to chart ---------- */
    const legendData: LegendItem[] = [
      { range: '80-100%', color: '#08306b' },
      { range: '60-79%', color: '#2171b5' },
      { range: '40-59%', color: '#4292c6' },
      { range: '20-39%', color: '#6baed6' },
      { range: '1-19%', color: '#c6dbef' },
      { range: '0%', color: '#deebf7' },
      { range: 'No Data', color: '#f3f4f6' },
    ];

    const legend = g
      .append('g')
      /* moved up from +75 px to +40 px */
      .attr('transform', `translate(0, ${chartH + 40})`);

    const itemW = chartW / legendData.length;
    const legendItem = legend
      .selectAll('g')
      .data(legendData)
      .enter()
      .append('g')
      .attr('transform', (_d, i) => `translate(${i * itemW},0)`);

    legendItem
      .append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', d => d.color)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.5);

    legendItem
      .append('text')
      .attr('x', 22)
      .attr('y', 7.5)
      .attr('dy', '0.35em')
      .style('font-size', '11px')
      .style('fill', '#666')
      .text(d => d.range);
  }, [heatmapData, countries, levels, updateCellStates]);

  /* ------------------------------------------------------------------ */
  /*                            RENDER                                  */
  /* ------------------------------------------------------------------ */
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const containerH = isMobile ? 'h-72' : 'h-80'; // tighter to chart

  return (
    <div className="bg-white border border-gray-300 p-6 mb-16 mt-6">
      <div
        className={`w-full overflow-hidden ${containerH} relative`}
        style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ overflow: 'visible', outline: 'none' }}
        />
      </div>
    </div>
  );
};

export default EducationComputerChart;
