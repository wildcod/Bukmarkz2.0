import React from 'react';
import s from "../../../card-category/CardCategory.module.scss";
import Button from "../../../../../../../common/button/Button";

const DeleteRecommendation = ({deleteHandler}) => {
    return (
        <div className={s.editCatContainer} style={{padding: '10px 0'}}>
            <h3 className={s.modalHeader}>Are you sure you wan't to delete this recommendation?</h3>
            <div className={s.btnContainer}>
                <Button label={'Delete'} className={'delete'} onClick={deleteHandler}/>
            </div>
        </div>
    );
};

export default DeleteRecommendation;
