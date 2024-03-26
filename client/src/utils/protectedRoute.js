import React, { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
import { useLoadUserQuery } from "../redux/api/userApi";

const ProtectedRoute = ({ children, allowedRoles,isError }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  console.log('pr',isAuthenticated)
  if (isAuthenticated === true) {
    if (allowedRoles.includes(user.role)) {
      return children ? children : <Outlet />;
    } else {
      console.log("not allowed");
      return <Navigate to="/" replace />;
    }
  }else{
    return <Navigate to={"/user/login"} state={`${location.pathname}`} replace/>
  }

};

export default React.memo(ProtectedRoute);
