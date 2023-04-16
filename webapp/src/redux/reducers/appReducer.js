import {loadUser} from './auth'
// import {getSubscriptions} from '../subscription/subscriptionReducer'

export const INITIALIZED_SUCCESS = 'network/app/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => async (dispatch) => {
    let promise = dispatch(loadUser())
    // let promise2 = dispatch(getSubscriptions())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer