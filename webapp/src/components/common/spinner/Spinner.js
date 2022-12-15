import React from 'react';
import style from './Spinner.module.scss'

const Spinner = ({
 logo,
 white,
 size = undefined,
 transparent,
 className
}) => {
    return (
        <div
            className={`spinner-loader ${className ? className : ''} ${style.spinnerLoader} ${logo ? style.spinnerLogoInner : ''} ${
                white ? 'white' : ''
            } ${transparent ? style.transparent : ''}`}>
            <div
                className={`spinner ${style.spinner} ${white ? style.white : ''}`}
                style={{
                    width: size,
                    height: size,
                    minWidth: size,
                    minHeight: size
                }}></div>
        </div>
    );
};

export default Spinner;
