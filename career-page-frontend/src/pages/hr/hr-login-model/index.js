import React, { useRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./index.module.css";
import {  useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { useLoginRecruiterMutation } from "../../../redux/api/userApi";
import Loader from "../../../components/loader";
import MyError from "../../../utils/Error";



const HrLoginModel = () => {
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const [hasError,setHasError]=useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginRecruiter,{isLoading,isError,isSuccess,error}]=useLoginRecruiterMutation()

  const login = async () => {
    const email = emailRef.current.value;
    const password = otpRef.current.value;

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    if (!regex || !password || !password.length || !email.length) {
      toast.error("check both the fields");
      return;
    }
    try{
      const body={email,password}
      const {data}=await loginRecruiter(body).unwrap();
      setHasError(false)
    }catch(error){
      console.log(error);
      if(error.data.statusCode===500){
        setHasError(true)
      }else{
        toast.error(error.data.message);
      }
     
    }
  };
  useEffect(() => {  
    // isSuccess ==false isAuth===true -- refresh
    // isScees true is aUth true --login
    if (isSuccess===false && isAuthenticated===true) {
      console.log("auth",isAuthenticated,"loc",location.state,"suc",isSuccess)
      navigate(location.state || '/');
    }
  },[isAuthenticated]);

  useEffect(()=>{
    if(isSuccess===true){
      console.log(location.state)
      navigate(location.state  ||'/')
    }
  },[isSuccess])

  if(isLoading){
    return <Loader />
  }

  if(hasError) {
      return <>Something went wrong</>
  }

  return (
    <>
    {
      isAuthenticated===false &&
      <>
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}

      <div className={`${style.loginModelContainer}`}>
        <div className={`${style.loginWrapper}`}>
          <div className={`${style.loginTitle}`}>
            <h1>Admin Login</h1>
            <h6>Welcome to Freeskout</h6>
          </div>
          <div className={`${style.loginInput}`}>
            <input
              type="text"
              name=""
              id=""
              maxLength={40}
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className={`${style.otpInput}`}>
            <input
              type="password"
              placeholder="Password"
              maxLength={20}
              ref={otpRef}
            />
          </div>
          <div className={`${style.loginTnc}`}>
            <input type="checkbox" id="tnc" value="tnc" />
            <label htmlFor="tnc">
              I agree to the <span>Terms & Condition</span> of Freeskout
            </label>
          </div>
          <div className={`${style.loginBtn}`}>
            <button
              onClick={() => {
                login();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
    }
    </>
    
  );
};

export default HrLoginModel;
