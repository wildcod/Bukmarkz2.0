import React, {useCallback, useMemo, useState} from 'react';
import Button from '../common/button/Button';
import s from './Register.module.scss';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Cookies} from "react-cookie";
import {AUTH_TOKEN_COOKIE_NAME} from "../../constants";
import {withRouter} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import { registerUser } from '../../redux/reducers/auth';
import DesktopLogo from '../../assets/img/fwdlogo/logo.png';
import countryList from 'react-select-country-list';
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import MarkunreadOutlinedIcon from "../../../node_modules/@mui/icons-material/MarkunreadOutlined";
import LockOutlinedIcon from "../../../node_modules/@mui/icons-material/LockOutlined";
import LanguageOutlinedIcon from "../../../node_modules/@mui/icons-material/LanguageOutlined";
import AccountCircleOutlinedIcon from "../../../node_modules/@mui/icons-material/AccountCircleOutlined";
import LocalPhoneRoundedIcon from "../../../node_modules/@mui/icons-material/LocalPhoneRounded";



const Register = ({ onToggle, isLoading, registerUser, error, onClose }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [formError, setFormErr] = useState('')
    const cookie = new Cookies()
    const options = useMemo(() => countryList().getData(), [])
    
    const history = useHistory();

    const formValidation = useCallback((data) => {
        if(!data.country){
            return [false, 'Please Select Country']
        }else if(data.password !== data.password2){
            return [false, 'Password does not matched']
        }
        return [true, ''];
    }, [])

    const getToken = () => {
        let name = 'ref_token='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        let token = ''
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                token = c.substring(name.length, c.length)
            }
        }
        console.log('token', token);
        return token
    }

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

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     let data = {
    //         username,
    //         email,
    //         password,
    //         password2,
    //         country,
    //         phone: phoneNumber,
    //         token: csrftoken
    //     }
    //     if (data['token'] === '') {
    //         delete data['token']
    //     }
    //     const isValidData = formValidation(data);
    //     if(isValidData[0]){
    //         setFormErr('')
    //         registerUser(data)
    //             .then((data) => {
    //                 console.log('Data', data);
    //                data && data.ok && onClose()
    //             })
    //     }else{
    //         setFormErr(isValidData[1])
    //     }
    // }

    function passRegisterForm(event) {
        event.preventDefault();
        let data = {
            username: username,
            email: email,
            password: password,
            password2: password2,
            country: country,
            phone: phoneNumber,
            token: csrftoken
        }
        axios({
            method: "POST",
            url:`/api/auth/register/`,
            data:JSON.stringify(data),
            headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
        }).then((response, dispatch) => {
            setFormErr('')
            // registerUser(data)
            //     .then((data) => {
            //         console.log('Data', data);
            //        data && data.ok && onClose()
            //     })
            // history.push('/dashboard');
            onToggle();
        }).catch((error) => {
            if (error.response) {
                // setPassErr(error.response.data.err[0].split(" - ")[1]);
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    const isError = useMemo(() => {
        if(formError){
            return formError
        }else return null
    }, [formError])

    return (
        <div className={s.registerWrapper}>
            <img
                src={DesktopLogo}
                alt={'bukmarz-logo'}
            />
            <form className={s.formContainer} onSubmit={passRegisterForm}>
                <div className={s.formGroup}>
                    <div className={s.formInput}>
                        <div className={s.rightBorder}></div>
                        <input
                            autoComplete='off'
                            type={'text'}
                            name={'username'}
                            placeholder={'Username'}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className={s.svgDiv}>
                            <AccountCircleOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={s.formGroup}>
                    <div className={s.formInput}>
                        <div className={s.rightBorder}></div>
                        <input
                            autoComplete='off'
                            type={'email'}
                            name={'email'}
                            required
                            placeholder={'Email'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={s.svgDiv}>
                            <MarkunreadOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={s.formGroup}>
                    <div className={s.formInput}> {/* style={{ width: '130px', padding: '15px 0', paddingRight: '16px' }}> /*}
                        {/* <CountrySelect labels={en} value={country} onChange={setCountry} name="countrySelect" /> */}
                        <PhoneInput
                            defaultCountry="IN"
                            autoComplete='off'
                            type={'tel'}
                            name={'Phone number'}
                            required
                            placeholder={'Phone number'}
                            onChange={setPhoneNumber}
                        />
                    </div>
                    {/* <div className={s.formInput}>
                        <div className={s.rightBorder}></div>
                        <input
                            autoComplete='off'
                            type={'tel'}
                            name={'Phone number'}
                            required
                            placeholder={'Phone number (+919834736490)'}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div className={s.svgDiv}>
                            <LocalPhoneRoundedIcon />
                        </div>
                    </div> */}
                </div>
                <div className={s.formGroup}>
                    <div className={s.formInput}>
                        <div className={s.rightBorder}></div>
                        <input
                            type={'password'}
                            name={'password'}
                            required
                            placeholder={'Password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={s.svgDiv}>
                            <LockOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={s.formGroup}>
                    <div className={s.formInput}>
                        <div className={s.rightBorder}></div>
                        <input
                            type={'password'}
                            name={'password2'}
                            required
                            placeholder={'Confirm Password'}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <div className={s.svgDiv}>
                            <LockOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={s.formGroup}>
                    <div className={s.formInput}> 
                        <div className={s.rightBorder}></div>
                        <select
                            autoComplete='off'
                            name={'country'}
                            required
                            onChange={(e) => setCountry(e.target.value)}>
                            <option value={''}>Select a country</option>
                            {
                                options.map(o => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))
                            }
                        </select>
                        <div className={s.svgDiv}>
                            <LanguageOutlinedIcon />
                        </div>
                    </div>
                </div>
                {
                    isError ?
                        <p className={s.error}>{isError}</p> : null
                }
                <div className={s.formBottom}>
                    <div className={s.btnContainer}>
                        <Button
                            label={'Sign Up'}
                            type={'submit'}
                            isLoading={isLoading}
                            onClick={passRegisterForm}
                        />
                    </div>
                    <p className={s.forgotCaption}>
                        Already have an account? <span onClick={onToggle}>Log in</span>
                    </p>
                </div>
                {/* <div className={s.btnContainer}>
                    <Button
                        label={'Sign Up'}
                        type={'submit'}
                        isLoading={isLoading}
                    />
                </div>
                <p>
                    Already have an account? <span onClick={onToggle}>Log in</span>
                </p> */}
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.errors,
    isLoading: state.loading.isLoading,
    slug: state.auth.slug
})

export default compose(
    connect(mapStateToProps, {registerUser}),
    withRouter
)(Register)
