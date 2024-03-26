import React from "react";
import style from "./button.module.css";

const CusButton = ({ bgColor, color, label, onClick, disabled, cursor }) => {
  return (
    <>
      <button
        style={{ backgroundColor: bgColor, color: color, cursor: cursor }}
        className={style.btnStyle}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
};

export default CusButton;
