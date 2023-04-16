import React, {useEffect, useState} from 'react';
import axios from "axios";
import style from './HomePage.module.scss'
import HomeCarousel from "./home-carousel/HomeCarousel";
import HomeServices from "./home-services/HomeServices";
import HomeAboutUs from "./home-about-us/HomeAboutUs";
import {scrollToTop, setCookie} from "../../../utils";
import HomePrice from "./home-price/HomePrice";
import {useHistory} from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/button/Button";

const HomePage = (props) => {
    const history = useHistory();
    
    const [formPassResetConfirm, setFormPassResetConfirm] = useState({
        new_password1: "",
        new_password2: "",
    })
    const [passErr, setPassErr] = useState(" ");
    
    const [openForgotPasswordConfirm, setOpenForgotPasswordConfirm] = useState(false);
    const pathname = window.location.pathname;

    useEffect(() => {
        const refToken = history.location.search?.slice(1)?.split('=')[1];
        console.log(refToken)
        scrollToTop()
        if (refToken) {
            setCookie(refToken)
        }

        if (pathname.includes('/password/reset/confirm/')) {
            console.log("yep");
            setOpenForgotPasswordConfirm(true)
        }
        else{
            console.log("nope");
        }
    }, [])

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie("csrftoken");

    
    function passResetConfirm(event) {
        event.preventDefault();

        var uid = pathname.split("/")[4];
        var token = pathname.split("/")[5];

        axios({
            method: "POST",
            url:`/password/reset/confirm/${uid}/${token}/`,
            data:{
                new_password1: formPassResetConfirm.new_password1,
                new_password2: formPassResetConfirm.new_password2,
                uid: uid,
                token: token,
            },
            headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
        })
        .then((response) => {
            setOpenForgotPasswordConfirm(false)
            history.push('/');
            setFormPassResetConfirm(({new_password1: "", new_password2: "",}))
        }).catch((error) => {
            if (error.response) {
                setPassErr(error.response.data.err[0].split(" - ")[1]);
                console.log(error.response.data.err[0].split(" - ")[1]);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setFormPassResetConfirm(prevPass => ({
            ...prevPass, [name]: value})
    )}

    return (
        <div className={style.homePage}>
            <div className={style.registerWrapper}>
                <Modal openModal={openForgotPasswordConfirm} onClose={() => setOpenForgotPasswordConfirm(false)}>
                    <form className={style.formContainer} onSubmit={ passResetConfirm }>
                        <h2 style={{textAlign: 'center'}}>Password Reset</h2>
                        {
                            passErr ?
                                <p className={style.error}>{passErr}</p> : null
                        }
                        <div className={style.formInput}>
                            <input
                                type={'password'}
                                required
                                name={'new_password1'}
                                text={formPassResetConfirm.new_password1}
                                placeholder={'Enter Password'}
                                onChange={ handleChange }
                            />
                        </div>
                        <div className={style.formInput}>
                            <input
                                type={'password'}
                                required
                                name={'new_password2'}
                                text={formPassResetConfirm.new_password1}
                                placeholder={'Confirm Password'}
                                onChange={ handleChange }
                            />
                        </div>
                        <div className={style.btnContainer}>
                            <Button
                                label={'Save'}
                                type={'submit'}
                            />
                        </div>
                    </form>
                </Modal>
            </div>
            <div className={style.carouselWrapper}>
                <HomeCarousel />
                <div className={style.card} >
                    <h1>
                        Manage Bookmark Smartly
                    </h1>
                    <p>
                        Manage all your Bookmarks in one place. Bukmarkz
                        helps you organize
                        and keep Track of all your Bookmarks.
                    </p>
                </div>
            </div>
            <HomeServices />
            <HomePrice />
            <HomeAboutUs />
        </div>
    );
};

export default HomePage;
