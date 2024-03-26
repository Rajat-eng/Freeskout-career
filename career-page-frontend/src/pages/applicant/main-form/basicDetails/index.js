import React, { useState, useEffect } from "react";
import style from "../../main-form/index.module.css";
import {
  MdDelete,
  MdDeleteForever,
  MdDragHandle,
  MdOutlineDelete,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Basic = ({ pd, setPd, errors, handleError }) => {
  const [gender, setGender] = useState(pd.gender);
  const [maritalStatus, setMaritalStatus] = useState(pd.maritalStatus);
  const [differentlyAbled, setDifferentlyAbled] = useState(pd.differentlyAbled);
  const [languages, setLanguages] = useState([...pd.languages]);
  const [currLanguage, setCurrLanguage] = useState("");
  const [address, setAddress] = useState({ ...pd.address });

  function addLanguage() {
    if (!currLanguage || !currLanguage.length) {
      return;
    }
    setLanguages((cur) => {
      let x = currLanguage.charAt(0).toUpperCase() + currLanguage.substring(1);
      let next = [...cur];
      if (!next.includes(x)) {
        next.push(x);
      }
      // else if(next.includes(x)){
      //   toast.error("Language Already exists")
      // }
      return next;
    });
    setCurrLanguage("");
  }

  const dltChild = (id) =>{
    setLanguages((cur)=> {
      const updateValues = [...cur]
      updateValues.splice(id,1);
      return updateValues;
    })
  }

  function handleChange(e) {
    if (e.target.name === "gender") {
      setGender(e.target.value);
    }
    if (e.target.name === "language") {
      setCurrLanguage(e.target.value);
    }
    if (e.target.name === "maritalStatus") {
      setMaritalStatus(!maritalStatus);
    }
    if (e.target.name === "differentlyAbled") {
      setDifferentlyAbled(!differentlyAbled);
    }
    if (e.target.name === "addressline1") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "district") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "state") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "country") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "pincode") {
      let val = e.target.value;
      val = val.replace(/[^0-9]/g, "");
      setAddress({ ...address, [e.target.name]: val });
    }
  }

  useEffect(() => {
    setPd((cur) => {
      return {
        ...cur,
        languages,
        gender,
        maritalStatus,
        differentlyAbled,
        address,
      };
    });
  }, [languages, gender, maritalStatus, differentlyAbled, address]);
  return (
    <div className={style.basic_container}>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Address</label>
        </div>

        <div className={style.multipleRight}>
          <div className={[style.input_label, style.input_one].join(" ")}>
            <input
              type="text"
              placeholder="Address-Line-1"
              name="addressline1"
              value={pd.address.addressline1}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("addressline1", "");
                handleChange(e);
              }}
            ></input>
            {errors.addressline1 ? (
              <p style={{ color: "red" }}>{errors.addressline1}</p>
            ) : (
              <></>
            )}
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="District"
              name="district"
              value={address.district}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("district", "");
                handleChange(e);
              }}
            ></input>
            {errors.district ? (
              <p style={{ color: "red" }}>{errors.district}</p>
            ) : (
              <></>
            )}
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={address.state}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("state", "");
                handleChange(e);
              }}
            ></input>
            {errors.state ? (
              <p style={{ color: "red" }}>{errors.state}</p>
            ) : (
              <></>
            )}
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={address.country}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>
          <div className={style.input_label}>
            <input
              type="text"
              placeholder="Pincode"
              maxLength={6}
              name="pincode"
              value={address.pincode}
              onChange={(e) => {
                if (e.target.value.length > 0) handleError("pincode", "");
                handleChange(e);
              }}
            ></input>
            {errors.pincode ? (
              <p style={{ color: "red" }}>{errors.pincode}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label>Languages</label>
        </div>

        <div className={style.field_right}>
          <div className={[style.input_label, style.input_large].join(" ")}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Language"
                name="language"
                value={currLanguage}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-control"
              ></input>
              <span
                onClick={addLanguage}
                className={`input-group-text ${style.input_button}`}
              >
                ADD
              </span>
            </div>
            <div className={style.inputAddData}>
            {
              languages.length>0 ?
              (
                languages.map((elem,index) => (
                <p>
                  {elem}{" "}
                  <span onClick={()=>dltChild(index)}>
                    <FaRegTrashAlt />
                  </span>
                </p>
              ))
              ):
              (
                <>
                {errors.languages &&
                  <span style={{ color: "red" }}>{errors.languages}</span>
                }</>
              )
            }
            </div>
          </div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.field_left}>
          <label>Gender</label>
        </div>
        <div className={style.field_right}>
          <select
            name="gender"
            className="form-select mx-1"
            onChange={(e) => {
              handleChange(e);
            }}
            value={gender}
          >
            <option value="male" selected>
              Male
            </option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Marital Status</label>
        </div>

        <div className={style.field_right}>
          {/* <div className={[style.input_label].join(" ")}> */}
          <select
            name="maritalStatus"
            className="form-select mx-1"
            value={maritalStatus}
            onClick={(e) => {
              handleChange(e);
            }}
          >
            <option value="unmarried" selected>
              Unmarried
            </option>
            <option value="married">Married</option>
          </select>
          {/* </div> */}
        </div>
      </div>
      <div className={style.field}>
        <div className={style.field_left}>
          <label>Differently-Abled</label>
        </div>
        <div className={style.field_right}>
          <div className={[style.input_label].join(" ")}>
            <input type="text" placeholder="No" />
          </div>
          <input type="text" placeholder="Mention" />
        </div>
      </div>
    </div>
  );
};

export default Basic;
