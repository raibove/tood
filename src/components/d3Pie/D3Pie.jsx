import * as d3 from "d3";
import { useEffect, useRef } from "react";
const D3Pie = () => {
  const dataFetchedRef = useRef(false);
  let arrAngle = [];
  let angleIndex = 0;
  let pi = Math.PI;

  let newAngle = 0;
  let tempAngle = 0;
  let height = 300,
    width = 300,
    margin = { top: 15, left: 15, bottom: 15, right: 15 };
  let radius = (height - margin.top - margin.bottom) / 2;

  let angularScale = d3.scaleLinear().range([0, 359]);
  let abval = angularScale.invert(0);

  const createSvg = () => {
    const parent = d3
      .select(".ring-input")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const ring = parent
      .append("g")
      .attr("id", "rim")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    ring
      .append("circle")
      .attr("r", radius)
      .attr("class", "ring")
      .attr("id", "ring")
      .attr("fill", "white");

    const hndl = ring
      .append("circle")
      .attr("r", 10)
      .attr("class", "handle")
      .attr("id", "handle")
      .attr("transform", function (d) {
        return (
          "rotate(" + angularScale(abval) + ")  translate(0,-" + radius + ")"
        );
      });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    createSvg();
  }, []);

  return (
    <div>
      <div className="ring-input"></div>
    </div>
  );
};

export default D3Pie;
