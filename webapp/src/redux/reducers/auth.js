import { AUTH_TOKEN_NAME } from '../../constants'
import { Cookies } from 'react-cookie'
import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    GO_TO_URL,
    REGISTER_FAIL,
    SET_USER_SUBSCRIPTION,
    RESET_SUCCESS,
    RESET_PASSWORD, SET_LOADING,
    SET_BG_IMAGE
} from '../../constants/types'
import { authAPI } from "../../api/authApi";
import { subscriptionAPI } from "../../api/subscription";
import { createError } from "./error";
import createMessage from "./message";
import {errorParser, getDataFromLocalStorage, setDataToLocalStorage} from "../../utils";
import { useHistory } from "react-router-dom";


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
const cookies = new Cookies()
const setAuthTokenToCookies = async (token, expiry) => {
    console.log('YO', token)
    try {
        cookies.set(AUTH_TOKEN_NAME, token, {expires: new Date(expiry)})
    } catch (e) {
        console.error(e)
    }
}

const initialState = {
    token: getDataFromLocalStorage(AUTH_TOKEN_NAME),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    userSubscription: null,
    pswd: null,
    slug: '/',
    queryParams: '',
    backgroundPreferredImageUrl: localStorage.getItem("backgroundImage")
}


export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem(AUTH_TOKEN_NAME)
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        case RESET_PASSWORD:
        case RESET_SUCCESS:
            return {
                ...state,
                pswd: true
            }

        case GO_TO_URL:
            return {
                ...state,
                slug: action.slug,
                queryParams: action.queryParams
            }

        case SET_USER_SUBSCRIPTION:
            return {
                ...state,
                userSubscription: action.payload
            }
        case SET_BG_IMAGE:
            return {
                ...state,
                backgroundPreferredImageUrl: action.payload
            }
        default:
            return state
    }
}

const actions = {
    setUser: (user) => ({type: USER_LOADED, payload: user}),
    setLoginSuccess: (data) => ({type: LOGIN_SUCCESS, payload: data}),
    setRegisterSuccess: (data) => ({type: REGISTER_SUCCESS, payload: data}),
    logoutSuccess: () => ({type: LOGOUT_SUCCESS}),
    passwordReset: (data) => ({type: RESET_PASSWORD, payload: data}),
    passwordResetSuccess: (data) => ({type: RESET_SUCCESS, payload: data}),
    setUserSubscription: (data) => ({type: SET_USER_SUBSCRIPTION, payload: data}),
    setLoading: (data) => ({type: SET_LOADING, payload: data}),
}

const stopLoading = (dispatch) => {
   setTimeout(() => {
       dispatch(actions.setLoading(false))
   }, 4000)
}

// CHECK TOKEN AND LOAD USER
export const loadUser = () => async (dispatch) => {
    dispatch({type: USER_LOADING})
    try {
        let data = await authAPI.me()
        dispatch(actions.setUser(data))
    } catch (e) {
        dispatch({type: AUTH_ERROR})
        dispatch(createError(e))
    }
}

export const loginUser = (body) => async (dispatch) => {
    try {
        dispatch(actions.setLoading(true))
        const { data } = await authAPI.login(body)
        setDataToLocalStorage(AUTH_TOKEN_NAME, data.key)
       
        // get loggedIn user details
        dispatch(loadUser());
        dispatch(actions.setLoginSuccess(data))
        stopLoading(dispatch)
        return { ok: true }
    } catch(e) {
        return { ok: false }
    }
};

// REGISTER USER
export const registerUser = (body) => async (dispatch) => {
    try {
        dispatch(createError(''))
        dispatch(actions.setLoading(true))
        let data = await authAPI.register(body)
        await setAuthTokenToCookies(data.token, data.expiry)
        dispatch(actions.setRegisterSuccess(data))
        stopLoading(dispatch)
        return {
            status: 200,
            ok: true
        }
    } catch (e) {
        const error = errorParser(e)
        console.log('Error', error)
        dispatch({type: REGISTER_FAIL})
        dispatch(createError(error))
        dispatch(actions.setLoading(false))
        return {
            status: 500,
            ok: false
        }
    }
}

// LOGOUT USER
export const logOutUser = () => async (dispatch) => {
    console.log('Logout')
    try {
        await authAPI.logout()
        dispatch(actions.logoutSuccess())
    } catch (e) {
        dispatch(createError(e))
    }
}

// Reset Password
export const resetPassword = (body) => async (dispatch) => {
    try {
        let data = await authAPI.resetPassword(body)
        dispatch(createMessage({emailSent: 'A mail has been sent to your Email account.'}))
        dispatch(actions.passwordReset(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

// Reset Password Done
export const resetPasswordDone = (body) => async (dispatch) => {
    try {
        let data = await authAPI.passwordResetConfirm(body)
        dispatch(createMessage({resetSuccess: 'Password has been set successfully. Log in to your Account.'}))
        dispatch(actions.passwordResetSuccess(data))
        return { ok : true }
    } catch (e) {
        dispatch(createError(e))
        return { ok : false }
    }
}

export const getUserSubscriptionDetails = () => async (dispatch) => {
    try {
        let data = await subscriptionAPI.getUserSubscriptionDetails()
        if (data.length > 0)
            dispatch(actions.setUserSubscription(data[0]))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const changeURL = (data) => (dispatch) => {
    dispatch({
        type: GO_TO_URL,
        slug: data.slug,
        queryParams: data.queryParams
    })
}

export const setBgImage = (imgId) => (dispatch) => {
    dispatch({
        type: SET_BG_IMAGE,
        payload: imgId
    })
}
