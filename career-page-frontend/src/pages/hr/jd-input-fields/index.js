import React, { useState,useEffect } from "react";
import AboutCompEditor from "./draft-editor";
import JobEditior from "./draft-editor/jobDescription";
import style from "./index.module.css";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../../../components/loader';
import { FaRegTrashAlt } from "react-icons/fa";
import MyError from "../../../utils/Error";

const JdInputFields = () => {

  const loc = useLocation().state;
  const {id} = useParams();
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const [hasError,setHasError]=useState(false)

  const callCategory = async () => {
    try {
      setLoading(true);
    const res = await fetch("http://localhost:8000/api/v1/category/getAll", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    });
    const data = await res.json();
    if(!res.ok){
      throw new MyError({message:data.message,status:data.status})
    }
    if (data.success) {
      setCategories([...data.categories]);
    }
    setLoading(false);
    } catch (error) {
      if(error instanceof MyError){
        toast.error(error.message)
      }else{
        setHasError(true)
      }
      setLoading(false)
    }
  };

  const jobType = [
    "Graphic Designer",
    "Frontend Developer",
    "Backend Developer",
    "Ecommerce Development",
    "Database Development",
    "Full Stack Development",
    "Mobile App Development",
    "UX/UI Design",
    "Business Development",
    "Campaign Management",
    "Content Strategy",
    "Search Engine Optimization",
    "Social Media Marketing",
    "Digital Marketing",
    "Photography",
    "Videography",
    "Brand Strategy",
    "Business & Corporate Law",
  ];

  const [jobInput, setJobInput] = useState({
    jobTitle: loc ? loc.jobTitle : "",
    designation: loc ? loc.designation : "",
    lastApply: loc
      ? new Date(loc.lastApply).toISOString().substring(0, 10)
      : "",
    salary: loc ? loc.salary : "",
    jobType: loc ? loc.jobType : "",
    jobLocation: loc ? loc.jobLocation : "",
    experience: loc ? loc.experience : "",
    jd: "",
    skills: [...(loc ? loc.skills : "")],
    perks: [...(loc ? loc.perks : "")],
    categoryTitle: loc?loc.category.title : "",
  });

 

  const [skillsName, setSkillsName] = useState();
  const [perksName, setPerksName] = useState("");
  const [apiMethod, setApiMethod] = useState({
    linkPost: "http://localhost:8000/api/v1/job/post",
    linkUpdate: `http://localhost:8000/api/v1/job/update/${id}`,
    methodPost: "POST",
    methodPut: "PUT",
  });

  //send data
  const [jobEditorData, setJobEditiorData] = useState("");
  const [aboutCompEdiData, setAboutCompEdiData] = useState("");

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setJobInput((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const arrayInputBtn = (property, value, error) => {
    if (!value) {
      toast.error(`Enter ${property} first`);
    } else if (jobInput[property].includes(value)) {
      alert(error);
    } else {
      setJobInput((cur) => {
        const next = { ...cur };
        const updatedProperty = [...next[property], value];
        next[property] = updatedProperty;
        return next;
      });
      setSkillsName("");
      setPerksName("");
    }
  };

  const dltProperty = (property, id) => {
    setJobInput((cur) => {
      const updatedProperty = [...cur[property]];
      updatedProperty.splice(id, 1);
      return { ...cur, [property]: updatedProperty };
    });
  };

  const submitForm = async (api, type) => {
    if (jobInput.jobTitle === "") {
      toast.error("enter job Title");
    } else if (jobInput.categoryTitle === "") {
      toast.error("enter Category");
    } else if (jobInput.designation === "") {
      toast.error("enter designation Date");
    } else if (jobInput.lastApply === "") {
      toast.error("enter job Last Apply Date");
    } else if (jobInput.salary === "") {
      toast.error("enter Salery Field");
    } else if (jobInput.jobType === "") {
      toast.error("enter job Type details");
    } else if (jobInput.experience === "") {
      toast.error("enter experience");
    } else if (jobInput.skills.length === 0) {
      toast.error("enter skills");
    } else if (jobInput.perks.length === 0) {
      toast.error("enter skills");
    } else if (aboutCompEdiData.length <= 7) {
      toast.error("Fill the About Freeskout data");
    } else if (jobEditorData.length <= 7) {
      toast.error("Fill the job ediitor data");
    } else {
      try {
        setLoading(true)
        let jobPost = await fetch(api, {
          method: type,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...jobInput,
            jd: jobEditorData,
            aboutCompany: aboutCompEdiData,
          }),
        });
        let jobPostdata = await jobPost.json();
        if(!jobPost.ok){
          throw new MyError({message:jobPostdata.message,status:jobPostdata.status})
        }
        if (jobPostdata.success) {
          toast.success(jobPostdata.message);
          setJobEditiorData("");
          setJobInput({
            jobTitle: "",
            categoryTitle: "",
            lastApply: "",
            salary: "",
            jobType: "",
            desigination: "",
            jobLocation: "",
            experience: "",
            jd: "",
            skills: [],
            perks: [],
          });
          setAboutCompEdiData("");
        } 
        setLoading(false)
      } catch (error) {
        console.log(error)
        if(error instanceof MyError){
          toast.error(error.message)
        }else{
          setHasError(true)
        }
        setLoading(false)
      }
    }
  };


  useEffect(()=>{
    callCategory()
    return ()=>{
      setLoading(false)
      setHasError(false)
    }
  },[])

  if(hasError){
    return <p>Something went wrong</p>
  }

  if(loading){
    return <Loader />
  }

  return (
    <>
      <div className={style.jdInputFields}>
        <div className={style.jdFieldWrapper}>
          <h2 className={style.title}>Job Description</h2>
          <div className={style.jdFieldForm}>
            <div className="row">
              <div className="col-6 col-sm-4 mb-3 col-xs-6">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="form-control"
                  list="datalistOption"
                  name="jobTitle"
                  value={jobInput.jobTitle}
                  onChange={inputEvent}
                />
                <datalist id="datalistOption">
                  {jobType.map((value, index) => {
                    return <option key={index} value={value} />;
                  })}
                </datalist>
              </div>
              <div className="col-6 col-sm-4">
                <input
                  type="text"
                  placeholder="Enter Job Category"
                  className="form-control"
                  name="categoryTitle"
                  value={jobInput.categoryTitle}
                  onChange={inputEvent}
                  list="category"
                />
               <datalist id="category">
                  {categories.length>0 && categories.map((item,index)=>{
                    return (
                      <option key={index} value={item.title} />
                    )
                  })}
               </datalist>
              </div>
              <div className="col-6 col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Desigination"
                  name="designation"
                  value={jobInput.designation}
                  onChange={inputEvent}
                />
              </div>
              <div className="col-6 col-sm-2 mb-4">
                <input
                  type="text"
                  placeholder="salary"
                  className="form-control"
                  name="salary"
                  value={jobInput.salary}
                  onChange={inputEvent}
                />
              </div>
              <div className="col-6 col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  name="experience"
                  value={jobInput.experience}
                  onChange={inputEvent}
                />
              </div>
              <div className="col-6 col-sm-4 mb-4">
                {/* <span className={`input-group-text ${style.lastApply}`}>last apply</span> */}
                <input
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Last Apply Date"
                  type="text"
                  placeholder="Last Apply Date"
                  onFocus={(e) => (e.target.type = "date")}
                  className="form-control"
                  name="lastApply"
                  value={jobInput.lastApply}
                  onChange={inputEvent}
                  min={currentDate}
                  // isValidDate = {diabledPastDt}
                />
              </div>
              <div className="col-6 col-sm-4">
                <input
                  type="text"
                  placeholder="Job Type"
                  className="form-control"
                  name="jobType"
                  value={jobInput.jobType}
                  onChange={inputEvent}
                  list="jobTypeList"
                />
                <datalist id="jobTypeList">
                  <option value="Full Time" />
                  <option value="Intern" />
                </datalist>
              </div>
              <div className="col-6 col-sm-4 mb-4">
                <input
                  type="text"
                  placeholder="Job Location"
                  className="form-control"
                  name="jobLocation"
                  value={jobInput.jobLocation}
                  onChange={inputEvent}
                  list="jobLocList"
                />
                <datalist id="jobLocList">
                  <option value="Work from Home" />
                  <option value="Work from Office" />
                </datalist>
              </div>
              <div className="col-6 col-sm-4">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Skills"
                    className="form-control"
                    name="skills"
                    value={skillsName}
                    onChange={(e) => setSkillsName(e.target.value)}
                  />
                  <button
                    className={`input-group-text ${style.sideBtn}`}
                    onClick={() =>
                      arrayInputBtn(
                        "skills",
                        skillsName,
                        "Skills already Exists"
                      )
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>
              <div className="col-6 col-sm-4 mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Perks"
                    className="form-control"
                    name="perks"
                    value={perksName}
                    onChange={(e) => setPerksName(e.target.value)}
                  />
                  <button
                    className={`input-group-text ${style.sideBtn}`}
                    onClick={() =>
                      arrayInputBtn("perks", perksName, "Perks already Exists")
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>
              <div className="col"></div>

              <div className="col-6 col-sm-4 d-flex flex-wrap">
                {jobInput.skills.map((value, index) => {
                  return (
                    <div key={index}>
                      <p className={style.skillsChild}>{value}{" "}
                        <span className={style.skillsChildCancelBtn} onClick={() => dltProperty("skills", index)}> <FaRegTrashAlt /></span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="col-6 col-sm-4 d-flex flex-wrap">
                {jobInput.perks.map((value, index) => {
                  return (
                    <div key={index}>
                      <p className={style.skillsChild}>{value}
                      <span
                        className={style.skillsChildCancelBtn}
                        onClick={() => dltProperty("perks", index)}
                      >
                        <FaRegTrashAlt/>
                      </span>
                      </p>

                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <AboutCompEditor companyEditior={setAboutCompEdiData} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <JobEditior jobEditior={setJobEditiorData} />
              </div>
            </div>
          </div>
          <div className={style.submitFormBtn}>
            {!loc ? (
              <button
                onClick={() =>
                  submitForm(apiMethod.linkPost, apiMethod.methodPost)
                }
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() =>
                  submitForm(apiMethod.linkUpdate, apiMethod.methodPut)
                }
              >
                Update Job
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JdInputFields;
