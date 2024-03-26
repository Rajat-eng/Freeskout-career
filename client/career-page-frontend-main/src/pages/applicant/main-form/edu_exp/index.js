import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "../../main-form/index.module.css";
import { toast } from "react-toastify";

const EducationExperience = (props) => {
  const { education, setEducation, workExp, setWorkExp, errors, handleError } =
    props;

  const [initialEducationState, setInitialEducationState] = useState({
    qualification: "",
    startYear: "",
    endYear: "",
    score: "",
    institutionName: "",
  });
  const [initialWorkState, setInitialWorkState] = useState({
    company: "",
    duration: "",
    type: "",
    designation: "",
  });

  function handle_Ed_Change(e) {
    const { name, value } = e.target;
    setInitialEducationState({ ...initialEducationState, [name]: value });
  }

  function handle_Work_Change(e) {
    const { name, value } = e.target;
    setInitialWorkState({ ...initialWorkState, [name]: value });
  }

  function addEducation() {
    if (!validEducationInput()) return;

    setEducation((cur) => {
      return [
        ...cur,
        {
          ...initialEducationState,
        },
      ];
    });
    clearEdFields();
  }

  const dltChild = (property,id) => {
    property((cur) => {
      const updateValues = [...cur];
      updateValues.splice(id, 1);
      return updateValues;
    });
  };

  function clearEdFields() {
    setInitialEducationState({
      qualification: "",
      startYear: "",
      endYear: "",
      score: "",
      institutionName: "",
    });
  }

  function addWork() {
    if (!validWorkInput()) return;
    setWorkExp((cur) => {
      return [
        ...cur,
        {
          ...initialWorkState,
        },
      ];
    });
    clearWorkFields();
  }

  function clearWorkFields() {
    setInitialWorkState({
      company: "",
      duration: "",
      type: "",
      designation: "",
    });
  }

  function validEducationInput() {
    let flag = true;
    const { qualification, startYear, endYear, score, institutionName } =
      initialEducationState;
    if (!qualification || !qualification.length) {
      flag = false;
      handleError("qualification", "qualification cannot be empty");
    }
    if (!startYear || !startYear.length) {
      flag = false;
      handleError("startYear", "Start Year cannot be empty");
    }
    if (!endYear || !endYear.length) {
      flag = false;
      handleError("endYear", "End Year cannot be empty");
    }
    if (!score || !score.length) {
      flag = false;
      handleError("score", "score cannot be empty");
    }
    if (!institutionName || !institutionName.length) {
      flag = false;
      handleError("institutionName", "Institution Name cannot be empty");
    }
    return flag;
  }

  function validWorkInput() {
    let flag = true;
    const { company, duration, type, designation } = initialWorkState;
    if (!company || !company.length) {
      flag = false;
      handleError("company", "company cannot be empty");
    }
    if (!duration || !duration.length) {
      flag = false;
      handleError("duration", "Duration cannot be empty");
    }
    if (!type || !type.length) {
      flag = false;
      handleError("type", "Job Type cannot be empty");
    }
    if (!designation || !designation.length) {
      flag = false;
      handleError("designation", "Designation cannot be empty");
    }
    return flag;
  }

  return (
    <div className={style.basic_container}>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Education</label>
        </div>

        <div className={style.multipleRight}>
          <div className={[style.input_label, style.input_one].join(" ")}>
            <input
              type="text"
              placeholder="Institution Name"
              name="institutionName"
              value={initialEducationState.institutionName}
              onChange={(e) => {
                if (e.target.value.length > 0)
                  handleError("institutionName", "");
                handle_Ed_Change(e);
              }}
            ></input>
            <div>
              {errors.institutionName && (
                <p style={{ color: "red" }}>{errors.institutionName}</p>
              )}
            </div>
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="Start Year"
              name="startYear"
              value={initialEducationState.startYear}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("startYear", "");
                handle_Ed_Change(e);
              }}
            ></input>
            <div>
              {errors.startYear && (
                <p style={{ color: "red" }}>{errors.startYear}</p>
              )}
            </div>
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="End Year"
              name="endYear"
              value={initialEducationState.endYear}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("endYear", "");
                handle_Ed_Change(e);
              }}
            ></input>
            <div>
              {errors.endYear && (
                <p style={{ color: "red" }}>{errors.endYear}</p>
              )}
            </div>
          </div>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Qualification"
              name="qualification"
              value={initialEducationState.qualification}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("qualification", "");
                handle_Ed_Change(e);
              }}
            ></input>
            <div>
              {errors.qualification && (
                <p style={{ color: "red" }}>{errors.qualification}</p>
              )}
            </div>
          </div>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Score or Grade"
              name="score"
              value={initialEducationState.score}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("score", "");
                handle_Ed_Change(e);
              }}
            ></input>
            <div>
              {errors.score && <p style={{ color: "red" }}>{errors.score}</p>}
            </div>
          </div>

          <div></div>
          <div className={style.addBtn}>
            <button onClick={addEducation}>Add</button>
          </div>
          <div className={style.eduWorkAddDataContainer}>
            {education.length > 0 ? (
              education.map((elem, index) => (
                <div className={style.eduWorkAddDataChild} key={index}>
                  <div>
                    <p>{elem.institutionName}</p>
                    <p>{elem.qualification}</p>
                    <div className={style.ewdataflex}>
                      <p>
                        <span>Start </span>
                        {elem.endYear}
                      </p>
                      <p>
                        <span>End</span> {elem.startYear}
                      </p>
                      <p>
                        <span>Grade</span> {elem.score}
                      </p>
                    </div>
                  </div>
                  <div
                    className={style.eduWorkDeleteBtn}
                    onClick={() => dltChild(setEducation,index)}
                  >
                    <p>
                      <FaRegTrashAlt />
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                {errors.education && (
                  <p style={{ color: "red" }}>{errors.education}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label>Work_Exp</label>
        </div>

        <div className={style.multipleRight}>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Company Name"
              name="company"
              value={initialWorkState.company}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("company", "");
                handle_Work_Change(e);
              }}
            ></input>
            <div>
              {errors.company && (
                <p style={{ color: "red" }}>{errors.company}</p>
              )}
            </div>
          </div>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Designation"
              value={initialWorkState.designation}
              name="designation"
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("designation", "");
                handle_Work_Change(e);
              }}
            ></input>
            <div>
              {errors.designation && (
                <p style={{ color: "red" }}>{errors.designation}</p>
              )}
            </div>
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="Duration"
              name="duration"
              value={initialWorkState.duration}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("duration", "");
                handle_Work_Change(e);
              }}
            ></input>
            <div>
              {errors.duration && (
                <p style={{ color: "red" }}>{errors.duration}</p>
              )}
            </div>
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="Type of employment"
              name="type"
              value={initialWorkState.type}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("type", "");
                handle_Work_Change(e);
              }}
            ></input>
            <div>
              {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
            </div>
          </div>
          <div></div>
          <div className={style.addBtn}>
            <button onClick={addWork}>Add</button>
          </div>
          <div className={style.eduWorkAddDataContainer}>
            {workExp.length > 0 ? (
              workExp.map((elem,index) => (
                <>
                  <div className={style.eduWorkAddDataChild} key={index}>
                    <div>
                      <p>
                        <span>Company </span> {elem.company}
                      </p>
                      <p>
                        <span>Desigination </span>
                        {elem.designation}
                      </p>
                      <div className={style.ewdataflex}>
                        <p>
                          <span>Duration </span>
                          {elem.duration}
                        </p>
                        <p>
                          <span>Type</span> {elem.type}
                        </p>
                      </div>
                    </div>
                    <div className={style.eduWorkDeleteBtn} onClick={()=>dltChild(setWorkExp,index)}>
                      <p>
                        <FaRegTrashAlt />
                      </p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <>
                {errors.workExp && (
                  <p style={{ color: "red" }}>{errors.workExp}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
