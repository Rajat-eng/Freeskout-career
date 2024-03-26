import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { FaPlayCircle, FaRupeeSign, FaSuitcase } from "react-icons/fa";
import { HiArrowLeft, HiCurrencyRupee } from "react-icons/hi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { TbCurrencyRupee } from "react-icons/tb";
import { MdAutoGraph } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import Loader from "../../../../components/loader";
import { toast } from "react-toastify";
import CusButton from "../../../../components/Button/Button";
import DltPopUp from "../../../../components/dlt-popUp/dltPopUp";
// import ApplicantPortfolio from "../../../applicant/applicant-resume";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [job, setJob] = useState({});
  const [dltPopUp, setDltPopUp] = useState(false);
  const [applyBtn, setApplyBtn] = useState("Apply Now");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const getJob = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/job/${id}`, {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setJob(data.job);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const submitApplication = async (id) => {
    setLoading(true);
    try {
      let res = await fetch(`http://localhost:8000/api/v1/job/apply/${id}`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      let data = await res.json();
      if (data.success) {
        toast.success("applicaition submitted");
        navigate(`/`, { replace: true });
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  function applyJob() {
    if (isAuthenticated) {
      if (user?.hasProfile) {
        setShowPopup(true);
      } else {
        navigate(`/profile`);
        toast.warn("Please fill your details", { icon: "🤗" });
      }
    } else {
      navigate("/user/login");
    }
  }

  const finaleApply = () => {
    submitApplication(id);
  };

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  console.log("this is job",job)

  const editJd = () => {
    navigate(`/jobs/edit-job/${id}`, { state: job });
  };

  const deleteJd = async () => {
    try {
      let deleteRes = await fetch(
        `http://localhost:8000/api/v1/job/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const deleteJob = await deleteRes.json();
      if (deleteJob.success) {
        navigate("/jobs", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJob(id);
    if (user?.role === "Applicant") {
      user.myJobs.filter((elem) => {
        if (elem === id) {
          setApplyBtn("Already Applied");
        }
      });
    }
    return () => {
      setError(null);
      setLoading(false);
    };
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={style.jdContainer}>
        {loading ? (
          <Loader />
        ) : Object.keys(job).length > 0 ? (
          <>
            <div className={style.jdContainerWrapper}>
              <h5 className={style.mainTitle} onClick={() => navigate(-1)}>
                <HiArrowLeft /> &nbsp; Job Details
              </h5>
              <div className={style.jdWrapper}>
                <div className={style.jdHeading}>
                  <h4>{job?.jobTitle}</h4>
                </div>
                <div className={style.jdSubHead}>
                  <div className={style.jdSubHeadChild}>
                    <h6>
                      <span>
                        <FaPlayCircle />
                      </span>
                      &nbsp; START DATE
                    </h6>
                    <p>{job?.startingDate}</p>
                  </div>
                  <div className={style.jdSubHeadChild}>
                    <h6>
                      <span>
                        <FaRupeeSign />
                      </span>
                      &nbsp; Salary
                    </h6>
                    <p>{job?.salary}</p>
                  </div>
                  <div className={style.jdSubHeadChild}>
                    <h6>
                      <span>
                        <BsCalendar2DateFill />
                      </span>
                      &nbsp; Last Apply
                    </h6>
                    <p>{new Date(job.lastApply).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className={style.jdSubHeadChild}>
                    <h6>
                      <span>
                        <FaSuitcase />
                      </span>
                      &nbsp; Job Type
                    </h6>
                    <p>{job?.jobType}</p>
                  </div>
                  <div className={style.jdSubHeadChild}>
                    <h6>
                      <span>
                        <MdAutoGraph />
                      </span>
                      &nbsp; Experience
                    </h6>
                    <p>{job?.experience}</p>
                  </div>
                </div>
                <div className={style.aboutCom}>
                  <h6 className={style.aboutComHeading}>About Freeskout</h6>
                  <div
                    className={style.aboutComPara}
                    dangerouslySetInnerHTML={createMarkup(job.aboutCompany)}
                  ></div>
                </div>
                <div className={style.aboutJob}>
                  <h6 className={style.aboutJobHeading}>
                    Requirement & Responsibility
                  </h6>
                  <div
                    className={style.aboutJobPara}
                    dangerouslySetInnerHTML={createMarkup(job.jd)}
                  ></div>
                </div>
                <div className={style.skillsReq}>
                  <h6 className={style.skillsReqHeading}>Skills Required</h6>
                  <div className={style.skillsChild}>
                    {job?.skills?.map((item) => {
                      return <h6>{item}</h6>;
                    })}
                  </div>
                </div>
                <div className={style.perks}>
                  <div className={style.perksHeading}>Perks</div>
                  <div className={style.skillsChild}>
                    {job?.perks &&
                      job?.perks.map((item) => {
                        return <h6>{item}</h6>;
                      })}
                  </div>
                </div>

                {isAuthenticated && user?.role === "Recruiter" ? (
                  <div className={style.applyBtn}>
                    <CusButton
                      label="Edit"
                      color="white"
                      bgColor="rgb(30,140,20)"
                      onClick={editJd}
                    />
                    &nbsp; &nbsp;
                    <CusButton
                      label="Delete"
                      color="white"
                      bgColor="rgba(255,20,40,0.8)"
                      onClick={() => setDltPopUp(true)}
                    />
                  </div>
                ) : (
                  <div className={style.applyBtn}>
                    <CusButton
                      label={applyBtn}
                      color="white"
                      bgColor={
                        applyBtn === "Already Applied"
                          ? "#929396"
                          : "rgba(79, 70, 229, .9)"
                      }
                      onClick={applyJob}
                      disabled={
                        applyBtn === "Already Applied" ? "disabled" : ""
                      }
                      cursor={
                        applyBtn === "Already Applied"
                          ? "not-allowed"
                          : "pointer"
                      }
                    />
                  </div>
                )}
              </div>
              {dltPopUp && (
                <DltPopUp
                  msg="Do you really want delete Job"
                  onClickNo={() => setDltPopUp(false)}
                  onClickYes={deleteJd}
                />
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        {showPopup && (
          <div
            className={style.finaleApplyCont}
            onClick={() => setShowPopup(false)}
          >
            <div className={style.finaleWrapper}>
              <h5>Please Apply with your updated resume and profile </h5>
              <p>
                If you want to Upadate profile then Click Update profile
                otherwise click on proceed
              </p>
              <NavLink to="profile">
                <CusButton
                  label={"update profile"}
                  bgColor="#F9D949"
                  color={"black"}
                />
              </NavLink>
              &nbsp;
              <CusButton
                label={"Proceed"}
                bgColor={"#61C0BF"}
                color={"black"}
                onClick={finaleApply}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JobDetails;
