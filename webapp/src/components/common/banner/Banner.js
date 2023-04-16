import React from 'react';
import style from "./Banner.module.scss";

const Banner = ({title}) => {
    return (
        <div className={style.banner}>
            <h1>{title}</h1>
        </div>
    );
};

export default Banner;