import React, {useCallback, useEffect, useMemo} from 'react';
import s from './Dashboard.module.scss'
import {Link, useHistory, useLocation} from "react-router-dom";
import {DASHBOARD_NAV_LINKS} from "../../../constants";
import { MyDashboard, Offers, Main, Privacy } from './tabs'

const Dashboard = ({auth}) => {
    const location = useLocation()
    const history = useHistory()

    const getTab = useCallback(() => {
        const tab = location?.search?.split('=')[1]
        switch (tab){
            case 'main' :
                return <Main />
            case 'privacy' :
                return <Privacy />
            case 'offers' :
                return <Offers />
            default :
                return <MyDashboard isPrivate={false}/>
        }
    }, [location])

    const activeTab = useMemo(() => {
        const tab = location?.search?.split('=')[1]
        if(!tab) return '/'
        else return `/${tab}`
    }, [location])

    useEffect(() => {
        if(!auth || !auth.isAuthenticated){
            history.push('/')
        }
    }, [auth])
    console.log('Auth', auth)
    return (
        <div
            className={s.dashBoardWrapper}
            style={{ background: `url(${auth.backgroundPreferredImageUrl}) fixed` }}
        >
            <div className={s.navBar}>
                <ul>
                    {
                        DASHBOARD_NAV_LINKS.map(nav => (
                            <li
                                key={nav.link}
                                className={activeTab === nav.link ? s.active : ''}
                            >
                                <Link to={`/dashboard${nav.link === '/' ? '' : `?tab=${nav.link.slice(1)}`}`}>
                                    {nav.displayName}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <span>
                        {
                            auth?.user?.is_subscribed ? 'Premium Account' : 'Basic Account'
                        }
                    </span>
                </div>
            </div>
            <div className={s.container}>{getTab()}</div>
        </div>
    );
};

export default Dashboard;
