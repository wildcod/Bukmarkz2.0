import React, {useState} from 'react';
import s from "../card-category/CardCategory.module.scss";
import Button from "../../../../../common/button/Button";
const DEFAULT_COLOR = '#000000'

const AddCategory = ({
auth,
isPrivate,
addCategory,
closeModal
}) => {
    const [title, setTitle] = useState('')
    const [color, setColor] = useState(DEFAULT_COLOR)
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: isPrivate ? `${title} - Private` : title,
            user: auth.id,
            color,
            private: isPrivate
        }
        addCategory(data)
            .then((res) => {
                res.ok && closeModal()
            })
    }

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>Add Category</h3>
            <form className={s.modalBody} onSubmit={onSubmit}>
                <div className={s.inputContainer}>
                    <label>Title</label>
                    <input
                        type={'text'}
                        required
                        placeholder={'Title'}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={s.inputContainer}>
                    <label>Color</label>
                    <input
                        type={'color'}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className={s.btnContainer}>
                    <Button label={'Save'} type={'submit'} />
                </div>
            </form>
        </div>
    );
};

export default AddCategory;