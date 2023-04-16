import {createMessage} from './message'
import {createError} from './error'
import {defaultDashboardAPI} from '../../api/defaultDashboard'
export const GET_DEFAULT_CATEGORIES = 'DEFAULT_DASHBOARD/GET_DEFAULT_CATEGORIES'
export const GET_DEFAULT_BOOKMARKS = 'DEFAULT_DASHBOARD/GET_DEFAULT_BOOKMARKS'

const initialState = {
    defaultCategories: [],
    defaultBookmarks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEFAULT_CATEGORIES:
            return {
                ...state,
                defaultCategories: action.payload
            }
        case GET_DEFAULT_BOOKMARKS:
            return {
                ...state,
                defaultBookmarks: action.payload
            }
        default:
            return state
    }
}

const actions = {
    setDefaultBookmarks: (data) => ({type: GET_DEFAULT_BOOKMARKS, payload: data}),
    setDefaultCategories: (data) => ({type: GET_DEFAULT_CATEGORIES, payload: data})
}

export const getDefaultBookmarks = () => async (dispatch) => {
    try {
        let data = await defaultDashboardAPI.getDefaultBookmarks()
        dispatch(actions.setDefaultBookmarks(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const getDefaultCategories = () => async (dispatch) => {
    try {
        let data = await defaultDashboardAPI.getDefaultCategories()
        dispatch(actions.setDefaultCategories(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const addCategoryToDashboard = (id) => async (dispatch) => {
    try {
        await defaultDashboardAPI.addCategoryToDashboard(id)
        dispatch(createMessage({categoryAddedToDashboard: 'Added'}))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const addDefaultBookmarkToCategory = (data) => async (dispatch) => {
    try {
        await defaultDashboardAPI.addBookmarkToCategory(data)
        dispatch(createMessage({categoryAddedToDashboard: 'Added'}))
        return { ok: true }
    } catch (e) {
        dispatch(createError(e))
        return { ok: false }
    }
}
