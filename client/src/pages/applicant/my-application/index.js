import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Loader from "../../../components/loader";
import { NavLink } from "react-router-dom";
import MyError from "../../../utils/Error";
import { toast } from "react-toastify";
import NoApplication from "../../../components/no-application";

const MyApplication = () => {
  const [myApplications, setMyApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getMyApplications = async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://freeskout-career.onrender.com/api/v1/application/myapplication`,
        {
          method: "get",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      let data = await res.json();
      if (!res.ok) {
        throw new MyError({
          message: data.message || res.statusText,
          status: data.statusCode || res.status,
        });
      }
      if (data.success) {
        setMyApplication([...data.applications]);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof MyError) {
        if (error.status >= 400 && error.status < 500) {
          toast.error(error.message);
          if (error.status === 401) {
            window.location.reload();
          }
        } else if (error.status >= 500) {
          setHasError(true);
        }
      } else {
        setHasError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyApplications();
    return () => {
      setHasError(false);
      setLoading(false);
    };
  }, []);

  if (hasError) {
    return <p>Oops!! Something went wrong</p>;
  }

  console.log("this is my application", myApplications);

  return (
    <>
      <div className={style.container}>
        <h5 className={style.mainTitle}>View Application Status</h5>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className={style.containerWrapper}>
              {myApplications.length > 0 &&
                myApplications.map((application, index) => {
                  return (
                    <>
                      <div className={style.wrapper} key={index}>
                        <div className={style.title}>
                          <h4>{application.job.jobTitle}</h4>
                        </div>
                        {application.isScheduled && (
                          <div className={style.interveiwSchWrapper}>
                            <div>
                              <h6>Interview Date</h6>
                              <span>
                                {new Date(application.time).toLocaleDateString(
                                  "en-GB"
                                )}
                              </span>
                            </div>
                            <div>
                              <h6>Interview Time</h6>
                              <span>
                                {new Date(application.time).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                            </div>
                            <div>
                              <h6>Interview name</h6>
                              <span>{application.assignedTo}</span>
                            </div>
                            <div>
                              <h6>Interview Location</h6>
                              <span>Subhash nagar</span>
                            </div>
                            <div>
                              <h6>Interview Mode</h6>
                              <span>Online</span>
                            </div>
                            <div>
                              <h6>Interview Link</h6>
                              <span>www.google.com</span>
                            </div>
                          </div>
                        )}
                        {/* --------------- tracking Status ------------ */}
                        <div className={style.trackingOrderSection}>
                          <div className={style.trackingOrderWrapper}>
                            <div className={style.toSecChild}>
                              <div
                                className={`${style.toSecHeading} ${style.trackerHeadingActive}`}
                              >
                                Applied At
                              </div>
                              <div
                                className={`${style.toSecHeading} ${style.trackerHeadingActive}`}
                              >
                                {application.createdAt.slice(0, 10)}
                              </div>
                            </div>
                            <div className={`${style.toSecChild}`}>
                              <div
                                className={`${style.toSecHeading} ${
                                  application.status === "shortlisted" ||
                                  application.status === "Scheduled"
                                    ? style.trackerHeadingActive
                                    : ""
                                }`}
                              >
                                Shortlist At
                              </div>
                              <div
                                className={`${style.toSecHeading} ${
                                  application.status === "shortlisted" ||
                                  application.status === "Scheduled"
                                    ? style.trackerHeadingActive
                                    : ""
                                }`}
                              >
                                {application.status === "shortlisted" ||
                                application.status === "Scheduled"
                                  ? // application.status === 'rejected'
                                    application.updatedAt.slice(0, 10)
                                  : application.status === "rejected" &&
                                    "Processing"}
                              </div>
                            </div>
                            <div
                              className={`${style.toSecChild} ${
                                application.status === "schedule"
                                  ? style.trackerHeadingActive
                                  : ""
                              }`}
                            >
                              <div
                                className={`${style.toSecHeading} ${
                                  application.isScheduled
                                    ? style.trackerHeadingActive
                                    : application.status === "rejected" &&
                                      style.trackerHeadingRejected
                                }`}
                              >
                                {application.status === "rejected"
                                  ? "Application Rejected"
                                  : "Interview At"}
                              </div>
                              <div
                                className={`${style.toSecHeading} ${
                                  application.isScheduled
                                    ? style.trackerHeadingActive
                                    : application.status === "rejected" &&
                                      style.trackerHeadingRejected
                                }`}
                              >
                                {application.isScheduled
                                  ? new Date(
                                      application.time
                                    ).toLocaleDateString()
                                  : application.status === "rejected"
                                  ? application.updatedAt.slice(0, 10)
                                  : "Processing"}
                              </div>
                            </div>
                          </div>
                          <div className={style.trackingBarSec}>
                            <div
                              className={`${style.trackingBar} ${
                                application.status === "shortlisted" ||
                                application.status === "Scheduled"
                                  ? style.trackerActive
                                  : application.status === "rejected" &&
                                    style.trackerReject
                              }`}
                            >
                              <div
                                className={`${style.trackingBarCircle} ${style.trackerActive}`}
                              ></div>
                            </div>
                            <div
                              className={`${style.trackingBar} ${
                                application.isScheduled
                                  ? style.trackerActive
                                  : application.status === "rejected" &&
                                    style.trackerReject
                              } `}
                            >
                              <div
                                className={`${style.trackingBarCircle} ${
                                  application.status === "shortlisted" ||
                                  application.status === "Scheduled"
                                    ? style.trackerActive
                                    : application.status === "rejected" &&
                                      style.trackerReject
                                }`}
                              ></div>
                            </div>
                            <div className={`${style.trackingBar}`}>
                              <div
                                className={`${style.trackingBarCircle} ${
                                  application.isScheduled
                                    ? style.trackerActive
                                    : application.status === "rejected" &&
                                      style.trackerReject
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                        {/* ----------- ----------------- */}

                        <div className={style.jobDetails}>
                          <div>
                            <h6>Start date : </h6>
                            <span>
                              {new Date(
                                application.job.lastApply
                              ).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                          <div>
                            <h6>Experience : </h6>
                            <span>{application.job.experience}</span>
                          </div>
                          <div>
                            <h6>Job type : </h6>
                            <span>{application.job.jobType}</span>
                          </div>
                          <div>
                            <h6>Location : </h6>
                            <span>{application.job.jobLocation}</span>
                          </div>
                        </div>
                        <div className={style.jobDetailsBtn}>
                          <NavLink to={`/${application.job._id}`}>
                            <button>View Job Details</button>
                          </NavLink>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div>
              {/* {myApplications.length === 0 && (<NoApplication heading={'No Application found'} para={'please apply on job'} btnDisp={true}/>)} */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyApplication;
