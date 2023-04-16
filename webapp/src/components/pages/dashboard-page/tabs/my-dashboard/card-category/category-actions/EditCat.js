import React, {useState} from 'react';
import s from '../CardCategory.module.scss'
import Button from "../../../../../../common/button/Button";

const EditCat = ({
 auth,
 category,
 isPrivate,
 updateCategory,
 onClose
}) => {
    const [title, setTitle] = useState(category.title)
    const [color, setColor] = useState(category.color)
    console.log('auth', auth)
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            title,
            user: auth.id,
            color,
            private: isPrivate
        }
        updateCategory(data, category.id)
            .then((res) => {
                res.ok && onClose()
            })
    }

    return (
        <div className={s.editCatContainer}>
            <h3 className={s.modalHeader}>Edit Category</h3>
            <form className={s.modalBody} onSubmit={onSubmit}>
               <div className={s.inputContainer}>
                   <label>Title</label>
                   <input
                       type={'text'}
                       placeholder={'Title'}
                       required
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                   />
               </div>
                <div className={s.inputContainer}>
                    <label>Color</label>
                    <input
                        type={'color'}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className={s.btnContainer}>
                    <Button label={'Update'} />
                </div>
            </form>
        </div>
    );
};

export default EditCat;