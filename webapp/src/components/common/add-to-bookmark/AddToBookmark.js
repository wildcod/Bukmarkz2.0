import React, {useMemo, useState} from 'react';
import s from "./AddToBookmark.module.scss";
import Button from "../button/Button";
import { useAlert} from "react-alert";

const AddToBookmark = ({
 handler,
 bookmark,
 categories,
 onClose
}) => {
    const [selectedCatId, setSelectedCatId] = useState(null)
    const alert = useAlert()

    const addToCategory = () => {
        console.log('selectedCatId', selectedCatId)
        if(selectedCatId){
            handler({
                category: selectedCatId,
                name: bookmark.name || bookmark.title,
                url: bookmark.url,
                description: bookmark.description
            }).then((res) => {
                res.ok && onClose()
            })
        }else{
            alert.show('Select Category First')
        }
    }

    const options = useMemo(() => {
        return categories.map((category) => (
            {label: category.title, value: category.id}
        ))
    }, [categories])

    return (
        <div className={s.addToCategoryContainer}>
            <h4>Add Bookmark</h4>
            <div className={s.input}>
                <select
                    onChange={(e) => setSelectedCatId(e.target.value)}
                >
                    <option value={''}>Select Category</option>
                    {
                        options.map(opt => (
                            <option key={opt.label} value={opt.value}>
                                {opt.label}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={s.btnContainer}>
                <Button
                    label={'ADD'}
                    onClick={addToCategory}
                />
            </div>
        </div>
    );
};

export default AddToBookmark;
