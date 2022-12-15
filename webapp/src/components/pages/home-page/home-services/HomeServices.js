import React from 'react';
import style from './HomeServices.module.scss';
import BookmarkAddIcon from '../../../../../node_modules/@mui/icons-material/BookmarkAdd';
import FormatListBulletedIcon from "../../../../../node_modules/@material-ui/icons/FormatListBulleted";
import DevicesIcon from "../../../../../node_modules/@material-ui/icons/Devices";
import AttachMoneyIcon from "../../../../../node_modules/@material-ui/icons/AttachMoney";
import ArrowUpwardOutlinedIcon from "../../../../../node_modules/@material-ui/icons/ArrowUpwardOutlined";
import ContactSupportIcon from "../../../../../node_modules/@material-ui/icons/ContactSupport";
import TranslateIcon from "../../../../../node_modules/@material-ui/icons/Translate";
import LanguageIcon from "../../../../../node_modules/@material-ui/icons/Language";
import SupportAgentIcon from '../../../../../node_modules/@mui/icons-material/SupportAgent';
// import heartImage from '../../../../assets/img/heart-white.png'
// import leafImage from '../../../../assets/img/leaf-white.png'
// import moneyImage from '../../../../assets/img/money-bag-white.png'

const HomeServices = () => {
    return (
        <div className={style.homeServices} id={'bukmarkz-home-services'}>
           <h2>We provide services</h2>
            <p>
                We have tried to give a premium quality at the most
                affordable price, as our motto is to serve the best
            </p>
            <div className={style.gridContainer}>
                {
                    cards.map((card) => (
                        <div className={style.card}>
                            <div className={style.left}>
                                <div>
                                    {/* <img width={30} height={30} src={card.imageUrl} alt={'service-images'}/> */}
                                    { card.icon }
                                </div>
                            </div>
                            <div className={style.right}>
                                <h5>{card.title}</h5>
                                <p>{card.desc}</p>
                                <a href={'/'}>
                                    <span>Learn More...</span>
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomeServices;


const cards = [
    {
        icon: <BookmarkAddIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: heartImage,
        title: 'Manage Bookmarks',
        desc: 'Best place to save all your favorite bookmarks'
    },
    {
        icon: <FormatListBulletedIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: leafImage,
        title: 'Categorize Bookmarks',
        desc: 'Categorize all your bookmarks according to your preferences'
    },
    {
        icon: <DevicesIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: heartImage,
        title: 'Universal Access',
        desc: 'Now access all your bookmarks from any device whether it\'s iOS, Android, or Windows setups.'
    },
    {
        icon: <ArrowUpwardOutlinedIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: moneyImage,
        title: 'Nominal Fee',
        desc: 'A free bookmark manager that can be upgraded for premium features.'
    },
    {
        icon: <ContactSupportIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: leafImage,
        title: 'Wish Maker',
        desc: 'If you need anything all you have to do is type in the \'ask now\'. We will provide you with the best possible options available on the net instantly.'
    },
    {
        icon: <AttachMoneyIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: moneyImage,
        title: 'Bookmark And Earn',
        desc: 'Earn 50% of the subscription fee for every new subscriber, you bring in via your recommendation'
    },
    {
        icon: <TranslateIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: heartImage,
        title: 'Multiple Language',
        desc: 'Bukmarkz is available in three different languages: English, French, and Spanish. More will be added in future'
    },
    {
        icon: <LanguageIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: leafImage,
        title: 'Global Access',
        desc: 'Bookmark manager is viewable from any device and browser anywhere in the world.'
    },
    {
        icon: <SupportAgentIcon style={{fill: '#fff', fontSize: '30px'}} />,
        // imageUrl: leafImage,
        title: '24*7 Support',
        desc: 'We have dedicated support team to help you'
    }
]
