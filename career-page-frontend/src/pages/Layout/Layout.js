import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../home-page/Footer/Footer";
import Header from "../home-page/header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div id="main content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
