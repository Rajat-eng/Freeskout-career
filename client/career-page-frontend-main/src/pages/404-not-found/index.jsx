import React from "react";
import style from "./index.module.css";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <section className={style.pageNotContainer}>
        <div className="container">
          <div className="text-center">
            <div className={style.notFoundAnim}>
              <h1>404</h1>
              <span>Page Not Found</span>
            </div>
            <div className={style.pageNotFoundBtn}>
              <NavLink to={"/"}><button>Go to Home</button></NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
