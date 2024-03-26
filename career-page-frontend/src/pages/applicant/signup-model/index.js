import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import style from "./index.module.css";
import { useRegisterApplicantMutation } from "../../../redux/api/userApi";

const SignUpModel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const jobsData = ["Developer", "Sales", "Account M", "socia Media"];
  const inputFields = {
    firstname: "",
    lastname: "",
    phone: "",
    dob: "",
    job: "",
  };
  const [signUpData, setSignUpData] = useState(inputFields);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [registerApplicant, { isLoading, isSuccess }] =
    useRegisterApplicantMutation();

  const signUpInputData = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
    }
    setSignUpData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const validateEmail = async () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (!regex) {
      if (email === "") {
        toast.error("Please enter your email ✍🏼");
      } else {
        toast.error("OOps check your email 🕵️");
      }
    }
    try {
      let res = await fetch("http://localhost:8000/api/v1/applicant/sendCode", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      let data = await res.json();
      if (data.success) {
        let pass = data.code;
        toast.success(`Your code is ${pass}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateSignUp = async () => {
    let error = false;
    if (otp === "") {
      error = true;
      toast.error("Please enter OTP");
    }

    if (!signUpData.firstname === "") {
      error = true;
      toast.error("Please enter First Name");
    }
    if (signUpData.lastname === "") {
      error = true;
      toast.error("Please enter Last Name");
    }
    if (signUpData.dob === "") {
      error = true;
      toast.error("Please enter Date of Birth");
    }
    if (signUpData.phone === "") {
      error = true;
      toast.error("Please enter Phone number");
    }
    if (signUpData.job === "") {
      error = true;
      toast.error("Please enter Jobs looking for");
    }
    if (!isChecked) {
      error = true;
      toast.error("Please accept Terms and Condition");
    }
    if (!error) {
      try {
        const body = { ...signUpData, email, otp };
        console.log(body);
        const { data } = await registerApplicant(body).unwrap();
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess === false && isAuthenticated === true) {
      console.log(
        "auth",
        isAuthenticated,
        "loc",
        location.state,
        "suc",
        isSuccess
      );
      navigate(location.state || "/", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSuccess === true) {
      navigate(location.state || "/", { replace: true });
    }
  }, [isSuccess]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={`${style.loginModelContainer}`}>
        <div className={`${style.loginWrapper}`}>
          <div className={`${style.loginTitle}`}>
            <h2>Candidate SignUp</h2>
            <h6>Welcome to Freeskout</h6>
          </div>
          <div className={style.multipleInput}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={signUpData.firstname}
                onChange={signUpInputData}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={signUpData.lastname}
                onChange={signUpInputData}
              />
            </div>
          </div>
          <div className={`${style.emailInput}`}>
            <input
              type="text"
              name=""
              id=""
              maxLength={40}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={() => {
                validateEmail();
              }}
            >
              Get OTP
            </button>
          </div>
          <div className={`${style.multipleInput}`}>
            <div>
              <input
                type="text"
                placeholder="OTP"
                maxLength={6}
                onChange={(e) => setOtp(parseInt(e.target.value))}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Date of Birth"
                className={style.dobInput}
                onFocus={(e) => (e.target.type = "date")}
                name="dob"
                value={signUpData.dob}
                onChange={signUpInputData}
              />
            </div>
          </div>
          <div className={style.multipleInput}>
            <div>
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                maxLength={10}
                value={signUpData.phone}
                onChange={signUpInputData}
              />
            </div>
            <div>
              <input
                type="text"
                id="jobs"
                placeholder="Jobs looking for"
                list="datalistOptions"
                name="job"
                value={signUpData.job}
                onChange={signUpInputData}
              />
              <datalist id="datalistOptions">
                {jobsData.map((value, index) => {
                  return <option key={index} value={value}></option>;
                })}
              </datalist>
            </div>
          </div>

          <div className={`${style.loginTnc}`}>
            <input
              type="checkbox"
              id="tnc"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="tnc">
              I agree to the <span>Terms & Condition</span> of Freeskout
            </label>
          </div>
          <div className={`${style.loginBtn}`}>
            <button onClick={validateSignUp}>SignUp</button>
          </div>
          <div className={`${style.loginBtn}`}>
            <NavLink to="/user/login">
              <button>Login</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModel;
