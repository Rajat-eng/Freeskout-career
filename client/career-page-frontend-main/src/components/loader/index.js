import React from "react";
import style from './index.module.css'

const Loader = () => {
  return (
    <>
      <div className={style.overlay}>
        <div className={style.overlayContent}>
          <div className={style.loader}>
            <div className={style.inner}></div>
          </div>
          <h5 className={style.heading}>Loading</h5>
        </div>
      </div>
    </>
  );
};

export default Loader;