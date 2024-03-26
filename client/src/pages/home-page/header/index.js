import React, { useState } from "react";
import style from "./index.module.css";
import logo from "../../../assets/img/freeskout.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSuitcase, FaUserCircle } from "react-icons/fa";
import {
  BsFillBookmarkPlusFill,
  BsFillInfoCircleFill,
  BsHeadphones,
} from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { GiCompass } from "react-icons/gi";
import { useLogoutUserMutation } from "../../../redux/api/userApi";
import Loader from '../../../components/loader';
import { toast } from "react-toastify";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation().pathname;

  const [mobMenu, setMobMenu] = useState(false);
  const [logoutUser,{isLoading}]=useLogoutUserMutation()

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const logoutAppl = async () => {
    try {
     await logoutUser().unwrap()
     navigate('/',{replace:true})
    } catch (error) {
      console.log(error);
      toast.error(error.data.message)
    }
  };

  if(isLoading){
    return <Loader />
  }

  if(mobMenu){
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <header className={style.header}>
        <nav className={style.headerNav}>
          <div className={style.headerLogo}>
            <NavLink to={`/`}>
              <img src={logo} alt="logo" /> &nbsp;
              <span>freeskout</span>
            </NavLink>
          </div>
          <div
            className={`${style.hamburgerIcon} ${mobMenu && style.open}`}
            onClick={() => setMobMenu(!mobMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div onClick={()=>setMobMenu(false)} className={`${style.transpWrapper} ${mobMenu && style.showTransWrap}`}></div>

          <div
            className={`${style.navContainer} ${mobMenu && style.showMenuBar}`}
          >
            {loc === "/" ? (
              <ul className={style.headerNavlist}>
                <li onClick={()=>setMobMenu(false)}>
                  <a href="#career">
                    <span>
                      <GiCompass />
                    </span>
                    Career
                  </a>
                </li>
                <li onClick={()=>setMobMenu(false)}>
                  <a href="#aboutus">
                    <span>
                      <BsFillInfoCircleFill />
                    </span>
                    About
                  </a>
                </li>
                <li onClick={()=>setMobMenu(false)}>
                  <a href="#contactus">
                    <span>
                      <BsHeadphones />
                    </span>
                    Contact
                  </a>
                </li>
              </ul>
            ) : (
              <ul className={style.headerNavlist}>
                <li onClick={()=>setMobMenu(false)}>
                  <NavLink to={`/`}>
                    <span>
                      <GiCompass />
                    </span>
                    Career
                  </NavLink>
                </li>
                <li onClick={()=>setMobMenu(false)}>
                  <NavLink to={`/`}>
                    <span>
                      <BsFillInfoCircleFill />
                    </span>
                    About
                  </NavLink>
                </li>
                <li onClick={()=>setMobMenu(false)}>
                  <NavLink to={`/`}>
                    <span>
                      <BsHeadphones />
                    </span>
                    Contact
                  </NavLink>
                </li>
              </ul>
            )}
            {isAuthenticated ? (
              <>
                <div className={style.profileMenu}>
                  <div className={style.profileChild}>
                    <div className={style.dp}>
                      {user?.firstname.slice(0, 1) + user?.lastname.slice(0, 1)}
                    </div>
                    <div className={style.profileDetails}>
                      <h6 className={style.profileName}>
                        {user.firstname}
                        <span>
                          <IoMdArrowDropdown />
                        </span>
                      </h6>
                      <h6>{user.email.split("@")[0] + "@"}</h6>
                    </div>
                  </div>
                  <div
                    className={`${style.dropdownMenu} ${
                      user?.role === "Applicant" && style.userHeight
                    }`}
                  >
                    {user?.role === "Applicant" && (
                      <ul>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/profile`}>
                            <span>
                              <FaUserCircle />
                            </span>
                            My profile
                          </NavLink>
                        </li>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/application`}>
                            <span>
                              <FaSuitcase />
                            </span>
                            Application
                          </NavLink>
                        </li>
                        <li onClick={()=>logoutAppl()}>
                          <span>
                            <TbLogout />
                          </span>
                          Logout
                        </li>
                      </ul>
                    )}

                    {user?.role === "Recruiter" && (
                      <ul>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/dashboard`}>
                            <span>
                              <FaUserCircle />
                            </span>
                            Dashboard
                          </NavLink>
                        </li>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/applicant`}>
                            <span>
                              <BsFillBookmarkPlusFill />
                            </span>
                            Application
                          </NavLink>
                        </li>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/jobs`}>
                            <span>
                              <FaSuitcase />
                            </span>
                            Jobs
                          </NavLink>
                        </li>
                        <li onClick={()=>setMobMenu(false)}>
                          <NavLink to={`/create-job`}>
                            <span>
                              <FaSuitcase />
                            </span>
                            Create Job
                          </NavLink>
                        </li>
                        <li onClick={()=>logoutAppl()}>
                          <span>
                            <TbLogout />
                          </span>
                          Logout
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <NavLink to="/user/login">
                <button className={style.loginBtn}>Login</button>
              </NavLink>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
