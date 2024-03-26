import React from "react";
import { toast } from "react-toastify";
import style from "../../main-form/index.module.css";

const Details = ({ details, setDetails,errors,handleError }) => {


  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "phone") {
      value = Number(value.replace(/[^0-9]/g, ""))
    }
    setDetails((details) => {
      return {
        ...details,
        [name]: value,
      };
    });
  }


  return (
    <div className={style.basic_container}>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Name</label>
        </div>
        <div className={style.field_right}>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <input
              type="text"
              name="firstname"
              value={details.firstname}
              onChange={(e) => {
                if(e.target.value.length>0 ) handleError("firstname","")
                handleChange(e);
              }}
            ></input>
            <div>
              {errors.firstname && <p style={{color:'red'}}>{errors.firstname}</p>}
            </div>
          </div>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <input
              type="text"
              name="lastname"
              value={details.lastname}
              onChange={(e) => {
                if(e.target.value.length>0 ) handleError("lastname","")
                handleChange(e);
              }}
            ></input>
             <div>
              {errors.lastname && <p style={{color:'red'}}>{errors.lastname}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Phone</label>
        </div>
        <div className={style.field_right}>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <input
              type="text"
              name="phone"
              maxLength={10}
              value={details.phone}
              onChange={(e) => {
                if(e.target.value.length>0 ) handleError("phone","")
                handleChange(e);
              }}
            ></input>
             <div>
              {errors.phone && <p style={{color:'red'}}>{errors.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label>Email</label>
        </div>
        <div className={style.field_right}>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <input
              type="text"
              name="email"
              readOnly
              value={details.email}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
