import React from 'react';
import style from './Button.module.scss'
import ClipLoader from "react-spinners/ClipLoader";

const Button = ({
label,
className,
isLoading,
disabled,
small,
...rest
}) => {
    return (
        <button
            disabled={isLoading ? isLoading : false}
            {...rest}
            className={
                `${style.buttonContainer}
                 ${className ? style[className] : ''}
                  ${isLoading ? style.loading : ''}
                  ${small ? style.small: ''}
                  `}>
            {
                isLoading ?
                    <ClipLoader color={'white'} loading={isLoading} size={22} /> : label
            }
        </button>
    );
};

export default Button;
