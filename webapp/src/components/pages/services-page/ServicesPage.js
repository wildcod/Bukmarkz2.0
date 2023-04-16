import React, {useEffect} from 'react';
import s from './ServicesPage.module.scss'
import Banner from "../../common/banner/Banner";
import heartImage from "../../../assets/img/heart-white.png";
import leafImage from "../../../assets/img/leaf-white.png";
import moneyImage from "../../../assets/img/money-bag-white.png";
import {scrollToTop} from "../../../utils";

const ServicesPage = () => {
    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <div className={s.servicesPage}>
            <Banner title={'Our Services'}/>
            <div className={s.main}>
                <div className={s.heading}>
                    <h2>What we can offer you</h2>
                    <p>
                        We believe in providing long-lasting online bookmark services. The sole
                        purpose of creating bukmarkz is to improve productivity while working online
                    </p>
                </div>
                <div className={s.services}>
                    {
                        cards.map((card) => (
                            <div className={s.card}>
                                <div className={s.top}>
                                    <div>
                                        <img width={30} height={30} src={card.imageUrl} alt={'service-images'}/>
                                    </div>
                                </div>
                                <div className={s.bottom}>
                                    <h5>{card.title}</h5>
                                    <p>{card.desc}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;


const cards = [
    {
        imageUrl: heartImage,
        title: 'Manage Bookmarks',
        desc: 'Best place to save all your favorite bookmarks'
    },
    {
        imageUrl: leafImage,
        title: 'Categorize Bookmarks',
        desc: 'Categorize all your bookmarks according to your preferences'
    },
    {
        imageUrl: moneyImage,
        title: 'Universal Access',
        desc: 'Now access all your bookmarks from any device whether it\'s iOS, Android, or Windows setups.'
    },
    {
        imageUrl: heartImage,
        title: 'Nominal Fee',
        desc: 'A free bookmark manager that can be upgraded for premium features.'
    },
    {
        imageUrl: leafImage,
        title: 'Wish Maker',
        desc: 'If you need anything all you have to do is type in the \'ask now\'. We will provide you with the best possible options available on the net instantly.'
    },
    {
        imageUrl: moneyImage,
        title: 'Bookmark And Earn',
        desc: 'Earn 50% of the subscription fee for every new subscriber, you bring in via your recommendation'
    }
]
