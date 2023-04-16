import React, {useCallback, useState} from 'react';
import style from './Recommendation.module.scss'
import {FaInfoCircle, FaPlusCircle, FaRegTrashAlt} from "react-icons/fa";
import {Collapse} from "reactstrap";
import Modal from "../../../../../../common/Modal/Modal";
import DeleteRecommendation from "./actions/DeleteRecommendation";
import AddToBookmark from "../../../../../../common/add-to-bookmark/AddToBookmark";
import {connect} from "react-redux";
import {addBookmark} from "../../../../../../../redux/reducers/bookmarks";

const Recommendation = ({
   recommendation,
   deleteRecommendation,
   categories,
   addBookmark
 }) => {
    const [showDesc, setShowDesc] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showAddBookmarkModal, setShowAddBookmarkModal] = useState(false)

    const onExpandHandler = () => {
        setShowDesc(!showDesc)
    }

    const deleteHandler = useCallback((e) => {
        deleteRecommendation(recommendation.id)
            .then((res) => {
                res.ok && setShowDeleteModal(false)
            })
    }, [recommendation])

    return (
        <li>
            <div className={style.row}>
                <div className={style.left}>
                   <div className={style.title}>
                       <a href={recommendation.url} target={'_blank'}>
                           <span>{recommendation.title}</span>
                       </a>
                   </div>
                    <Collapse isOpen={showDesc}>
                        <p>{recommendation.description}</p>
                    </Collapse>
                </div>
                <div className={style.right}>
                    <div className={style.wrap} onClick={() => setShowDeleteModal(true)}>
                        <span>
                               <FaRegTrashAlt color={'red'}/>
                        </span>
                    </div>
                    <div className={style.wrap} onClick={() => setShowAddBookmarkModal(true)}>
                        <span>
                               <FaPlusCircle color={'#a3c93a'}/>
                        </span>
                    </div>
                    <div className={style.wrap} onClick={onExpandHandler}>
                        <span>
                               <FaInfoCircle color={'black'}/>
                        </span>
                    </div>
                </div>
            </div>
            <Modal
                openModal={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <DeleteRecommendation deleteHandler={deleteHandler}/>
            </Modal>
            <Modal
                openModal={showAddBookmarkModal}
                onClose={() => setShowAddBookmarkModal(false)}
            >
              <AddToBookmark
                  categories={categories}
                  handler={addBookmark}
                  bookmark={recommendation}
                  onClose={() => setShowAddBookmarkModal(false)}
              />
            </Modal>
        </li>
    );
};

export default connect(null, {
    addBookmark
})(Recommendation)
