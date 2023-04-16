import React, {useState} from 'react';
import s from "../../card-category/CardCategory.module.scss";
import Button from "../../../../../../common/button/Button";
import {connect} from 'react-redux'
import { useAlert } from "react-alert";
import {addAid, deleteAid, getAids} from "../../../../../../../redux/reducers/userHelp";

const SearchModal = ({
 closeModal,
 auth,
 addAid
 }) => {
    const [searchingText, setSearchingText] = useState('')
    const [price, setPrice] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState('')
    const alert = useAlert()

    const onSubmit = (e) => {
        e.preventDefault()
        addAid({
            searching: searchingText,
            zip,
            country,
            price,
            user: auth.id
        }).then(() => {
            closeModal && closeModal()
            alert.show('Your Query Added!')
        })
    }

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>What are you searching?</h3>
            <form className={s.modalBody} onSubmit={onSubmit}>
                <div className={s.inputContainer}>
                    <label>Searching</label>
                    <input
                        type={'text'}
                        required
                        value={searchingText}
                        placeholder={'searching'}
                        onChange={(e) => setSearchingText(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Price</label>
                    <input
                        type={'text'}
                        required
                        value={price}
                        placeholder={'price'}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Country</label>
                    <input
                        type={'text'}
                        required
                        value={country}
                        placeholder={'country'}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Zip</label>
                    <input
                        type={'text'}
                        required
                        value={zip}
                        placeholder={'zip'}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </div>
                <div className={s.btnContainer}>
                    <Button label={'Submit'} type={'submit'} />
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth.user,
    aids: state.userHelp.aids
})

export default connect(mapStateToProps, {
    getAids,
    deleteAid,
    addAid
})(SearchModal)
