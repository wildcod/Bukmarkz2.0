import React, {useCallback} from 'react';
import s from "../Privacy.module.scss";
import Button from "../../../../../common/button/Button";
import {useHistory} from "react-router-dom";
import ReactCodeInput from 'react-code-input'
import {getOTP, postOTP, setAccessStatus} from "../../../../../../redux/reducers/privateDashboard";


const EmailOtp = ({
    validated,
    requestOTP,
    otp,
    show,
    handleClose,
    handleInput,
    getOTP,
    postOTP
}) => {
    const history = useHistory()

    const onCancel = useCallback(() => {
        history.push('/dashboard?tab=main')
    }, [])

    return (
        <div className={s.emailOtp}>
            <h4>Email Verification</h4>
            <div className={s.body}>
                {
                    !requestOTP ?
                        <div className={s.codeBtn}>
                            <Button
                                label={'GET CODE'}
                                onClick={() => getOTP()}
                                small={true}
                            />
                        </div> :
                        <div className={s.codeWrapper}>
                            <p>
                                Check your email and enter the code:
                            </p>
                            <ReactCodeInput
                                name={'otp'}
                                inputMode={'text'}
                                onChange={handleInput}
                                value={otp}
                                fields={6}/>
                            <p id={s.note}>Enter 6 chars password from your email</p>
                        </div>
                }
            </div>
            <div className={s.footer}>
                {
                    requestOTP ?
                        <div className={s.btn}>
                            <Button
                                onClick={() => postOTP(otp)}
                                label={'SUBMIT'}
                                small={true}
                            />
                        </div> : null
                }
                <div className={s.btn}>
                    <Button
                        onClick={onCancel}
                        label={'CANCEL'}
                        small={true}
                        className={'danger'}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmailOtp;
