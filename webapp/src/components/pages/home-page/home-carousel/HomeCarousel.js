import React from 'react';
import style from './HomeCarousel.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from '../../../../assets/img/slider/slide-prev.png'
import CarouselImage1 from '../../../../assets/img/l1.jpg'
import CarouselImage2 from '../../../../assets/img/l2.jpg'
import CarouselImage3 from '../../../../assets/img/l3.jpg'
import CarouselImage4 from '../../../../assets/img/l4.jpg'
import CarouselImage5 from '../../../../assets/img/l5.jpg'
import MobileCarouselImage1 from '../../../../assets/img/m1.jpg'
import MobileCarouselImage2 from '../../../../assets/img/m2.jpg'
import MobileCarouselImage3 from '../../../../assets/img/m3.jpg'
import MobileCarouselImage4 from '../../../../assets/img/m4.jpg'
import MobileCarouselImage5 from '../../../../assets/img/m5.jpg'

const SlideArrow = (props) => {
    const { className, style, arrow, onClick } = props;
    const onArrowClick = () => {
        onClick()
    };
    return (
        <img
            alt={'banner-images'}
            className={className}
            style={{ ...style, display: "block", transform: arrow === 'left' ? 'rotate(0deg)' : 'rotate(-180deg)' }}
            onClick={() => onArrowClick()}
            src={leftArrow}
        />
    );
}


const HomeCarousel = () => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <SlideArrow arrow={'right'}/>,
        prevArrow: <SlideArrow arrow={'left'}/>,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 599,  // for mobile
                settings: {
                    arrows: false,
                    pauseOnFocus: true,
                    dots:false
                }
            }]
    };
    return (
        <Slider {...settings} className={style.sliderContainer}>
            <div
                className={style.sliderContainerOne}
            >
                <img src={CarouselImage1} className={style.desktopImage}/>
                <img src={MobileCarouselImage1} className={style.mobileImage}/>
                <div className={style.card}>
                   <h1>
                       Manage Bookmark Smartly
                   </h1>
                   <p>
                       Manage all your Bookmarks in one place. Bukmarkz
                       helps you organize
                       and keep Track of all your Bookmarks.
                   </p>
                </div>
            </div>
            <div className={style.sliderContainerOne}>
                <img src={CarouselImage2} className={style.desktopImage}/>
                <img src={MobileCarouselImage2} className={style.mobileImage}/>
                <div className={`${style.card} ${style.leftCard}`}>
                    <h1>
                        Best Finder
                    </h1>
                    <p>
                        If you need anything or you want to find something all you have to do is type in the lask now link and our team will provide you with the best possible options available on the net instantly
                    </p>
                </div>
            </div>
            <div className={style.sliderContainerOne}>
                <img src={CarouselImage3} className={style.desktopImage}/>
                <img src={MobileCarouselImage3} className={style.mobileImage}/>
                <div className={style.card}>
                    <h1>
                        Secure Bookmark
                    </h1>
                    <p>We providing you password protection on whichever bookmark you require</p>
                </div>
            </div>
            <div className={style.sliderContainerOne}>
                <img src={CarouselImage4} className={style.desktopImage}/>
                <img src={MobileCarouselImage4} className={style.mobileImage}/>
                <div className={style.card}>
                    <h1>
                        Deal Grabber Wall
                    </h1>
                    <p>You will find suggestions of sever a bookmarks that may be of interest to you and of the latest deals available in most of the widely popular online sites
                    </p>
                </div>
            </div>
            <div className={style.sliderContainerOne}>
                <img src={CarouselImage5} className={style.desktopImage}/>
                <img src={MobileCarouselImage5} className={style.mobileImage}/>
                <div className={style.card}>
                    <h1>
                        Like the Product
                    </h1>
                    <p>
                        Earn 50% of the subscription fee
                        for every new subscriber you bring in via your
                        recommendation
                    </p>
                </div>
            </div>
            {/*<div className={style.sliderContainerOne}>*/}
            {/*    <img src={CarouselImage5}/>*/}
            {/*</div>*/}
        </Slider>
    );
};

export default HomeCarousel;
