import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";
import FloatInput from "./FloatInput";

import "./D3Pie.css";
import axios from "axios";

const { TextArea } = Input;

const D3Pie = () => {
  const myRef = useRef();
  const pi = Math.PI;
  let height = 300,
    width = 300,
    margin = { top: 15, left: 15, bottom: 15, right: 15 };
  let radius = (height - margin.top - margin.bottom) / 2;
  let angularScale = d3.scaleLinear().range([0, 359]);

  const [arrAngle, setArrAngle] = useState([0]);
  const [arcArray, setArcArray] = useState([]);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDo, setToDo] = useState([]);
  const [newAngle, setNewAngle] = useState(0);
  const [abVal, setAbVal] = useState(angularScale.invert(0));
  const [angleIndex, setAngleIndex] = useState(0);
  const [id, setId] = useState(0);

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

  const handleOk = async () => {
    try {
      let tempToDo = toDo;
      let newToDo = {
        title: title,
        status: false,
        id: id,
      };

      const response = await axios.post(`api/todos`, newToDo);
      console.log(response);
      var myPath = document.querySelector(`#arc${id}`);
      setId(() => id + 1);
      setToDo([...tempToDo, newToDo]);
      setTitle("");
      setIsModalOpen(false);

      myPath.addEventListener("click", function () {
        alert(`click ${id}`);
      });
    } catch (error) {
      console.log(error);
      console.log("failed to set error");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", "4")
        .attr("transform", function (d) {
          return (
            "rotate(" + angularScale(abVal) + ")  translate(0,-" + radius + ")"
          );
        });
    } else {
      return handle;
    }
  };

  const createSvg = () => {
    const parent = d3.select(".ring-input-svg");
    let tempAbVal = abVal;
    let tempAngle = newAngle;
    const ring = getRing();
    const drag = d3
      .drag()
      .subject(function (event, d) {
        return event;
      })
      .on("drag", dragmove)
      .on("end", function (d) {
        if (arrAngle[arrAngle.length - 1] !== angularScale(tempAbVal)) {
          setNewAngle(tempAngle);
          let tempArrAngle = arrAngle;
          tempArrAngle.push(angularScale(tempAbVal));
          setArrAngle(tempArrAngle);

          setAngleIndex(angleIndex + 1);
          addArc(angleIndex + 1);
          hndl.moveToFront();
          showModal();
        }
      });

    function addArc(tempAngleIndex) {
      let arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(arrAngle[tempAngleIndex - 1] * (pi / 180))
        .endAngle(arrAngle[tempAngleIndex] * (pi / 180));

      let colorArc = ring
        .append("path")
        .attr("class", "arc")
        .attr("id", `arc${id}`)
        .attr("d", arc)
        .attr("fill", function () {
          return "hsl(" + Math.floor(Math.random() * 16777215) + ",100%,50%)";
        });

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
          setAbVal(angularScale.invert(currentAngle));
          tempAbVal = angularScale.invert(currentAngle);
        }

        d3.select(this).attr("transform", function (d) {
          return (
            "rotate(" +
            angularScale(tempAbVal) +
            ")  translate(0,-" +
            radius +
            ")"
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
    console.log(e.target.value);
    let index = toDo.findIndex((object) => {
      return object.id == e.target.value;
    });
    // if (index === undefined) index = 0;
    console.log(toDo);
    console.log(index);
    let tempToDo = toDo;
    tempToDo[index].status = !tempToDo[index].status;
    console.log(tempToDo[index].arc);

    if (tempToDo[index].arc === undefined) {
      console.log("in undefined");
      console.log(arcArray[index].attr("fill"));
      tempToDo[index].arc = arcArray[index];
    }
    setToDo([...tempToDo]);
    console.log(tempToDo[index].status);
    // if (tempToDo[index].status === true) arcArray[index].attr("fill", "grey");
    // else arcArray[index].attr("fill", tempToDo[index].arc.attr("fill"));
  };

  return (
    <div className="to-do-container">
      <div className="ring-input">
        <svg height={height} width={width}>
          <g transform="translate(15,15)" className="ring-input-svg"></g>
        </svg>
      </div>
      <div className="to-do-list">
        {toDo.length === 0 && (
          <h2 className="to-do-empty">
            No to-do item created. Drag the handle to create to-do
          </h2>
        )}
        {toDo.map((toDoItem, index) => (
          <div key={index} className="to-do-item-container">
            <input
              type="checkbox"
              id={toDoItem.title}
              name={toDoItem.title}
              value={index}
              className="to-do-input"
              onChange={checkboxChange}
            ></input>
            <label
              className={
                toDoItem.status ? "to-do-item to-do-status" : "to-do-item"
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

//to-do : on check dark to normal color
