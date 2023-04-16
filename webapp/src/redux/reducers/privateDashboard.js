import {privateDashboardAPI} from '../../api/privateDashboard'
import {createError} from './error'

const SET_ACCESS_STATUS = 'PRIVATE_DASHBOARD/SET_ACCESS_STATUS'
const SET_REQUEST_OTP_STATUS = 'PRIVATE_DASHBOARD/SET_REQUEST_OTP_STATUS'

const initialState = {
    hasAccess: false,
    requestOTP: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_STATUS:
            return {
                ...state,
                hasAccess: action.payload
            }
        case SET_REQUEST_OTP_STATUS:
            return {
                ...state,
                requestOTP: action.payload
            }
        default:
            return state
    }
}

export const setAccessStatus = (status) => ({
    type: SET_ACCESS_STATUS,
    payload: status
})

const setRequestOTPStatus = (status) => ({
    type: SET_REQUEST_OTP_STATUS,
    payload: status
})

export const checkAccess = () => async (dispatch) => {
    try {
        await privateDashboardAPI.checkAccess()
        dispatch(setAccessStatus(true))
    } catch (e) {
        dispatch(setAccessStatus(false))
    }
}

export const getOTP = () => async (dispatch) => {
    try {
        await privateDashboardAPI.requestOTP()
        dispatch(setRequestOTPStatus(true))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const postOTP = (otp) => async (dispatch) => {
    try {
        await privateDashboardAPI.postOTP(otp)
        dispatch(setAccessStatus(true))
        dispatch(setRequestOTPStatus(false))
    } catch (e) {
        dispatch(createError(e))
    }
}
