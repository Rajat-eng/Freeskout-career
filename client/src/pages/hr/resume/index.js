import React from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { MdMail } from "react-icons/md";
import CusButton from "../../../components/Button/Button";
import style from "./index.module.css";
import map from "../../../assets/img/map.png";
import edu from "../../../assets/img/edu.png";
import job from "../../../assets/img/job.png";

const Resume = ({ user, back }) => {
  const goBack = (f) => {
    back.sendBack(f);
  };

  return (
    <>
      <div className={style.applPortfolio}>
        <div className={style.apWrapper}>
          <div className={style.header}>
            <h3 className={style.apTitle}>Resume</h3>
            <CusButton
              color="white"
              bgColor="Green"
              label="Go Back"
              onClick={() => goBack(false)}
            />
          </div>
          <div className={`row ${style.rowDiv}`}>
            <fieldset className="border border-success px-2 rounded mt-0">
              <legend className="float-none w-auto px-3">
                Personal Details
              </legend>
              <div className={style.personalDetails}>
                <div className={style.pdChild1}>
                  <p className={style.pdTitle}>
                    <span className={style.icons}>
                      <FaUser />
                    </span>
                    {`${user?.firstname} ${user?.lastname}`}
                  </p>
                  <p>
                    <span className={style.icons}>
                      <MdMail />
                    </span>{" "}
                    {user?.email}
                  </p>
                  <p>
                    <span className={style.icons}>
                      <FaPhoneAlt />
                    </span>{" "}
                    {user?.phone}
                  </p>
                  <p>
                    <span className={style.icons}>
                      <BsCalendarDateFill />
                    </span>{" "}
                    DOB -: {user?.personalDetails.dob}
                  </p>
                </div>
                <div className={style.pdChild2}>
                  <p>
                    Gender : <span>{user?.personalDetails.gender}</span>
                  </p>
                  <p>
                    Status : -{" "}
                    <span>
                      {" "}
                      {user?.personalDetails.maritalStatus
                        ? "Married"
                        : "Unmarried"}
                    </span>
                  </p>
                  <p>
                    Difrentialy abled :
                    <span>
                      {user?.personalDetails.differentlyAbled ? "Yes" : "No"}
                    </span>
                  </p>
                  <p>
                    Languages :
                    {user?.personalDetails.languages.map((elem) => (
                      <span style={{ marginRight: "4px" }}> {elem}</span>
                    ))}
                  </p>
                </div>
              </div>
            </fieldset>
          </div>
          <div className={`row ${style.rowDiv}`}>
            <fieldset className="border border-success px-2 rounded d-flex justify-content-between">
              <legend className="float-none w-auto px-3">Address</legend>
              <div className={style.personalDetails}>
                <div className={style.pdChild1}>
                  <p>{user?.personalDetails?.address?.addressline1}</p>
                  <p>City : {user?.personalDetails?.address?.district}</p>
                  <p>State : {user?.personalDetails?.address?.state}</p>
                  <div className="d-flex gap-5">
                    <p>Country : India</p>
                    <p>Pincode : {user?.personalDetails?.address?.pincode}</p>
                  </div>
                </div>
              </div>
              <div className={style.addressImg}>
                <img src={map} alt="" />
              </div>
            </fieldset>
          </div>
          <div className={`row ${style.rowDiv}`}>
            <fieldset className="border border-dark px-2 rounded mt-0">
              <legend className="float-none w-auto px-3">Education</legend>
              <div className={style.personalDetails}>
                <div className={style.pdChild1}>
                  {user?.education.map((item) => (
                    <>
                      <p>{item.institutionName}</p>
                      <p>{item.qualification}</p>
                      <div className={style.studyStartEnd}>
                        <div>
                          Start : <span>{item.startYear}</span>
                        </div>
                        <div>
                          End : <span>{item.endYear}</span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className={style.addressImg}>
                  <img src={edu} alt="" />
                </div>
              </div>
            </fieldset>
          </div>
          <div className={`row ${style.rowDiv}`}>
            <fieldset className="border border-dark px-2 rounded mt-0">
              <legend className="float-none w-auto px-3">
                Work Experience
              </legend>
              <div className={style.personalDetails}>
                <div className={style.pdChild1}>
                  {user?.workexp.map((item) => (
                    <>
                      <p>{item.company}</p>
                      <p>Front End Developer</p>
                      <div className={style.studyStartEnd}>
                        <p>{item.type}</p>
                        <div className={style.studyStartEnd}>
                          Months : {item.duration}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className={style.addressImg}>
                  <img src={job} alt="" />
                </div>
              </div>
            </fieldset>
          </div>
          <div className={`row ${style.rowDiv}`}>
            <fieldset className="border border-dark px-2  pb-2 rounded mt-0">
              <legend className="float-none w-auto px-3">
                Skills & Resume
              </legend>
              <div className={style.personalDetails}>
                <div className="skillsChild">
                  {user?.skills.map((item) => (
                    <div>
                      <h6>{item}</h6>
                    </div>
                  ))}
                </div>
                <div className={style.resumeContainer}>
                  Resume download <br />
                  <button className={style.pdfDownloadBtn}>
                    <a
                      rel="noreferrer"
                      href={user?.resume.secure_url}
                      target="_blank"
                    >
                      Click Here &nbsp; <FiDownloadCloud />
                    </a>
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
