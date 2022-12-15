import React from 'react';
import {FaEnvelope, FaTag, FaUser} from "react-icons/fa";
import s from './Profile.module.scss'
import {BG_IMAGES} from "../../../../../constants";
import {compose} from "redux";
import {connect} from "react-redux";
import {setBgImage} from "../../../../../redux/reducers/auth";
import { useAlert } from 'react-alert'

const Profile = ({
 user,
 daysRemaining,
 setBgImage
}) => {
    const alert = useAlert()
    const setBackgroundImage = (imgUrl) => {
        localStorage.setItem("backgroundImage", imgUrl);
        setBgImage(imgUrl);
        alert.show('Background Image Set!')
    };

    return (
        <div className={s.container}>
             <div className={s.form}>
                <div className={s.input}>
                   <span>Username:</span>
                    <div>
                        <div className={s.icon}>
                            <FaUser/>
                        </div>
                        <div className={s.text}>
                            {user.username}
                        </div>
                    </div>
                </div>
                 <div className={s.input}>
                     <span>Email:</span>
                     <div>
                         <div className={s.icon}>
                             <FaEnvelope/>
                         </div>
                         <div className={s.text}>
                             {user.email}
                         </div>
                     </div>
                 </div>
                 <div className={s.input}>
                     <span>Subscription:</span>
                     <div>
                         <div className={s.icon}>
                             <FaTag/>
                         </div>
                         <div className={s.text}>
                             {
                                 user.is_subscribed ? 'Premium' : 'Basic'
                             }
                         </div>
                     </div>
                 </div>
             </div>
             <div className={s.images}>
                <p>Choose Dashboard Background</p>
                <div className={s.grid}>
                    {BG_IMAGES.map((image) => (
                        <img
                            key={image.id}
                            width={120}
                            height={120}
                            onClick={() => setBackgroundImage(image.url)}
                            src={image.url}
                            alt="background images"
                        />
                    ))}
                </div>
             </div>
        </div>
    );
};

export default compose(
    connect(null, {
        setBgImage
    })
)(Profile)
