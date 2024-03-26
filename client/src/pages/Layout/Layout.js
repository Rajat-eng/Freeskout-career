import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../home-page/Footer/Footer';
import Header from '../home-page/header';


const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout