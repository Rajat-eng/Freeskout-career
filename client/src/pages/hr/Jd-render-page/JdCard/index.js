import React, { useEffect, useState, useMemo } from "react";
import style from "./index.module.css";
import { HiArrowLeft } from "react-icons/hi";
import Loader from "../../../../components/loader";
import Pagination2 from "../../../../components/pagination2";
import JdRender from "./jd_render/index";
import { toast } from "react-toastify";

const JdCards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [page, setPage] = useState(1);

  //const options = { day: "2-digit", month: "short", year: "numeric" };

  const allJobs = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://freeskout-career.onrender.com/api/v1/job/find?page=${page}`,
        {
          method: "get",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        console.log("jobs", data);
        setJobs([...data.jobs]);
        setJobsCount(data.jobsCount);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const pageCount = useMemo(() => {
    return Math.ceil(jobsCount / 4);
  }, [jobsCount]);

  useEffect(() => {
    allJobs(page);
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={style.mainContainer}>
        <h6 className={style.title}>
          <HiArrowLeft /> All Jobs Status
        </h6>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className={style.jdCardsContainer}>
              {jobs && jobs.length > 0 ? (
                jobs.map((elem, index) => {
                  return <JdRender key={elem._id} jobInput={elem} />;
                })
              ) : (
                <>
                  <div className={style.noJobFound}>
                    <p>
                      <span>Soooory,</span> No JOB
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className={style.paginationContainer}>
              {4 < jobsCount && (
                <Pagination2
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JdCards;
