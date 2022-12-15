import {createMessage} from './message'
import {createError} from './error'
import {offersAPI} from '../../api/offers'
import {defaultDashboardAPI} from '../../api/defaultDashboard'
import {createSelector} from 'reselect'

export const GET_OFFERS = 'OFFERS/GET_OFFERS'


const initialState = {
  offers: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload
      }
    default:
      return state
  }
}


const actions = {
  setOffers: (data) => ({type: GET_OFFERS, payload: data})
}

export const getOffers = () => async (dispatch) => {
  try {
    let data = await offersAPI.getOffers()
    dispatch(actions.setOffers(data))
  } catch (e) {
    dispatch(createError(e))
  }
}

export const addOfferToCategory = (data) => async (dispatch) => {
  try {
    await defaultDashboardAPI.addBookmarkToCategory(data)
    dispatch(createMessage('Added.'))
  } catch (e) {
    dispatch(createError(e))
  }
}

const selectDomain = (state) => state.offers || initialState

export const selectOffers = createSelector([selectDomain], offersState => offersState.offers)
