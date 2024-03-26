import React from "react";
import { useState,useEffect } from "react";
import style from "./index.module.css";
import Basic from "./basicDetails";
import Final from "./final";
import Details from "./details";
import { useSelector } from "react-redux";
import { fileUpload } from "../../../utils/uploadUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EducationExperience from "./edu_exp";
import Loader from "../../../components/loader";
import { useLoadUserQuery } from '../../../redux/api/userApi';
import MyError from "../../../utils/Error";

const MainForm = () => {
  const { user } = useSelector((state) => state.user);
  const {refetch}=useLoadUserQuery()
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const [errors,setErrors]=useState({})
  const [hasError,setHasError]=useState(false)
  const [page, setPage] = useState(1);
  const [education, setEducation] = useState([...user?.education]);
  const [details, setDetails] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
    email: user?.email,
  });
  const [skills, setSkills] = useState([...user?.skills]);
  const [workExp, setWorkExp] = useState([...user?.workexp]);
  const [pd, setPd] = useState({
    gender: user?.personalDetails?.gender,
    maritalStatus: user?.personalDetails?.maritalStatus,
    languages: [...user?.personalDetails?.languages],
    differentlyAbled: user?.personalDetails?.differentlyAbled,
    address: {
      addressline1: user?.personalDetails?.address?.addressline1,
      district: user?.personalDetails?.address?.district,
      state: user?.personalDetails?.address?.state,
      pincode: user?.personalDetails?.address?.pincode,
      country: user?.personalDetails?.address?.country || "India",
    },
  });
  const [resume, setResume] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: user?.links?.linkedIn || "",
    instagram: user?.links?.instagram || "",
    github: user?.links?.github || "",
  });

  const handleError = (key, val) => {
    if (!key || !key.length) return;
    setErrors((cur) => {
      let newErrors = { ...cur };
      if (!val || !val.length) {
        delete newErrors[key];
      } else {
        newErrors[key] = val;
      }
      return newErrors;
    });
  };

  function pageDisplay() {
    if (page === 1) {
      return (
        <Details
          details={details}
          setDetails={setDetails}
          errors={errors}
          handleError={handleError}
        />
      );
    } else if (page === 2) {
      return (
        <Basic
          pd={pd}
          setPd={setPd}
          errors={errors}
          handleError={handleError}
        />
      );
    } else if (page === 3) {
      return (
        <EducationExperience
          education={education}
          setEducation={setEducation}
          workExp={workExp}
          setWorkExp={setWorkExp}
          errors={errors}
          handleError={handleError}
        />
      );
    } else if (page === 4) {
      return (
        <Final
          skills={skills}
          setSkills={setSkills}
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          resume={resume}
          setResume={setResume}
          errors={errors}
          handleError={handleError}
        />
      );
    }
  }

  function validInput(){
    let flag=true;
    if(page===1){
      const {firstname,lastname,phone}=details
      if(!firstname || !firstname.length){
        flag=false;
        handleError("firstname","First Name cannot be empty")
      }
      if(!lastname || !lastname.length){
        flag=false;
        handleError("lastname","Last Name cannot be empty")
      }
      if(!phone){
        flag=false;
        handleError("phone","Phone cannot be empty")
      }
    }
    else if(page===2){
      const {languages,address}=pd
      if(!languages || ! languages.length){
        flag=false;
        handleError("languages", "languages cannot be empty");
      }
      if(languages && languages.length>0){
        flag=true;
        handleError("languages", "");
      }
      if (!address.addressline1 || !address.addressline1.length) {
        flag = false;
        handleError("addressline1", "addressline1 cannot be empty");
      }
      if (!address.district || !address.district.length) {
        flag = false;
        handleError("district", "district cannot be empty");
      }
      if (!address.state || !address.state.length) {
        flag = false;
        handleError("state", "state cannot be empty");
      }
      if (!address.pincode) {
        flag = false;
        handleError("pincode", "pincode cannot be empty");
      }
    }else if(page==3){
      if(!education || !education.length){
        flag=false
        handleError("education","Education cannot be empty")
      }
      if(education && education.length>0){
        flag=true
        handleError("education","")
      }
      if(!workExp || !workExp.length){
        flag=false
        handleError("workExp","Work Experience cannot be empty")
      }
      if(workExp && workExp.length>0){
        flag=true
        handleError("workExp","")
      }
    }else if(page===4){
      if(!skills || !skills.length){
        flag=false
        handleError("skills","Skills cannot be empty")
      }
      if(skills && skills.length>0){
        flag=true
        handleError("skills","")
      }
      if(!socialLinks.linkedIn && !socialLinks.github && !socialLinks.instagram){
        console.log(socialLinks)
        flag=false;
        handleError("social","At least One Social Link is Required")
      }
    }
    return flag;
  }
  function increase(e) {
    e.preventDefault();
    if(!validInput()) {
      console.log(errors)
      return;
    }
    setPage(page + 1);
  }

  function decrease(e) {
    e.preventDefault();
    setResume(null);
    setPage(page - 1);
  }

  async function submit(e) {
    e.preventDefault();
    if(!validInput()) {
      console.log(errors)
      return;
    }
    let form = new FormData();
    form.append("education", JSON.stringify(education));
    form.append("skills", JSON.stringify(skills));
    form.append("workexp", JSON.stringify(workExp));
    form.append("personalDetails", JSON.stringify(pd));
    form.append("links", JSON.stringify(socialLinks));
    form.append("details", JSON.stringify(details));

    if (resume !== null) {
      const resumeData = await fileUpload(resume);
      if (!resumeData || !resumeData.secure_url || !resumeData.public_id) {
        toast.error("error in uploading resume");
        return;
      } else {
        form.append("resume", JSON.stringify(resumeData));
      }
    }
    try {
      setLoading(true)
      const res = await fetch(
        "http://localhost:8000/api/v1/applicant/upload",
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          method:'POST',
          credentials:'include',
          body:new URLSearchParams([...form.entries()])
        }
      );
      const data=await res.json();
      if(!res.ok){
        throw new MyError({message:data.message || res.statusText,status:data.statusCode || res.status})
      }  
      if (data.success) {
        toast.success(data.message);
        refetch()
        setTimeout(() => {
          navigate(-1, { replace: true });
        }, 1500);
      } 
      setHasError(false)
    } catch (error) {
      if(error instanceof MyError){
        if(error.status>=400 && error.status<500){
          toast.error(error.message)
          if(error.status===401){
            window.location.reload()
          }   
        }else if(error.status>=500){
          setHasError(true)
        }
      }else{
        setHasError(true)
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    return ()=>{
      setLoading(false)
      setHasError(false)
    }
  },[])

  if(loading){
    return <Loader />
  }

  if(hasError){
    return <p>Something went wrong :</p>
  }

  return (
    <div className={style.mainForm}>
      <h4 className={style.mainTitle}>My Profile</h4>
      <nav className={style.profileNav}>
        <ul>
          <li className={`${page === 1 && style.green}`} onClick={()=>setPage(1)}>Basic</li>
          <li className={`${page === 2 && style.green}`} onClick={()=>setPage(2)}>Details</li>
          <li className={`${page === 3 && style.green}`} onClick={()=>setPage(3)}>Edu & Work Exp</li>
          <li className={`${page === 4 && style.green}`} onClick={()=>setPage(4)}>Skills & Resume</li>
        </ul>
      </nav>
      <div className={`${style.page} ${style[`page_${page}`]}`}></div>

      <div className={style.mainForm_container}>
        {pageDisplay()}
        {page === 4 ? (
          <div className={style.func_buttons}>
            <button onClick={decrease}>Prev</button>
            <button disabled={loading===true} onClick={submit}>Submit</button>
          </div>
        ) : (
          <div className={style.func_buttons}>
            <button disabled={page === 1} onClick={decrease}>
              Prev
            </button>
            <button onClick={increase}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainForm;
