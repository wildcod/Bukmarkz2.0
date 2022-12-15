export const CREATE_MESSAGE = 'MESSAGES/CREATE_MESSAGE'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload)
        default:
            return state
    }
}

export const createMessage = (msg) => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    }
}