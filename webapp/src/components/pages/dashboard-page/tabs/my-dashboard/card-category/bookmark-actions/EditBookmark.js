import React, {useState} from 'react';
import s from "../CardCategory.module.scss";
import Button from "../../../../../../common/button/Button";

const EditBookmark = ({
  bookmark,
  updateBookmark,
  onClose,
  categoryId
}) => {
    const [name, setName] = useState(bookmark.name)
    const [url, setUrl] = useState(bookmark.url)
    const [desc, setDesc] = useState(bookmark.description)


    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name,
            url,
            description: desc,
            category: categoryId,
        };
        updateBookmark(data, bookmark.id)
            .then((res) => {
                res.ok && onClose()
            })
    }

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>Edit Bookmark</h3>
            <form className={s.modalBody} onSubmit={onSubmit}>
                <div className={s.inputContainer}>
                    <label>Name</label>
                    <input
                        type={'text'}
                        value={name}
                        placeholder={'Name'}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Url</label>
                    <input
                        type={'text'}
                        value={url}
                        placeholder={'Url'}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Description</label>
                    <input
                        type={'text'}
                        value={desc}
                        placeholder={'Description'}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={s.btnContainer}>
                    <Button label={'Update'} />
                </div>
            </form>
        </div>
    );
};

export default EditBookmark;