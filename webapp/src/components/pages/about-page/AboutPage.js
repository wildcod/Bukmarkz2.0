import React, {useEffect} from 'react';
import s from './AboutPage.module.scss'
import Banner from "../../common/banner/Banner";
import {scrollToTop} from "../../../utils";
import MobileCarouselImage5 from '../../../assets/img/m5.jpg'

const AboutPage = () => {
    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <div className={s.aboutUsPage}>
            <Banner title={'About Our Company'}/>
            <div className={s.main}>
                <div className={s.heading}>
                    <h2>History of Founding of Our Company</h2>
                    <p>
                        I never thought of starting a company like bukmarkz. The story behind the creation of the bukmarkz is also very interesting.
                        It was a peaceful morning when I received word from a good friend that he had misplaced his laptop, and the concern on his face was heartbreaking.
                    </p>
                </div>
                <div className={s.body}>
                    <div className={s.left}>
                        <img src={MobileCarouselImage5}/>
                    </div>
                    <div className={s.right}>
                        {/*<h4>Claritas Processus Dynamicus</h4>*/}
                        <p>
                            He had lost all of his data as well as all of his bookmarks. After a few days, I received an identical message from my sister, who informed me that she had also misplaced her laptop.
                            One day I was sitting with my friend. He was copying bookmarks from one browser to another browser. So I thought, what if we have the option to save all bookmarks in one place, so? All these incidences inspired me to create bukmarkz
                            The main idea was not to make money but to solve the problem of mismanaging bookmarks.
                        </p>
                        <p>
                            So, after all of this, I decided to start a bookmarking company. Our objective is to help teams and individuals manage their bookmarks more effectively. We aim to rekindle a love of collecting!
                            Furthermore, our bookmarking tool makes recommendations depending on your likes. As a result, you may constantly learn about similar destinations, activities, or goods accessible online and may be interesting to you.
                        </p>
                        <div className={s.highlight}>
                            <p>
                                I devised a lightning-fast and straightforward solution that requires no plugins and is future-proof (it works in any browser)
                            </p>
                        </div>
                        <p>
                            Our skilled and knowledgeable developers tried to make the bukmarkz dashboard user-friendly that's why bukmarkz comes with a user-friendly interface and functionalities such as drag-and-drop technology, a brilliant search engine, fast access to commonly used bookmarks, a tagging system to organize and make it easier to find them, and ample storage space that users can use to save as many bookmarks as possible.
                            I hope you have as much fun using this bookmark as I did create it.
                        </p>
                    </div>
                </div>
                <div className={s.gridContainer}>
                    <div className={s.item}>
                        <h3>Who We Are?</h3>
                        <p>
                            bukmarkz is created to help people to manage their bookmarks more effectively, efficiently, and professionally without any hassle.                        </p>
                    </div>
                    <div className={s.item}>
                        <h3>What We Do?</h3>
                        <p>
                            we save the most precious thing in human being life called "time"
                        </p>
                    </div>
                    <div className={s.item}>
                        <h3>How We Do It?</h3>
                        <p>
                            we save your time by giving one of the unique platforms where you can manage all your bookmark in one place
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
