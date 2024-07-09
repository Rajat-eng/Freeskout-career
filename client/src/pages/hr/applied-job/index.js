import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import style from "./index.module.css";
import { NavLink, useNavigate, Routes, Route } from "react-router-dom";
import Loader from "../../../components/loader/index";
import Resume from "../resume";
import CreateInterviewSch from "../interview-schedule";
import { BiLinkExternal, BiCategory } from "react-icons/bi";
import { HiOutlineSortDescending } from "react-icons/hi";
import { toast } from "react-toastify";
import Pagination2 from "../../../components/pagination2";
import MyError from "../../../utils/Error";
import { RiArrowUpDownLine } from "react-icons/ri";

const AppliedJobs = () => {
  const [days, setDays] = useState("");
  const [status, setStatus] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState(null);
  const [user, setUser] = useState();
  const [showResume, setShowResume] = useState(false);
  const [page, setPage] = useState(1);
  const totalApplications = useRef(0);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [sortedApp, setShortedApp] = useState(0);
  const [createInterModel, setCreateInterModel] = useState(null);

  const navigate = useNavigate();

  const ref = useRef();
  const options = { day: "2-digit", month: "short", year: "numeric" };

  const resumeLink = (data) => {
    setUser(data);
    setShowResume(true);
  };

  const jobDetailsLink = (data) => {
    navigate(`/jobs/${data}`);
  };

  const callApi = useCallback(async () => {
    setLoading(true);
    let URL = `https://freeskout-career.onrender.com/api/v1/application/find?page=${page}`;
    if (days !== "") {
      URL = URL + `&days=${days}`;
    }
    if (categoryId !== "") {
      URL = URL + `&category=${categoryId}`;
    }
    try {
      const res = await fetch(URL, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new MyError({ message: data.message, status: data.statusCode });
      }
      if (data.success) {
        if (sortedApp === 0) {
          setApplications([...data.applications]);
        } else if (sortedApp === 1) {
          setApplications(
            [...data.applications].sort((a, b) => a.time - b.time)
          );
        } else if (sortedApp === -1) {
          setApplications(
            [...data.applications].sort((a, b) => b.time - a.time)
          );
        }
        totalApplications.current = data.applicationCount;
      }

      setLoading(false);
      setHasError(false);
    } catch (error) {
      if (error instanceof MyError) {
        if (error.status === 401) {
          toast.error(error.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        setHasError(true);
      }
      setLoading(false);
    }
  }, [days, page, categoryId]);

  const statusChange = useCallback(
    async (id) => {
      if (!status) {
        toast.error("Please select Status");
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://freeskout-career.onrender.com/api/v1/application/status/${id}`,
          {
            method: "put",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new MyError({ message: data.message, status: data.statusCode });
        }
        if (data.success) {
          callApi();
        }
        setStatus("");
        setLoading(false);
        setHasError(false);
      } catch (error) {
        if (error instanceof MyError) {
          if (error.status === 401) {
            toast.error(error.message);
            window.location.reload();
          }
        } else {
          setHasError(true);
        }
        setLoading(false);
        setStatus("");
      }
    },
    [status]
  );

  const callCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://freeskout-career.onrender.com/api/v1/category/getAll",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "get",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new MyError({ message: data.message, status: data.statusCode });
      }
      if (data.success) {
        setCategory([...data.categories]);
        setHasError(false);
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof MyError) {
        if (error.status === 401) {
          toast.error(error.message);
        }
      } else {
        setHasError(true);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
    return () => {
      setLoading(false);
    };
  }, [page, days, categoryId, sortedApp]);

  useEffect(() => {
    setPage(1);
  }, [days, categoryId]);

  useEffect(() => {
    callCategory();
    return () => {
      setLoading(false);
    };
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(totalApplications.current / 10);
  }, [totalApplications.current]);

  if (hasError) {
    return <p>Some error has occured</p>;
  }

  const toggleSort = () => {
    if (sortedApp === 0) {
      setShortedApp(1);
    } else if (sortedApp === 1) {
      setShortedApp(-1);
    } else {
      setShortedApp(0);
    }
  };

  return (
    <>
      <div className={style.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={style.filterStatus}>
              <h5>All Application</h5>
              <div className={style.filterOptions}>
                <div className={style.filterSelect}>
                  <span className={style.filterSelectChild}>
                    <BiCategory /> <span> category</span>
                  </span>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" defaultValue>
                      All
                    </option>
                    {category.length > 0 &&
                      category.map((item, id) => (
                        <option value={item._id} key={id}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={style.filterSelect}>
                  <span className={style.filterSelectChild}>
                    <HiOutlineSortDescending /> <span> Sort By </span>
                  </span>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  >
                    <option value="" defaultValue>
                      All
                    </option>
                    <option value="1">Today</option>
                    <option value="7">This Week</option>
                    <option value="30">This Month</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`table-responsive ${style.tableContainer}`}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S. no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Applied Job</th>
                    <th scope="col">Apply Date</th>
                    <th
                      scope="col"
                      onClick={toggleSort}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Interview At <RiArrowUpDownLine /> */}
                    </th>
                    <th scope="col">Interview</th>
                    <th scope="col">Current Status</th>
                    <th scope="col">Change Status</th>
                    <th></th>
                  </tr>
                </thead>
                {applications !== null &&
                  applications.length > 0 &&
                  applications.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td
                            style={{
                              textTransform: "capitalize",
                              cursor: "pointer",
                            }}
                            onClick={() => resumeLink(item.applicant)}
                          >
                            {item.applicant?.firstname +
                              " " +
                              item.applicant?.lastname}

                            <span className={style.profileLinkTab}>
                              <BiLinkExternal />
                            </span>
                          </td>
                          <td>
                            <span
                              onClick={() => jobDetailsLink(item.job._id)}
                              className={style.linkTab}
                            >
                              {item.job.jobTitle}
                            </span>
                          </td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-GB",
                              options
                            )}
                          </td>
                          <td>
                            {item.time
                              ? new Date(item.time).toLocaleDateString(
                                  "en-GB",
                                  options
                                )
                              : "--/---/----"}
                          </td>
                          <td>
                            <button
                              className={`${style.scheduleBtn}`}
                              onClick={() =>
                                setCreateInterModel({
                                  id: item._id,
                                  name:
                                    item.applicant.firstname +
                                    " " +
                                    item.applicant.lastname,
                                  assigned: item?.assignedTo,
                                  job: item.job.jobTitle,
                                  interviewTime: item?.time,
                                })
                              }
                              disabled={
                                item.status === "applied" ||
                                item.status === "selected" ||
                                item.status === "rejected"
                                  ? true
                                  : false
                              }
                            >
                              {item.isScheduled === true
                                ? "Reschedule"
                                : "Schedule"}
                            </button>
                          </td>
                          <td>
                            <span
                              className={`${
                                item.status === "applied"
                                  ? `${style.Bgbrown}`
                                  : item.status === "shortlisted"
                                  ? `${style.bgGreen}`
                                  : item.status === "Scheduled"
                                  ? `${style.bgGoldenRod} `
                                  : `${style.bgRed}`
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-select form-select-sm"
                            >
                              <option value="">Select</option>
                              {item.isScheduled === false && (
                                <>
                                  <option value="shortlisted">Shortlist</option>
                                </>
                              )}
                              <option value="rejected">Rejected</option>
                              {item.isScheduled === true && (
                                <>
                                  <option value="selected">Selected</option>
                                </>
                              )}
                            </select>
                          </td>
                          <td>
                            <button
                              className={style.tableBtn}
                              onClick={() => statusChange(item._id)}
                            >
                              Done
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>

              <div className={style.paginationContainer}>
                {pageCount > 1 && (
                  <Pagination2
                    page={page}
                    setPage={setPage}
                    pageCount={pageCount}
                  />
                )}
              </div>

              {showResume && (
                <div
                  className={style.resumeContainer}
                  onClick={() => setShowResume(false)}
                >
                  <Resume user={user} back={() => setShowResume(false)} />
                </div>
              )}

              <div>
                {createInterModel && (
                  <CreateInterviewSch
                    data={createInterModel}
                    closeModel={() => setCreateInterModel(null)}
                    updateApi={() => callApi()}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AppliedJobs;
