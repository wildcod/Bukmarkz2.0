import React from 'react';
import style from './Layout.module.scss'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";

const Layout = (props) => {
    const location = useLocation()
    const isExtPage = location.pathname === '/extension';
    return (
       <div>
           {!isExtPage ? <Header /> : null }
           <div className={!isExtPage ? style.layoutWrapper: ''}>
               {props.children}
           </div>
           {!isExtPage ? <Footer /> : null}
       </div>
    );
};

export default Layout;
