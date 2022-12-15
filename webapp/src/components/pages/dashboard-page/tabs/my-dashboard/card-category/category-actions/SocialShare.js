import React, {useMemo} from 'react';
import s from '../CardCategory.module.scss'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from "react-share";

const SocialShare = ({
 shareUrl,
 body,
 subject
}) => {

    const [shareBody, shareSubject] = useMemo(() => {
        let share_body = '';
        let share_subject = 'Bukmarkz'
        if(body){
            for(let i = 0; i < body.length; i++)
                share_body += body[i].name + '  '+ body[i].url + '\n';
        }
        if(subject){
            share_subject = subject;
        }
        return [share_body, share_subject]
    }, [])

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>Share Bookmarks</h3>
            <div className={s.icons}>
                <EmailShareButton
                    url={shareUrl}
                    subject={shareSubject}
                    body={shareBody}
                    separator={'\n'}
                >
                    <EmailIcon round={true}/>
                </EmailShareButton>
                <FacebookShareButton url={`${shareBody}${shareUrl}`}>
                    <FacebookIcon round={true}/>
                </FacebookShareButton>
                <TelegramShareButton url={`${shareBody}${shareUrl}`}>
                    <TelegramIcon round={true}/>
                </TelegramShareButton>
                <TwitterShareButton url={`${shareBody}${shareUrl}`}>
                    <TwitterIcon round={true} />
                </TwitterShareButton>
                <WhatsappShareButton url={`${shareBody}${shareUrl}`} >
                    <WhatsappIcon round={true} />
                </WhatsappShareButton>
            </div>
        </div>
    );
};

export default SocialShare;
