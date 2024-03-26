import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "../../main-form/index.module.css";

const Final = (props) => {
  const {
    skills,
    setSkills,
    socialLinks,
    setSocialLinks,
    setResume,
    Resume,
    errors,
    handleError,
  } = props;
  const [currSkill, setCurrSkill] = useState("");

  function addSkill() {
    if (!currSkill || !currSkill.length) {
      return;
    }
    let x = currSkill.toUpperCase();
    setSkills((cur) => {
      let next = [...cur];
      if (!next.includes(x)) {
        next.push(x);
      }
      return next;
    });
    setCurrSkill("");
  }

  const dltChild = (id) => {
    setSkills((cur) => {
      const updateValues = [...cur];
      updateValues.splice(id, 1);
      return updateValues;
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  }

  return (
    <div className={style.basic_container}>
      <div className={style.field}>
        <div className={style.field_left}>
          <label htmlFor="skills" id="skills">
            Skills
          </label>
        </div>
        <div className={style.field_right}>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Your Skills"
                type="text"
                name="skill"
                value={currSkill}
                onChange={(e) => {
                  setCurrSkill(e.target.value);
                }}
              ></input>
              <span
                onClick={addSkill}
                className={`input-group-text ${style.input_button}`}
              >
                Add
              </span>
            </div>
            <div className={style.inputAddData}>
              {skills.map((elem,index) => (
                <p key={index}>
                  {elem}
                  <span onClick={()=>dltChild(index)}>
                    <FaRegTrashAlt />
                  </span>
                </p>
              ))}
            </div>
          </div>
          {/* <div className={style.input_button}>
            <input type="submit" value="Add" onClick={addSkill}></input>
          </div> */}
        </div>
      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label htmlFor="skills" id="skills">
            Social Links
          </label>
        </div>
        <div className={style.multipleRight}>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="LinkedIn"
              value={socialLinks.linkedIn}
              name="linkedIn"
              onChange={(e) => {
                if(e.target.value.length>0) handleError('social',"")
                handleChange(e);
              }}
            ></input>
          </div>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Instagram"
              value={socialLinks.instagram}
              name="instagram"
              onChange={(e) => {
                if(e.target.value.length>0) handleError('social',"")
                handleChange(e);
              }}
            ></input>
          </div>
          <div className={[style.input_label].join(" ")}>
            <input
              type="text"
              placeholder="Github"
              value={socialLinks.github}
              name="github"
              onChange={(e) => {
                if(e.target.value.length>0) handleError('social',"")
                handleChange(e);
              }}
            ></input>
          </div>
          <div>{errors.social && <p style={{color:'red'}}>{errors.social}</p>}</div>
        </div>

      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label htmlFor="Resume" id="Resume">
            Resume
          </label>
        </div>
        <div className={style.multipleRight}>
          <div
            className={[style.input_label, style.input_wholeSpan, style.x].join(
              " "
            )}
          >
            <span>Browse and Choose files to Upload</span>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={(e) => {
                setResume(e.target.files[0]);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
