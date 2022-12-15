import React, {useCallback, useEffect, useMemo} from 'react';
import s from './ProfilePage.module.scss'
import {Link, useLocation, withRouter} from "react-router-dom";
import Profile from "./tabs/profile/Profile";
import Statistics from "./tabs/statistics/Statistics";
import Referrals from "./tabs/referrals/Referrals";
import { connect } from 'react-redux'
import { getReferral } from '../../../redux/reducers/referrals'
import { getCategories } from '../../../redux/reducers/categories'
import { getBookmarks } from '../../../redux/reducers/bookmarks'
import { getUserSubscriptionDetails } from '../../../redux/reducers/subscriptions'
import {scrollToTop} from "../../../utils";
const SECONDS_IN_DAY = 86400

const ProfilePage = ({
 categories,
 auth,
 bookmarks,
 daysRemaining:remainingDays,
 referral,
 getReferral,
 getBookmarks,
 getCategories,
 getUserSubscriptionDetails
}) => {
    const location = useLocation()
    const tab = location?.search?.split('=')[1]
    const daysRemaining = useMemo(() => {
      return Math.ceil(remainingDays / SECONDS_IN_DAY)
    }, [remainingDays])

    const getComponent = useCallback((tab) => {
        switch (tab){
            case 'referrals' :
                return <Referrals
                          referral={referral}
                       />
            case 'statistics' :
                return <Statistics
                         categories={categories}
                         bookmarks={bookmarks}
                        />
            default:
                return <Profile
                        daysRemaining={daysRemaining}
                        user={auth.user}
                       />
        }
    }, [location, referral, categories, bookmarks, daysRemaining, auth])

    useEffect(() => {
        getReferral()
        getBookmarks()
        getCategories()
        getUserSubscriptionDetails()
    }, [])


    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div className={s.wrapper}>
             <div className={s.container}>
                 <div className={s.header}>
                    <h3>Profile</h3>
                 </div>
                 <div className={s.body}>
                     <div className={s.sidebar}>
                         <ul>
                             {
                                 sidebarLinks.map(link => (
                                   <Link to={`/profile?tab=${link.tab}`}>
                                       <li key={link.tab} className={tab === link.tab ? s.active : ''}>
                                           {link.displayText}
                                       </li>
                                   </Link>
                                 ))
                             }
                         </ul>
                     </div>
                     <div className={s.main}>
                         {getComponent(tab)}
                     </div>
                 </div>
             </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    referral: state.referrals.referral,
    categories: state.categories.category,
    bookmarks: state.bookmarks.bookmarks,
    daysRemaining: state.subscriptions.daysRemaining
})

export default connect(mapStateToProps, {
    getReferral,
    getCategories,
    getBookmarks,
    getUserSubscriptionDetails
})(ProfilePage)

const sidebarLinks = [
    {
        displayText: 'Details',
        tab: 'profile'
    },
    {
        displayText: 'My Referrals',
        tab: 'referrals'
    },
    {
        displayText: 'Dashboard Stats',
        tab: 'statistics'
    }
]
