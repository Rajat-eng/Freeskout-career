import React from 'react'
import style from './index.module.css'
import logo from "../../../assets/img/freeskout.png";


const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
          <div className={style.footer_left}>
            <div>
              <img src={logo} alt="logo"></img>
              <span>Freeskout</span>
            </div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
              <br></br>
              <br></br>
              All rights reserved
            </p>
          </div>
          <div className={style.footer_right}>
            <ul>
              <li>Landings</li>
              <li>Home</li>
              <li>Products</li>
              <li>Services</li>
            </ul>
            <ul>
              <li>Company</li>
              <li>Home</li>
              <li>
                Careers
                <span>Hiring!</span>
              </li>
              <li>Services</li>
            </ul>
            <ul>
              <li>Resources</li>
              <li>Blog</li>
              <li>Products</li>
              <li>Services</li>
            </ul>
          </div>
        </footer>
    </>
  )
}

export default Footer