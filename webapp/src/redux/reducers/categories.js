import {createError} from './error'
import {createMessage} from './message'
import {getBookmarks} from './bookmarks'
import {dashboardAPI} from '../../api/dashboard'
import {errorParser} from "../../utils";

export const UPLOAD_CATEGORY = 'CATEGORIES/UPLOAD_CATEGORY'
export const GET_CATEGORIES = 'CATEGORIES/GET_CATEGORIES'
export const GET_PRIVATE_CATEGORIES = 'CATEGORIES/GET_PRIVATE_CATEGORIES'
export const ADD_CATEGORY = 'CATEGORIES/ADD_CATEGORY'
export const DELETE_CATEGORY = 'CATEGORIES/DELETE_CATEGORY'
export const UPDATE_CATEGORY = 'CATEGORIES/UPDATE_CATEGORY'


const initialState = {
    category: [],
    privateCategories: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                category: action.payload
            }

        case GET_PRIVATE_CATEGORIES:
            return {
                ...state,
                privateCategories: action.payload
            }

        case DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter(
                    (bookmark) => bookmark !== action.payload
                )
            }

        case UPLOAD_CATEGORY:
            return {
                ...state,
                category: [...state.category, ...action.payload]
            }

        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }

        case UPDATE_CATEGORY:
            return {
                ...state,
                category: [action.payload, ...state.category.filter((category) => category.id !== action.payload.id)]
            }
        default:
            return state
    }
}


const actions = {
    setCategories: (data) => ({type: GET_CATEGORIES, payload: data}),
    deleteCategory: (id) => ({type: DELETE_CATEGORY, payload: id}),
    addCategory: (category) => ({type: ADD_CATEGORY, payload: category}),
    updateCategory: (category) => ({type: UPDATE_CATEGORY, payload: category}),
    importBookmarks: (data) => ({type: UPLOAD_CATEGORY, payload: data})
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

export const getCategories = () => async (dispatch) => {
    try {
        let data = await dashboardAPI.getCategories()
        dispatch(actions.setCategories(data))
    } catch (e) {
        dispatch(createError(e))
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    const response = await fetch(`https://www.bukmarkz.com/api/category/${id}/`, {
        method: "GET",
        headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data.id);

    try {
        // await dashboardAPI.deleteCategory(data)
        dispatch(createMessage({categoryDeleted: 'category Deleted'}))
        dispatch(actions.deleteCategory(data))
        return { ok: true }
    } catch(e) {
        dispatch(createError(e))
        return { ok: false }
    }
};

// export const deleteCategory = (id) => async (dispatch) => {
//     try {
//         await dashboardAPI.deleteCategory(id)
//         dispatch(createMessage({categoryDeleted: 'category Deleted'}))
//         dispatch(actions.deleteCategory(id))
//         return { ok: true }
//     } catch (e) {
//         dispatch(createError(e))
//         return { ok: false }
//     }

// }

export const addCategory = (body) => async (dispatch) => {
    var title = body.title;
    var user = body.user;
    var color = body.color;
    var priv = body.private;

    const response = await fetch("https://www.bukmarkz.com/api/category/", {
        method: "POST",
        headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
        body: JSON.stringify({
            title,
            user,
            color,
            priv,
        })
    });
    const data = await response.json();

    try {
        // let data = await dashboardAPI.saveCategory(body)
        dispatch(createMessage({categoryAdded: 'Category Added'}))
        dispatch(actions.addCategory(data))
        return { ok: true }
    } catch(e) {
        dispatch(createError(e))
        return { ok: false }
    }
};

export const updateCategory = (body, id) => async (dispatch) => {
    var title = body.title;
    var user = body.user;
    var color = body.color;
    var priv = body.private;

    const response = await fetch(`https://www.bukmarkz.com/api/category/${id}/`, {
        method: "POST",
        headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
        body: JSON.stringify({
            title,
            user,
            color,
            priv,
        })
    });
    const data = await response.json();

    try {
        // let data = await dashboardAPI.updateCategory(data, id)
        dispatch(createMessage({categoryUpdated: 'Category Updated'}))
        dispatch(actions.updateCategory(data, id))
        return { ok: true }
    } catch(e) {
        dispatch(createError(e))
        return { ok: false }
    }
};

// export const updateCategory = (body, id) => async (dispatch) => {
//     try {
//         let data = await dashboardAPI.updateCategory(body, id)
//         dispatch(createMessage({categoryUpdated: 'Category Updated'}))
//         dispatch(actions.updateCategory(data))
//         return { ok: true }
//     } catch (e) {
//         dispatch(createError(e))
//         return { ok: false }
//     }
// }

export const importBookmark = (body) => async (dispatch) => {
    try {
        let data = await dashboardAPI.importBookmarks(body)
        if (data === 'Can not open file') {
            dispatch(createMessage({fileNotValid: 'Can not open imported file'}))
            return { ok : false }
        } else if (data === 'too much bookmarks') {
            dispatch(createMessage({tooManyData: 'Your file contains too many categories or bookmarks. Upgrade to Premium'}))
            return { ok : false }
        } else {
            dispatch(createMessage({bookmarkUploaded: `Bookmarks Uploaded Successfully`}))
            dispatch(actions.importBookmarks(data))
            return { ok : true }
        }
    } catch (e) {
        const error = errorParser(e)
        const err = { response: { data: {importError: error.response.data }}, status: 500}
        console.log('Inside Error', err);
        dispatch(createError(err))
        return { ok : false }
    }
}
