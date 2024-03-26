import React from "react";
import CusButton from "../Button/Button";
import style from './index.module.css'

const DltPopUp = ({onClickNo,onClickYes,msg}) => {

  return (
    <>
      <div className={style.dltPopUp}>
        <div className={style.dltPopUpWrapper}>
          <h6>{msg}</h6>
          <div className={style.dltPopUpBtn}>
            <CusButton label="Yes" bgColor="rgba(255,0,0,0.8)" color="white" onClick={onClickYes}/>
            <CusButton
              label="No"
              bgColor="rgba(0,0,0,0.6)"
              color="white"
              onClick={onClickNo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DltPopUp;
