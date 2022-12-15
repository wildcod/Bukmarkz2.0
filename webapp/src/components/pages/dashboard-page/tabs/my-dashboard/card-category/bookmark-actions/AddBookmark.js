import React, {useState} from 'react';
import s from "../CardCategory.module.scss";
import Button from "../../../../../../common/button/Button";

const AddBookmark = ({
     addBookmark,
     onClose,
     catId
 }) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [desc, setDesc] = useState('')

    const onSubmit = (e) => {
        alert("asdasd");
        e.preventDefault()
        const data = {
            name,
            url,
            description: desc,
            category: catId
        }
        console.log('Data', data);
        addBookmark(data)
            .then((res) => {
                res.ok && onClose()
            })
    }

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>Add Bookmark</h3>
            <form className={s.modalBody} onSubmit={onSubmit}>
                <div className={s.inputContainer}>
                    <label>Name</label>
                    <input
                        type={'text'}
                        placeholder={'Name'}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Url</label>
                    <input
                        type={'text'}
                        placeholder={'Url'}
                        required
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Description</label>
                    <input
                        type={'text'}
                        placeholder={'Description'}
                        required
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={s.btnContainer}>
                    <Button
                        label={'Save'}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddBookmark;