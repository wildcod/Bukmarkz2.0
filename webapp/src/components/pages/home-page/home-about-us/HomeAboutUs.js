import React from 'react';
import style from './HomeAboutUs.module.scss'
import Button from "../../../common/button/Button";

const HomeAboutUs = () => {
    return (
        <div className={style.homeAboutUs}>
           <div className={style.innerContainer}>
               <div className={style.card}>
                  <h2>
                      Who We Are & What We Do
                  </h2>
                   <div className={style.description}>
                       <h5>
                           BukMarkz! A free online bookmark organiser that allows you
                           to organise and track all of your bookmarks from one place.
                       </h5>
                       <p>
                           You can keep rocords of practically anything and everything
                           on the cloud, whether it's your favourite book, a restaurant you want to visit,
                           or a potential career you want to try. Bukmarkz allows you to access
                           everything from any electronic device, including your computer, tablet, or
                           phone, without the need to synchronize.
                           Furthermore, this bookmarking systom makes recommendations depending on
                           your choices. As a result, you may continuously learn about similar
                           destinations, opportunities, or items that are available online and may be of
                           interest to you.
                       </p>
                   </div>
                   <div className={style.readMore}>
                       <Button
                         label={'Read More >'}
                       />
                   </div>
               </div>
           </div>
        </div>
    );
};

export default HomeAboutUs;
