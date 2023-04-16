import React, {useEffect, useState} from 'react';
import style from './SideBar.module.scss'
import close from '../../../../assets/img/close.svg'

const SideBar = ({
 children,
 onClose
 }) => {
    const [slideOutClassName, setSlideOutClassName] = useState(false)
    const closeHandler = () => {
        setSlideOutClassName(true)
        setTimeout(() => {
            onClose()
        }, [600])
    }

    useEffect(() => {
        document.body.classList.add('overflow-hide');
        return () => {
            document.body.classList.remove('overflow-hide');
        }
    }, [])

    return (
        <div className={`${style.sideBarContainer} ${slideOutClassName ? style.slideOutSideBar: ''}`}>
           <div className={style.placeholder} onClick={closeHandler}/>
           <div className={style.innerContainer}>
               <div className={style.header}>
                   <img onClick={closeHandler} src={close} width={20} height={20} alt={'close-icon'}/>
               </div>
               {children}
           </div>
        </div>
    );
};

export default SideBar;
