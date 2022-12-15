import {createError} from './error'
import {authAPI} from '../../api/authApi'

export const GET_REFERRAL = 'REFERRALS/GET_REFERRAL'
export const CREATE_REF_RELATION = 'REFERRALS/CREATE_REF_RELATION'

const initialState = {
    referral: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REFERRAL:
            return {
                ...state,
                referral: action.payload
            }
        case CREATE_REF_RELATION:
            return {
                ...state
            }
        default:
            return state
    }
}

//user's referral data
export const getReferral = () => async (dispatch) => {
    try {
        let data = await authAPI.getUserReferralsData()
        dispatch({
            type: GET_REFERRAL,
            payload: data
        })
    } catch (e) {
        dispatch(createError(e))
    }
}
