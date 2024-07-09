import React from "react";
import style from "./index.module.css";
import CusButton from "../../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateInterviewSch = ({ data, closeModel, updateApi }) => {
  const [intData, setIntData] = useState({
    interviewTime: "",
    interviewerName: "",
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setIntData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const submitInt = async () => {
    const id = data.id;
    if (intData.interviewTime === "") {
      toast.error("please fill Date & Time");
    } else if (intData.interviewerName === "") {
      toast.error("please enter interview name");
    } else {
      try {
        const res = await fetch(
          `https://freeskout-career.onrender.com/api/v1/application/schedule/${id}`,
          {
            credentials: "include",
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(intData),
          }
        );
        const data = await res.json();
        if (data.success) {
          updateApi(true);
          closeModel(false);
        } else {
          alert("error");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  const currentDate = new Date().toISOString().slice(0, 16);

  return (
    <>
      <div className={style.container}>
        <div className={style.mainContent}>
          <div className={style.header}>
            <h6>
              <span> Candidate </span> {data.name}
            </h6>
            <h6>
              <span> Job </span> {data.job}
            </h6>
          </div>
          <div className={style.header}>
            <h6>
              <span>Interviewer </span>
              {data.assigned}
            </h6>
            <h6>
              <span>D & T </span>
              {new Date(data.interviewTime).toLocaleString("en-GB")}
            </h6>
          </div>
          <div className="row mt-3">
            <div className="col input-group">
              <span className="input-group-text">Interview D & T</span>
              <input
                type="datetime-local"
                className="form-control"
                name="interviewTime"
                value={intData.interviewTime}
                onChange={inputEvent}
                min={currentDate}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="interviewerName"
                name="interviewerName"
                value={intData.interviewerName}
                onChange={inputEvent}
              />
            </div>
            {/* <div className="col">
              <select
                className="form-select"
                name="site"
                value={intData.site}
                onChange={inputEvent}
              >
                <option value="offsite">Offsite</option>
                <option value="onsite">OnSite</option>
              </select>
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col">
              <textarea
                name="intAddress"
                value={intData.intAddress}
                id=""
                cols="10"
                rows="2"
                className="form-control fs-6"
                placeholder="Address of Interview"
                onChange={inputEvent}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="link for Interview"
                name="intLink"
                value={intData.intLink}
                onChange={inputEvent}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <textarea
                name="intBasis"
                value={intData.intBasis}
                onChange={inputEvent}
                id=""
                cols="30"
                rows="2"
                className="form-control"
                placeholder="basis Of Interview Or Lavel Of Interview"
              ></textarea>
            </div>
          </div> */}
          <div className="mb-3 me-3 d-flex justify-content-end">
            <CusButton
              label="submit"
              color="white"
              bgColor="#0F6292"
              onClick={submitInt}
            />
            <CusButton
              label="cancel"
              color="white"
              bgColor="#F45050"
              onClick={() => closeModel(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInterviewSch;
