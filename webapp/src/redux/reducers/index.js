import {combineReducers} from 'redux'
import AuthReducer from './auth'
import ErrorReducer from './error'
import MessageReducer from './message'
import LoadingReducer from './loading'
import AppReducer from './appReducer'
import BookmarksReducer from './bookmarks'
import SubscriptionsReducer from './subscriptions'
import CategoriesReducer from './categories'
import defaultDashboardReducer from './defaultDashboard'
import privateDashboardReducer from './privateDashboard'
import referralsReducer from './referrals'
import userHelpReducer from './userHelp'
import recommendationsReducer from './recommendations'
import offersReducer from './offers'

export default combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  messages: MessageReducer,
  loading: LoadingReducer,
  app: AppReducer,
  bookmarks: BookmarksReducer,
  subscriptions: SubscriptionsReducer,
  categories: CategoriesReducer,
  defaultDashboard: defaultDashboardReducer,
  privateDashboard: privateDashboardReducer,
  referrals: referralsReducer,
  userHelp: userHelpReducer,
  recommendations: recommendationsReducer,
  offers: offersReducer
})
