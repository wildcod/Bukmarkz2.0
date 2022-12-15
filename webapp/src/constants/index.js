import BG_IMAGE1 from '../assets/img/background/b1.jpg'
import BG_IMAGE2 from '../assets/img/background/b2.jpg'
import BG_IMAGE3 from '../assets/img/background/b3.jpg'
import BG_IMAGE4 from '../assets/img/background/b4.jpg'
import BG_IMAGE5 from '../assets/img/background/b5.jpg'
import BG_IMAGE6 from '../assets/img/background/b6.jpg'
import BG_IMAGE7 from '../assets/img/background/b7.jpg'
import BG_IMAGE8 from '../assets/img/background/b8.jpg'
import BG_IMAGE9 from '../assets/img/background/b9.jpg'


// Header
export const navLinks = [
    {
        displayName: 'Home',
        key: 'home',
        link: '/'
    },
    {
        displayName: 'About company',
        key: 'about',
        link: '/about'
    },
    {
        displayName: 'Services',
        key: 'service',
        link: '/services'
    },
    // {
    //     displayName: 'Blog',
    //     link: '/blog'
    // },
    {
        displayName: 'Pricing',
        key: 'price',
        link: '/price'
    },
    {
        displayName: 'Browser Addon',
        key: 'addon',
        link: '/guide'
    }
]

export const DASHBOARD_NAV_LINKS = [
    {
        displayName: 'Main',
        link: '/main'
    },
    {
        displayName: 'My dashboard',
        link: '/'
    },
    {
        displayName: 'Privacy',
        link: '/privacy'
    },
    // {
    //     displayName: 'Offers',
    //     link: '/offers'
    // }
]

export const plansColorScheme = {
    BASIC: {
        titleColor: '#363636',
        descColor: '#ccc',
        titleBgColor: '#f2f2f2',
        textColor: '#959595',
        btnBgColor: '#ebebeb',
        btnTextColor: '#959595'
    },
    PREMIUM: {
        titleColor: '#fff',
        descColor: '#ccc',
        titleBgColor: '#363636',
        textColor: '#363636',
        btnBgColor: '#363636',
        btnTextColor: '#fff'
    },
    // {
    //     titleColor: '#fff',
    //     titleBgColor: '#a3c93a',
    //     descColor: '#fff',
    //     textColor: '#a3c93a',
    //     btnBgColor: '#a3c93a',
    //     btnTextColor: '#fff'
    // },
    // {
    //     titleColor: '#fff',
    //     titleBgColor: '#00bff3',
    //     descColor: '#fff',
    //     textColor: '#00bff3',
    //     btnBgColor: '#00bff3',
    //     btnTextColor: '#fff'
    // },
}

export const AUTH_TOKEN_COOKIE_NAME = '__HOST-BUKMARKZ_AUTH_TOKEN'

export const BG_IMAGES = [
    {
        id: 1,
        url: BG_IMAGE1,
    },
    {
        id: 2,
        url: BG_IMAGE2,
    },
    {
        id: 3,
        url: BG_IMAGE3,
    },
    {
        id: 4,
        url: BG_IMAGE4,
    },
    {
        id: 5,
        url: BG_IMAGE5,
    },
    {
        id: 6,
        url: BG_IMAGE6,
    },
    {
        id: 7,
        url: BG_IMAGE7,
    },
    {
        id: 8,
        url: BG_IMAGE8,
    },
    {
        id: 9,
        url: BG_IMAGE9,
    }
];

export const LANGUAGES = [
    {code: 'en', name: 'English'},
    {code: 'es', name: 'Espanol'},
    {code: 'fr', name: 'French'}
]

export const TESTING_URL = 'http://127.0.0.1:8000/'
export const LOCAL_URL = 'http://localhost:3000'


export const SEO_TITLE = 'Bukmarkz'
export const SEO_DESCRIPTION = "Try BUKMARKZ - An online web wallet to store and organise your bookmarks .Bookmark Manager to help manage all your bookmarks today"