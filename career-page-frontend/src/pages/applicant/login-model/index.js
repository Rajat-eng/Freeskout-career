import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./index.module.css";
import Loader from "../../../components/loader";
import { useLoginApplicantMutation } from "../../../redux/api/userApi";
import { useSelector } from "react-redux";
import MyError from "../../../utils/Error";

const LoginModel = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [loginApplicant, { isLoading, isSuccess }] =
    useLoginApplicantMutation();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState();
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const tncRef = useRef(null);
  const location = useLocation();

  const validateEmail = async () => {
    const email = emailRef.current.value;
    setEmailData(email);
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    if (!regex) {
      if (email === "") {
        toast.error("Please enter your email ✍🏼");
      } else {
        toast.error("OOps check your email 🕵️");
      }
      return;
    }

    try {
      let res = await fetch("http://localhost:8000/api/v1/applicant/sendCode", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });
      let data = await res.json();

      if (data.success) {
        toast.success("Otp send, check your email");
        toast(data.code);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    const otp = otpRef.current.value;
    const email = emailRef.current.value;
    const tnc = tncRef.current.checked;

    if (email === "") {
      toast.error("Please enter Email address");
    } else if (otp === "") {
      toast.error("Please enter OTP");
    } else if (!tnc) {
      toast.error("Please Accept T&C of Freeskout ");
    } else {
      try {
        const body = { email, otp };
        const { data } = await loginApplicant(body).unwrap();
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess === false && isAuthenticated === true) {
      navigate(location.state || "/", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSuccess === true) {
      navigate(location.state || "/", { replace: true });
    }
  }, [isSuccess]);

  // if(isError){
  //   if(error.data.statusCode===500){
  //     return (
  //       <p>Something went wrong</p>
  //     )
  //   }
  // }

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {isAuthenticated === false && (
            <div className={`${style.loginModelContainer}`}>
              <div className={`${style.loginWrapper}`}>
                <div className={`${style.loginTitle}`}>
                  <h1>Candidate Login</h1>
                  <div
                    className={`form-switch`}
                    style={{ fontSize: "14px", opacity: "0.8" }}
                  >
                    <input
                      type="text"
                      className="form-check-input"
                      id="admin"
                    />
                    &nbsp;
                    <NavLink to="/hr-login">
                      <label htmlFor="admin" className="form-check-label">
                        &nbsp; Are You Admin
                      </label>
                    </NavLink>
                  </div>
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
                  <button
                    onClick={() => {
                      validateEmail();
                    }}
                  >
                    Get OTP
                  </button>
                </div>
                <div className={`${style.otpInput}`}>
                  <input
                    type="text"
                    placeholder="OTP"
                    maxLength={6}
                    ref={otpRef}
                  />
                </div>
                <div className={`${style.loginTnc}`}>
                  <input type="checkbox" id="tnc" value="tnc" ref={tncRef} />
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
                <div className={`${style.loginBtn}`}>
                  <NavLink to={"/user/signup"}>
                    <button>Sign Up</button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoginModel;
