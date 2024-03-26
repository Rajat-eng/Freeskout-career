import React from "react";
import style from "./index.module.css";
import { MdStickyNote2 } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { ImUserCheck } from "react-icons/im";
import { FaUsersCog } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const JdRender = (props) => {
  const {jobInput}=props;

  return (
    <div className={style.job}>
      <div className={style.job_container}>
        <div className={style.job_heading}>
          <h5>{jobInput.jobTitle}</h5>
          <p>{jobInput.designation}</p>
        </div>
        <div className={style.main}>
          <div className={style.main_component}>
            <span className={style.icon}>
              <MdStickyNote2 />
            </span>
            <span className={style.one}>Job Posted</span>
            <span className={style.two}>{new Date(jobInput.createdAt).toLocaleDateString('en-GB')}</span>
          </div>
          <div className={style.main_component}>
            <span className={style.icon}>
              <HiUserAdd />
            </span>
            <span className={style.one}>Applicants</span>
            <span className={style.two}>{jobInput.total_Applications}</span>
          </div>
          <div className={style.main_component}>
            <span className={style.icon}>
              <BsFillCalendarDateFill />
            </span>
            <span className={style.one}>Last Date</span>
            <span className={style.two}>{new Date(jobInput.lastApply).toLocaleDateString('en-GB')}</span>
          </div>
          <div className={style.main_component}>
            <span className={style.icon}>
              <ImUserCheck />
            </span>
            <span className={style.one}>Shortlisted</span>
            <span className={style.two}>{jobInput.total_Rejected}</span>
          </div>
          <div className={style.main_component}>
            <span className={style.icon}>
              <FaUsersCog />
            </span>
            <span className={style.one}>Total Interviews</span>
            <span className={style.two}>{jobInput.total_Scheduled}</span>
          </div>
          <div className={style.main_component}>
            <span className={style.icon}>
              <FaHandHoldingWater />
            </span>
            <span className={style.one}>Vacancy</span>
            <span className={style.two}>10</span>
          </div>
        </div>
        <div className={style.viewDetailsBtn}>
          <NavLink to={`${jobInput._id}`}>
            <button>View Details</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default JdRender;
