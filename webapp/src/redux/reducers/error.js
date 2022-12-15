import { GET_ERRORS } from '../../constants/types'

const initialState = {
    msg: '',
    status: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state
    }
}

export  const createError = (err) => {
    let errors = {}
    try {
        errors = {
            msg: err.response.data,
            status: err.response.status
        }

    } catch {
        errors = {
            msg: 'Something went wrong',
            status: 500
        }
    }
    return {type: GET_ERRORS, payload: errors}
}
