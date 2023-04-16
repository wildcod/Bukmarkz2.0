import {createError} from './error'
import {createMessage} from './message'
import {userHelpAPI} from '../../api/userHelpAPI'

export const GET_AIDS = 'USER_HELP/GET_AIDS'
export const ADD_AID = 'USER_HELP/ADD_AID'
export const DELETE_AID = 'USER_HELP/DELETE_AID'

const initialState = {
    aids: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AIDS:
            return {
                ...state,
                aids: action.payload
            }
        case DELETE_AID:
            return {
                ...state,
                aids: state.aids.filter(
                    (aid) => aid.id !== action.payload
                )
            }
        case ADD_AID:
            return {
                ...state,
                aids: [...state.aids, action.payload]
            }
        default:
            return state
    }
}

const actions = {
    setAids: (data) => ({type: GET_AIDS, payload: data}),
    addAid: (data) => ({type: ADD_AID, payload: data}),
    deleteAid: (id) => ({type: DELETE_AID, payload: id})
}

export const getAids = () => async (dispatch) => {
    try {
        let data = await userHelpAPI.getAids()
        dispatch(actions.setAids(data))
    } catch (e) {
        dispatch(createError(e))
    }
}


export const addAid = (body) => async (dispatch) => {
    try {
        let data = await userHelpAPI.addAidForUser(body)
        dispatch(createMessage({aidAdded: 'Aid Added'}))
        dispatch(actions.addAid(data))
    } catch (e) {
        dispatch(createError(e))
    }
}


export const deleteAid = (id) => async (dispatch) => {
    try {
        await userHelpAPI.deleteAid(id)
        dispatch(createMessage({aidDeleted: 'Aid Deleted'}))
        dispatch(actions.deleteAid(id))
    } catch (e) {
        dispatch(createError(e))
    }
}
