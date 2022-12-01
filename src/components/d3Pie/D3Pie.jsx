import * as d3 from "d3";
import { useEffect, useRef } from "react";
const D3Pie = () => {
  const dataFetchedRef = useRef(false);
  let angleIndex = 0;
  let pi = Math.PI;
  let arrAngle = [];

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

    const drag = d3
      .drag()
      .subject(function (event, d) {
        return event;
      })
      .on("drag", dragmove)
      .on("end", function (d) {
        newAngle = tempAngle;
        arrAngle.push(angularScale(abval));
        angleIndex++;
        addArc();
        hndl.moveToFront();
      });

    function addArc() {
      let arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(arrAngle[angleIndex - 1] * (pi / 180))
        .endAngle(arrAngle[angleIndex] * (pi / 180));
      ring
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", function () {
          return "hsl(" + Math.floor(Math.random() * 16777215) + ",100%,50%)";
        });
    }

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    const hndl = ring
      .append("circle")
      .attr("r", 10)
      .attr("class", "handle")
      .attr("id", "handle")
      .attr("transform", function (d) {
        return (
          "rotate(" + angularScale(abval) + ")  translate(0,-" + radius + ")"
        );
      })
      .call(drag);

    arrAngle.push(0);

    function dragmove(d, i) {
      if (tempAngle != 360) {
        let coordinates = d3.pointer(d.sourceEvent, parent.node());
        let x = coordinates[0] - radius;
        let y = coordinates[1] - radius;
        let currentAngle = Math.atan2(y, x) * (180 / pi);

        if (currentAngle < -90) {
          currentAngle += 360 + 90;
        } else {
          currentAngle += 90;
        }

        if (currentAngle > 359) {
          currentAngle = 360;
        }
        if (tempAngle == 0 && currentAngle > 290) {
          return;
        }
        if (currentAngle > newAngle) {
          tempAngle = currentAngle;
          abval = angularScale.invert(currentAngle);
        }

        d3.select(this).attr("transform", function (d) {
          return (
            "rotate(" + angularScale(abval) + ")  translate(0,-" + radius + ")"
          );
        });
      }
    }
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
