import React, {useEffect} from 'react'
import HomePage from "./components/pages/home-page/HomePage";
import Layout from "./components/common/layout/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PricePage from "./components/pages/price-page/PricePage";
import AboutPage from "./components/pages/about-page/AboutPage";
import ServicesPage from "./components/pages/services-page/ServicesPage";
import BlogPage from "./components/pages/blog-page/BlogPage";
import ContactPage from "./components/pages/contact-page/ContactPage";
import DashboardPage from "./components/pages/dashboard-page/Dashboard";
import ProfilePage from "./components/pages/profile-page/ProfilePage";
import {initializeApp} from './redux/reducers/appReducer'
import {connect, useDispatch} from 'react-redux'
import {compose} from 'redux'
import Alerts from '../src/components/common/alerts/Alerts'
import {Provider as AlertProvider, positions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Spinner from "./components/common/spinner/Spinner";
import BookmarkExtensionPage from "./components/pages/bookmark-extension-page/BookmarkExtensionPage";
import BookmarkGuide from "./components/pages/bookmark-guide/BookmarkGuide";
import ProtectedRoute from "./components/common/protected-route/ProtectedRoute";
import {Helmet} from "react-helmet";
import { SEO_DESCRIPTION, SEO_TITLE } from './constants';

const alertOptions = {
    timeout: 5000,
    position: 'top right',
    containerStyle: {
        zIndex: 100000
    }
}

function App({ initializeApp,initialized, auth }) {
  useEffect(() => {
      initializeApp()
  }, [])

  if(!initialized){
      return <Spinner />
  }

  return (
   <Router>
       <div className="App">
           <AlertProvider template={AlertTemplate} {...alertOptions}>
               <Layout>
               <Helmet>
                    <title>{SEO_TITLE}</title>
                    <meta name="description" content={SEO_DESCRIPTION} />
                </Helmet>
                   <Alerts />
                   <Switch>
                       <Route exact path={["/", "/password/reset/confirm/:uidb64/:token/"]}><HomePage /></Route>
                       <Route path={'/price'}><PricePage /></Route>
                       <Route path={'/about'}><AboutPage /></Route>
                       <Route path={'/services'}><ServicesPage/></Route>
                       <Route path={'/blog'}><BlogPage /></Route>
                       <Route path={'/contact'}><ContactPage /></Route>
                       <ProtectedRoute path={'/dashboard'} component={DashboardPage} loggedIn={auth.isAuthenticated} auth={auth} />
                       <Route path={'/profile'}><ProfilePage /></Route>
                       <Route path={'/extension'}><BookmarkExtensionPage /></Route>
                       <Route path={'/guide'}><BookmarkGuide /></Route>
                   </Switch>
               </Layout>
           </AlertProvider>
       </div>
   </Router>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, {initializeApp})
)(App)
