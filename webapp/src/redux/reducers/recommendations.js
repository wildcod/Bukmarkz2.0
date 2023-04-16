import {createError} from './error'
import {createMessage} from './message'
import {recommendationsAPI} from '../../api/recommendation'

export const GET_RECOMMENDATIONS = 'RECOMMENDATIONS/GET_RECOMMENDATIONS'
export const DELETE_RECOMMENDATION = 'RECOMMENDATIONS/DELETE_RECOMMENDATION'
export const UPDATE_RECOMMENDATION = 'RECOMMENDATIONS/UPDATE_RECOMMENDATION'
export const ADD_RECOMMENDATION = 'RECOMMENDATIONS/ADD_RECOMMENDATION'

const initialState = {
    recommendation: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendation: action.payload
            }
        case DELETE_RECOMMENDATION:
            return {
                ...state,
                recommendation: state.recommendation.filter(
                    (recommendation) => recommendation.id !== action.payload
                )
            }
        case ADD_RECOMMENDATION:
            return {
                ...state,
                recommendation: [...state.recommendation, action.payload]
            }
        case UPDATE_RECOMMENDATION:
            return {
                ...state,
                recommendation: [
                    action.payload,
                    ...state.recommendation.filter(
                        (recommendation) => recommendation.id !== action.payload.id
                    )
                ]
            }
        default:
            return state
    }
}


const actions = {
    setRecommendations: (data) => ({type: GET_RECOMMENDATIONS, payload: data}),
    deleteRecommendation: (id) => ({type: DELETE_RECOMMENDATION, payload: id}),
    addRecommendation: (data) => ({type: ADD_RECOMMENDATION, payload: data}),
    updateRecommendation: (data) => ({
        type: UPDATE_RECOMMENDATION,
        payload: data
    })
}

export const getRecommendations = () => async (dispatch) => {
    try {
        let data = await recommendationsAPI.getRecommendations()
        dispatch(actions.setRecommendations(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const deleteRecommendation = (id) => async (dispatch) => {
    try {
        await recommendationsAPI.deleteRecommendation(id)
        dispatch(actions.deleteRecommendation(id))
        dispatch(createMessage({recommDeleted: 'Recommendation Deleted'}))
    } catch (e) {
        dispatch(createError(e))
    }
}


export const addRecommendation = (body) => async (dispatch) => {
    try {
        let data = await recommendationsAPI.addRecommendation(body)
        dispatch(createMessage({recommendationAdded: 'Recommendation Added'}))
        dispatch(actions.addRecommendation(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const updateRecommendation = (body, id) => async (dispatch) => {
    try {
        let data = await recommendationsAPI.updateRecommendation(body, id)
        dispatch(createMessage({recommendationUpdated: 'recommendation Updated'}))
        dispatch(actions.updateRecommendation(data))
    } catch (e) {
        dispatch(createError(e))
    }
}
