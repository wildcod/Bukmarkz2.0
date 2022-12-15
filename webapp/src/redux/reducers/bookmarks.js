import {createError} from './error'
import {createMessage} from './message'
import {dashboardAPI} from '../../api/dashboard'

export const GET_BOOKMARKS = 'BOOKMARKS/GET_BOOKMARKS'
export const ADD_BOOKMARK = 'BOOKMARKS/ADD_BOOKMARK'
export const DELETE_BOOKMARK = 'BOOKMARKS/DELETE_BOOKMARK'
export const UPDATE_BOOKMARK = 'BOOKMARKS/UPDATE_BOOKMARK'

const initialState = {
    bookmarks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.payload
            }
        case DELETE_BOOKMARK:
            return {
                ...state,
                bookmarks: state.bookmarks.filter(
                    (bookmark) => bookmark.id !== action.payload
                )
            }
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload]
            }
        case UPDATE_BOOKMARK:
            return {
                ...state,
                bookmarks: [
                    action.payload,
                    ...state.bookmarks.filter(
                        (bookmark) => bookmark.id !== action.payload.id
                    )
                ]
            }
        default:
            return state
    }
}


const actions = {
    setBookmarks: (data) => ({type: GET_BOOKMARKS, payload: data}),
    deleteBookmark: (id) => ({type: DELETE_BOOKMARK, payload: id}),
    addBookmark: (bookmark) => ({type: ADD_BOOKMARK, payload: bookmark}),
    updateBookmark: (data) => ({type: UPDATE_BOOKMARK, payload: data})
}

export const getBookmarks = () => async (dispatch) => {
    try {
        let data = await dashboardAPI.getBookmarks()
        dispatch(actions.setBookmarks(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const deleteBookmark = (id) => async (dispatch) => {
    try {
        await dashboardAPI.deleteBookmark(id)
        dispatch(actions.deleteBookmark(id))
        dispatch(createMessage({bookmarkDeleted: 'Bookmark Deleted'}))
        return { ok: true }
    } catch (e) {
        dispatch(createError(e))
        return { ok: false }
    }
}

export const addBookmark = (body) => async (dispatch) => {
    try {
        let data = await dashboardAPI.saveBookmark(body)
        dispatch(createMessage({bookmarkAdded: 'Bookmark Added'}))
        dispatch(actions.addBookmark(data))
        return { ok: true }
    } catch (e) {
        dispatch(createError(e))
        return { ok: false }
    }
}

export const updateBookmark = (body, id) => async (dispatch) => {
    try {
        let data = await dashboardAPI.updateBookmark(body, id)
        dispatch(createMessage({bookmarkUpdated: 'Bookmark Updated'}))
        dispatch(actions.updateBookmark(data))
        return { ok: true }
    } catch (e) {
        dispatch(createError(e))
        return { ok: false }
    }
}

export const importBookmarkFromExtension = (body) => async (dispatch) => {
    try {
        await dashboardAPI.addBookmarkFromExtension(body)
        window.close()
    } catch (e) {
        dispatch(createMessage({chooseCategory: 'Choose category'}))
    }

}
