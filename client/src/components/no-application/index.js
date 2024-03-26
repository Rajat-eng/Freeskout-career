import React from "react";
import { BiSearch } from "react-icons/bi";
import style from "./index.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

const NoApplication = ({ heading, para, btnDisp }) => {
  const nav = useNavigate();

  const goBack = () => {
    nav(-1);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.icons}>
          <BiSearch />
        </div>
        <div className={style.details}>
          <h6>{heading}</h6>
          <p>
            {para}
          </p>
        </div>
        {btnDisp && (
          <div className={style.btns}>
            <button onClick={goBack}>Back</button> &nbsp;
            <button>
              <AiOutlinePlus />
              <NavLink to="/"> Apply now</NavLink>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NoApplication;
