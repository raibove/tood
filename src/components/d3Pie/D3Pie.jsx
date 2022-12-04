import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";
import FloatInput from "./FloatInput";

import "./D3Pie.css";

const { TextArea } = Input;

const D3Pie = () => {
  const myRef = useRef();
  const [arrAngle, setArrAngle] = useState([]);
  const [arcArray, setArcArray] = useState([]);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDo, setToDo] = useState([]);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    createSvg();
    setTimeout(() => {
      if (myRef && myRef.current) {
        const { input } = myRef.current;
        input.focus();
      }
    }, 1);
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let tempToDo = toDo;
    let newToDo = {
      title: title,
      completed: false,
    };
    // tempToDo.push(title);
    setTitle("");
    // setToDo(tempToDo);
    setToDo([...tempToDo, newToDo]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let angleIndex = 0;
  const pi = Math.PI;

  let newAngle = 0;
  let tempAngle = 0;
  let height = 300,
    width = 300,
    margin = { top: 15, left: 15, bottom: 15, right: 15 };
  let radius = (height - margin.top - margin.bottom) / 2;

  let angularScale = d3.scaleLinear().range([0, 359]);
  let abval = angularScale.invert(0);

  const getRing = () => {
    const parent = d3.select(".ring-input-svg");
    let ring = d3.select("#rim");
    if (ring.empty()) {
      ring = parent
        .append("g")
        .attr("id", "rim")
        .attr("transform", "translate(" + radius + "," + radius + ")");

      ring
        .append("circle")
        .attr("r", radius)
        .attr("class", "ring")
        .attr("id", "ring")
        .attr("fill", "white");

      return ring;
    } else {
      return ring;
    }
  };

  const getHandle = () => {
    let ring = d3.select("#rim");
    let handle = d3.select("#handle");
    if (handle.empty()) {
      return ring
        .append("circle")
        .attr("r", 10)
        .attr("class", "handle")
        .attr("id", "handle")
        .attr("transform", function (d) {
          return (
            "rotate(" + angularScale(abval) + ")  translate(0,-" + radius + ")"
          );
        });
    } else {
      return handle;
    }
  };

  const createSvg = () => {
    const parent = d3.select(".ring-input-svg");

    const ring = getRing();
    const drag = d3
      .drag()
      .subject(function (event, d) {
        return event;
      })
      .on("drag", dragmove)
      .on("end", function (d) {
        newAngle = tempAngle;
        let tempArrAngle = arrAngle;
        tempArrAngle.push(angularScale(abval));
        setArrAngle(tempArrAngle);
        angleIndex++;
        addArc();
        hndl.moveToFront();
        showModal();
      });

    function addArc() {
      let arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(arrAngle[angleIndex - 1] * (pi / 180))
        .endAngle(arrAngle[angleIndex] * (pi / 180));
      let colorArc = ring
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", function () {
          return "hsl(" + Math.floor(Math.random() * 16777215) + ",100%,50%)";
        });
      console.log(arcArray);
      console.log(arrAngle);
      let tempArcArray = arcArray;
      tempArcArray.push(colorArc);
      setArcArray(tempArcArray);
    }

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    const hndl = getHandle();

    hndl.call(drag);

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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOk();
    }
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const checkboxChange = (e) => {
    const index = toDo.findIndex((object) => {
      return object.title === e.target.value;
    });

    let tempToDo = toDo;
    tempToDo[index].completed = !tempToDo[index].completed;
    setToDo([...tempToDo]);
  };

  return (
    <div className="to-do-container">
      <div className="ring-input">
        <svg height={height} width={width}>
          <g transform="translate(15,15)" className="ring-input-svg"></g>
        </svg>
      </div>
      <div className="to-do-list">
        {toDo.map((toDoItem, index) => (
          <div key={index} className="to-do-item-container">
            <input
              type="checkbox"
              id={toDoItem.title}
              name={toDoItem.title}
              value={toDoItem.title}
              className="to-do-input"
              onChange={checkboxChange}
            ></input>
            <label
              className={
                toDoItem.completed ? "to-do-item to-do-completed" : "to-do-item"
              }
            >
              {toDoItem.title}
            </label>
          </div>
        ))}
      </div>
      <Modal
        title="To do"
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
        okText="Save"
        maskClosable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <div className="to-do-title">
          <FloatInput
            label="Title"
            placeholder="Title here please"
            name="title"
            onChange={onChange}
            onKeyDown={handleKeyDown}
            value={title}
            required={true}
            myRef={myRef}
          />
        </div>
        <TextArea rows={4} placeholder="description (optional)" />
      </Modal>
    </div>
  );
};

export default D3Pie;
