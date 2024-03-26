import React, { useEffect, useState, useMemo, Suspense, useCallback } from "react";
import style from "./index.module.css";
import Featured_icon from "../../assets/img/Featured_icon.png";
import { FiArrowUpRight } from "react-icons/fi";
import designer from "../../assets/img/designer.jpg";
import digitalmarketing from "../../assets/img/digitalmarketing.jpg";
import softwareEng from "../../assets/img/softwareEng.jpg";
import { NavLink } from "react-router-dom";
import NoApplication from "../../components/no-application";
import Pagination2 from "../../components/pagination2";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader";

const SwiperComponent = React.lazy(()=> import('./swiper'))


const Homepage = () => {
  const aboutRef = useRef(null);
  const dataHeadingRef = useRef(null);
  const dataStatesRef = useRef(null);
  const jobHeaderRef = useRef(null);
  const empHeadingRef = useRef(null);
  const contactfirstRef = useRef(null);
  const contactSecRef = useRef(null);
  const contactthirdRef = useRef(null);
  const newLetterRef = useRef(null);

  const [isIntersecting, setIsIntersecting] = useState({});
  const [jobs, setJobs] = useState(null);
  const [jobSearch, setJobSearch] = useState("");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState(false);
  const [subsEmail, setSubEmail] = useState();
  const [page, setPage] = useState(1);
  const [jobsCount, setJobsCount] = useState(0);
  const url = new URLSearchParams("http://localhost:8000/api/v1/job/find");

  useEffect(() => {
    const initialData = {};
    initialData[aboutRef.current.id] =
      aboutRef.current.getBoundingClientRect().top <= window.innerHeight;
    initialData[dataHeadingRef.current.id] =
      dataHeadingRef.current.getBoundingClientRect().top <= window.innerHeight;
    initialData[dataStatesRef.current.id] =
      dataStatesRef.current.getBoundingClientRect().top <= window.innerHeight;
    setIsIntersecting(initialData);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const data = {};
      entries.forEach((entry) => {
        const id = entry.target.id;
        const isIntersecting = entry.isIntersecting;
        data[id] = isIntersecting;
      });
      setIsIntersecting((prevData) => ({ ...prevData, ...data }));
    });

    observer.observe(aboutRef.current);
    observer.observe(dataHeadingRef.current);
    observer.observe(dataStatesRef.current);
    observer.observe(jobHeaderRef.current);
    observer.observe(empHeadingRef.current);
    observer.observe(contactfirstRef.current);
    observer.observe(contactSecRef.current);
    observer.observe(contactthirdRef.current);
    observer.observe(newLetterRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const jobTitleImage = {
    developer: softwareEng,
    designer: designer,
    digitalmarketing: digitalmarketing,
  };

  const imgUrl = jobTitleImage["designer"];

  const formEvent = (e) => {
    const { name, value } = e.target;
    setFormError(false);
    setContactData({ ...contactData, [name]: value });
  };

  const submitContactForm = () => {
    if (contactData.name === "") {
      setFormError(true);
    } else if (contactData.email === "") {
      setFormError(true);
    } else if (contactData.message === "") {
      setFormError(true);
    }
  };

  const debounce = (func) => {
    let timer;
    return function (...args){
      const context = this
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context,args)
      },1000);
    }
  }

  // const callApi = async (value) => {
  //   let url = `http://localhost:8000/api/v1/job/find?jobTitle=${value}&page=${page}`;
  //   try {
  //     let res = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "	application/x-www-form-urlencoded",
  //       },
  //       credentials: "include",
  //     });
  //     const jobData = await res.json();
  //     if (jobData.success) {
  //       setJobsCount(jobData.jobsCount);
  //       setJobs([...jobData.jobs]);
  //     } else {
  //       toast.error(jobData.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const debounceCallApi = useCallback(
    debounce(async (jobSearch) => {
      let url = `http://localhost:8000/api/v1/job/find?jobTitle=${jobSearch}&page=${page}`;
      try {
        let res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
        });
        const jobData = await res.json();
        if (jobData.success) {
          setJobsCount(jobData.jobsCount);
          setJobs(jobData.jobs);
        } else {
          toast.error(jobData.message);
        }
      } catch (error) {
        console.log(error);
      }
    }),
    []
  );



  useEffect(() => {
    debounceCallApi(jobSearch);
  }, [page]);

  const pageCount = useMemo(() => {
    return Math.ceil(jobsCount / 4);
  }, [jobsCount]);


  // console.log("page value",pageCount , 'job count' , jobs)


  return (
    <>
      <div className={style.container}>
        <div className={style.heroSection}>
          <div className={style.heroWrapper}>
            <div className={style.heroContent}>
              <h2 className={style.heroHeading}>
                Find the best career and embrace it with pride
              </h2>
              <p className={style.heroPara}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                totam esse eligendi odit sit odio!
              </p>
              <input
                type="text"
                placeholder="Search Jobs"
                id="job"
                // list="jobs"
                onChange={(e) => debounceCallApi(e.target.value) }
              />
              {/* <datalist id="jobs">
                <option value="Developer" />
                <option value="Sales Marketing" />
                <option value="Social Media" />
                <option value="Account Mangement" />
                <option value="Digital Marketing" />
              </datalist> */}
              <br />
              <a href="#career">
                <button className={style.heroBtn}>Search Now</button>
              </a>
              <div className={style.heroStates}>
                <div>
                  <h4>200+</h4>
                  <p>Active Employees</p>
                </div>
                <div>
                  <h4>60%</h4>
                  <p>Growth Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="aboutus"></div>
        <div
          ref={aboutRef}
          className={`${style.aboutSection} ${
            isIntersecting.aboutus1 && style.intersectAnimation
          }`}
          id="aboutus1"
        >
          <div className={style.aboutSecChild}>
            <h4>Who We are?</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              blanditiis atque corrupti eos natus consequatur inventore
              voluptatum nostrum voluptatibus veritatis?
            </p>
            <a href="#f">Learn more</a>
          </div>
          <div className={style.aboutSecChild}>
            <h4>what we do?</h4>
            <ul>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
                mollitia.
              </li>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
                mollitia.
              </li>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
                mollitia.
              </li>
            </ul>
            <a href="fd">Learn more</a>
          </div>
          <div className={style.aboutSecChild}>
            <h4>who choose us?</h4>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
                ab!
              </li>
            </ul>
            <a href="fd">Learn more</a>
          </div>
        </div>
        <div className={style.data}>
          <div className={style.blobCircle}></div>
          <div className={style.data_wrapper}>
            <img src={Featured_icon} alt="icon"></img>
            <div
              ref={dataHeadingRef}
              id="dataHeading"
              className={`${style.dataHeading} ${
                isIntersecting.dataHeading && style.dataHeadAnim
              }`}
            >
              <h2>Unleash the power of your Skills</h2>
              <p>
                Everything you need to learn,grow and progress in your career
              </p>
            </div>
            <div
              ref={dataStatesRef}
              className={`${style.data_metadata} ${
                isIntersecting.dataStates && style.dataStatesAnim
              }`}
              id="dataStates"
            >
              <div>
                <p>40+</p>
                <p>Openings</p>
              </div>
              <div>
                <p>60+</p>
                <p>Growth rate</p>
              </div>
              <div>
                <p>200+</p>
                <p>Active employees</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.jobSection} id="career">
          <div className={style.jobSectionWrapper}>
            <div
              ref={jobHeaderRef}
              className={`${style.jobHeader} ${
                isIntersecting.jobHeader && style.jobHeaderAnim
              } `}
              id="jobHeader"
            >
              <h1>Opportunities knocking your way</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur.
              </p>
              <input
                type="text"
                placeholder="Search Jobs"
                id="job"
                list="jobs"
                // onChange={(e) => setJobSearch(e.target.value)}
                onChange={(e) => debounceCallApi(e.target.value) }

              />
              <datalist id="jobs">
                <option value="Developer" />
                <option value="Sales Marketing" />
                <option value="Social Media" />
                <option value="Account Mangement" />
                <option value="Digital Marketing" />
              </datalist>
            </div>
            {jobs && jobs.length === 0 && (
              <NoApplication
                heading={"No job found"}
                para={
                  "Soory no job found in this category  May be you write wrong Keywords Please check"
                }
              />
            )}

            <div className={style.jobcardsContainer}>
              {jobs &&
                jobs.map((elem, index) => {
                  return (
                    <div className={style.jobcards} key={index}>
                      <img src={imgUrl} alt="developer" />
                      <h6>
                        {elem?.category?.title
                          ? elem.category.title
                          : "category"}
                      </h6>
                      <div className={style.jobCardTitle}>
                        {elem.jobTitle}
                        <span>
                          <FiArrowUpRight />
                        </span>
                      </div>
                      <div className={style.jobDetailsChild}>
                        <p>Last Date apply</p>
                        <p>
                          {new Date(elem.lastApply).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className={style.jobDetailsChild}>
                        <p>Experience </p> <p>{elem.experience} Years</p>
                      </div>
                      <div className={style.jobDetailsChild}>
                        <p>No of Opening</p>
                        <p>10</p>
                      </div>
                      <NavLink to={`/${elem._id}`}>
                        <button className={style.jobCardBtn}>
                          View Details
                        </button>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
            <div className={style.jobcardMoreBtn}>
              {pageCount > 1 && (
                <Pagination2
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                  jobSearch={jobSearch}
                />
              )}
            </div>
          </div>
        </div>
        <div className={style.empReview}>
          <div className={style.blobCircle}></div>
          <div className={style.empDetails}>
            <div
              ref={empHeadingRef}
              className={`${style.empDetailsHeading} ${
                isIntersecting.empHeading && style.empDetailsHeadingAnim
              }`}
              id="empHeading"
            >
              See what our employees says <br /> about their experience
            </div>
            <div className={style.empDetailsCards}>
              <Suspense fallback={<Loader/>}>
              <SwiperComponent />
              </Suspense>
            </div>
          </div>
        </div>
        <div className={style.contactUs} id="contactus">
          <div className={style.contactUsWrapper}>
            <div
              ref={contactfirstRef}
              className={`${style.contactDetails} ${
                isIntersecting.contactfirst && style.contactDetailsAnim
              } `}
              id="contactfirst"
            >
              <h1 className={style.contactHeading}>Contact Us</h1>
              <p className={style.contactPara}>
                At Flitty Exclusive dating app, we want you to have the most
                elite and exclusive experience.
              </p>
            </div>
            <div
              ref={contactSecRef}
              className={`${style.contactForm} ${
                isIntersecting.contactSec && style.contactFormAnim
              }`}
              id="contactSec"
            >
              <div
                action="http://localhost:8000/contact"
                method="POST"
                className={style.formWrapper}
              >
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactData.name}
                  id="name"
                  placeholder="Enter you full name"
                  onChange={formEvent}
                  className={`${
                    formError && contactData.name === "" ? style.errorInput : ""
                  }`}
                />
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={contactData.email}
                  id="email"
                  placeholder="Enter your email"
                  onChange={formEvent}
                  className={`${
                    formError && contactData.email === ""
                      ? style.errorInput
                      : ""
                  }`}
                />
                <label htmlFor="descIssue">Write your message</label>
                <textarea
                  name="message"
                  id="descIssue"
                  cols="30"
                  rows="3"
                  value={contactData.message}
                  placeholder="Enter Your message"
                  onChange={formEvent}
                  className={`${
                    formError && contactData.message === ""
                      ? style.errorInput
                      : ""
                  }`}
                ></textarea>
                <button className={style.fromBtn} onClick={submitContactForm}>
                  Send message
                </button>
              </div>
            </div>
            <div
              ref={contactthirdRef}
              className={`${style.contactGrid} ${
                isIntersecting.contactthird && style.contactGridAnim
              }`}
              id="contactthird"
            >
              <div>
                <h5 className={style.cgHeading}>OFFICE HOURS</h5>
                <p className={style.cgPara}>
                  Monday-Friday <br />
                  10:30 am to 6:30pm
                </p>
              </div>
              <div>
                <h5 className={style.cgHeading}>OFFICE ADDRESS</h5>
                <p className={style.cgPara}>
                  Wz 112c, near Subhash Nagar metro station, Meenakshi Garden,
                  Ashok Nagar, New Delhi <br />
                  Pin code - 110018
                </p>
              </div>
              <div>
                <h5 className={style.cgHeading}>Email Us</h5>
                <p className={style.cgPara}>
                  freeskoutenquiry.ac.in <br />
                  HRFreeskout@gmail.com
                </p>
              </div>
              <div>
                <h5 className={style.cgHeading}>GET IN TOUCH</h5>
                <p className={style.cgPara}>
                  +1-246-888-0653 <br />
                  +1-222-632-0194
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.newsLetter}>
          <div
            ref={newLetterRef}
            className={`${style.newLetterWrapper} ${
              isIntersecting.newLatter && style.newLetterAnim
            }`}
            id="newLatter"
          >
            <h2 className={style.newsHeading}>Subscribe to our newsletter</h2>
            <div className={style.newsForm}>
              <input
                type="text"
                placeholder="Your email address"
                id="email"
                value={subsEmail}
                onChange={(e) => setSubEmail(e.target.value)}
              />
              <button type="submit" className={style.subBtn} id="subsBn">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
