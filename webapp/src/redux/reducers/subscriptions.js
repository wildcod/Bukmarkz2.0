import {subscriptionAPI} from '../../api/subscription'
import {authAPI} from '../../api/authApi'
import {createSelector} from 'reselect'

export const GET_SUBSCRIPTIONS = 'SUBSCRIPTIONS/GET_SUBSCRIPTIONS'
export const GET_SUBSCRIPTION = 'SUBSCRIPTIONS/GET_SUBSCRIPTION'
export const SET_DAYS_REMAINING = 'SUBSCRIPTIONS/SET_DAYS_REMAINING'

const initialState = {
  subscriptions: [],
  subscription: null,
  daysRemaining: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload
      }
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload
      }
    default:
      return state
  }
}

const actions = {
  setSubscriptionList: (data) => ({type: GET_SUBSCRIPTIONS, payload: data}),
  setSubscription: (data) => ({type: GET_SUBSCRIPTION, payload: data}),
  setDaysRemaining: (data) => ({type: SET_DAYS_REMAINING, payload: data})
}

export const getSubscriptions = () => async (dispatch) => {
  try {
    let data = await subscriptionAPI.getSubscriptions()
    dispatch(actions.setSubscriptionList(data))
  } catch (e) {
    console.log(e)
  }
}

export const getSubscriptionDetails = (id) => async (dispatch) => {
  try {
    let data = await subscriptionAPI.getSubscriptionDetails(id)
    dispatch(actions.setSubscription(data))
  } catch (e) {
    console.log(e)
  }
}

export const getUserSubscriptionDetails = () => async (dispatch) => {
  try {
    let data = await authAPI.getUserSubscriptionDetails()
    dispatch(actions.setDaysRemaining(data))
  } catch (e) {
    console.log(e)
  }
}


const selectDomain = (state) => state.subscriptions || initialState

export const selectSubscriptions = createSelector([selectDomain], subscriptionsState => subscriptionsState.subscriptions)
