import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share'
import s from './Referrals.module.scss'
import {FaHandHoldingUsd, FaUsers} from 'react-icons/fa'
import Clipboard from 'react-clipboard.js';

const Referrals = ({
 referral
}) => {
    const shareUrl = `${process.env.REACT_APP_REF_URL}?ref=${referral?.[0]?.token}`
    return (
        <div className={s.container}>
           <div className={s.header}>
               <h5>Your invite link:</h5>
               <p>(Click on the link to copy)</p>
           </div>
            <Clipboard
                className={s.refCopy}
                data-clipboard-text={shareUrl}>
                   {shareUrl}
            </Clipboard>
            <div className={s.share}>
                <p>Share on your social media</p>
                <div className={s.icons}>
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon round={true} size={50}/>
                    </EmailShareButton>
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon round={true} size={50}/>
                    </FacebookShareButton>
                    <TelegramShareButton url={shareUrl}>
                        <TelegramIcon round={true} size={50}/>
                    </TelegramShareButton>
                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon round={true} size={50}/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon round={true} size={50}/>
                    </WhatsappShareButton>
                    <div className={s.emailContact}>
                        <button>
                            GMAIL CONTACTS <FaUsers/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={s.stats}>
               <h5>You referral statistics:</h5>
               <div className={s.grid}>
                  <div className={s.item}>
                      <span>{referral?.[0]?.registrations}</span>
                      <p>Friends registered</p>
                  </div>
                   <div className={s.item}>
                       <span>{referral?.[0]?.subs}</span>
                       <p>Friends Subbed</p>
                   </div>
                   <div className={s.item}>
                       <span>{referral?.[0]?.wallet}</span>
                       <p>Wallet</p>
                   </div>
               </div>
            </div>
            <div className={s.guide}>
                <h3>Guide:</h3>
                <p>
                    Our referral program is for the premium subscribers. You get to earn 50% of the subscription fee for every new subscriber you bring in via your recommendation. A minimum of two referrals is compulsory to withdraw your earnings.
                </p>
            </div>
        </div>
    );
};

export default Referrals;
