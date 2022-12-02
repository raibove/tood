import React, { useState } from "react";
import { Input } from "antd";

import "./FloatInput.css";

const FloatInput = (props) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        onChange={props.onChange}
        type={type}
        value={value}
        // defaultValue={value}
        size="large"
        ref={props.myRef}
        autoFocus={true}
        onKeyDown={props.onKeyDown}
      />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default FloatInput;
