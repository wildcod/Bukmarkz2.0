import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './MyDashboard.module.scss'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {motion} from 'framer-motion'
import LeftPanel from "./left-panel/LeftPanel";
import CardCategory from "./card-category/CardCategory";
import ReactDOMServer from 'react-dom/server'
import { saveAs } from 'file-saver';
import {
    addCategory,
    deleteCategory,
    getCategories,
    updateCategory,
    importBookmark
} from '../../../../../redux/reducers/categories'
import {addBookmark, deleteBookmark, getBookmarks, updateBookmark} from '../../../../../redux/reducers/bookmarks'
import {getUserSubscriptionDetails} from '../../../../../redux/reducers/auth'
import { connect } from 'react-redux'
import Button from "../../../../common/button/Button";
import Modal from "../../../../common/Modal/Modal";
import AddCategory from "./add-category/AddCategory";
import ImportBookmarks from "./import-bookmarks/ImportBookmarks";
const ADD_CAT_MODAL = 'ADD_CAT_MODAL'
const IMPORT_MODAL = 'IMPORT_MODAL'

const MyDashboard = ({
 subscriptions,
 userSubscription,
 categories: reduxCategories,
 getBookmarks,
 getUserSubscriptionDetails,
 getCategories,
 bookmarks: reduxBookmarks,
 auth,
 isPrivate,
 addCategory,
 updateCategory,
 deleteCategory,
 deleteBookmark,
 updateBookmark,
 addBookmark,
 importBookmark
}) => {
    const [currentActiveModal, setCurrentActiveModal] = useState('')
    const [categories, setCategories] = useState(reduxCategories)
    const [bookmarks, setBookmarks] = useState(reduxBookmarks)
    const [selectedBookmark, setSelectedBookmark] = useState({})

    const {maxCategoriesStored, maxBookmarksInOneCategory} = useMemo(() => {
        let subscription
        console.log(userSubscription)
        if (!userSubscription)
            subscription = subscriptions.filter(s => s.name === 'Basic')
        else {
            subscription = subscriptions.filter(s => s.name === 'Premium')
        }

        if (subscription.length > 0)
            subscription = subscription[0]

        let {max_categories_stored, max_bookmarks_in_one_category} = subscription
        if (max_bookmarks_in_one_category === 0) max_categories_stored = Infinity
        if (max_bookmarks_in_one_category === 0) max_bookmarks_in_one_category = Infinity
        return {max_categories_stored, max_bookmarks_in_one_category}
    }, [userSubscription, subscriptions])

    const [firstColumnCategories, secondColumnCategories, thirdColumnCategories ] = useMemo(() => {
        const firstColumnCat = categories?.filter((category, index) => index % 3 === 0)
        const secondColumnCat = categories?.filter((category, index) => index % 3 === 1)
        const thirdColumnCat = categories?.filter((category, index) => index % 3 === 2)
        return [firstColumnCat, secondColumnCat, thirdColumnCat]
    }, [categories])

    const onMouseDownHandler = useCallback((bookmark) => {
        setSelectedBookmark({
            name: bookmark.name,
            url: bookmark.url,
            description: bookmark.description
        })
    }, [])

    const categoriesColumn = useCallback((categories) =>
            categories?.map((category) => (
                <Droppable key={category.id} droppableId={String(category.id)}>
                    {
                        (provided) => (
                            <motion.div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                key={category.id}
                                initial={{y: 60}}
                                animate={{y: 0}}
                                transition={{duration: 1}}
                                // style={{paddingBottom: '10px'}}
                            >
                                <CardCategory
                                    key={category.id}
                                    category={category}
                                    auth={auth}
                                    isPrivate={isPrivate}
                                    updateCategory={updateCategory}
                                    deleteCategory={deleteCategory}
                                    deleteBookmark={deleteBookmark}
                                    updateBookmark={updateBookmark}
                                    addBookmark={addBookmark}
                                    onMouseDownHandler={onMouseDownHandler}
                                    onTouchStartHandler={onMouseDownHandler}
                                    bookmarks={bookmarks.filter((book) => book.category === category.id)}
                                />
                                {provided.placeholder}
                            </motion.div>
                        )
                    }
                </Droppable>
            ))
    , [bookmarks, categories])

    useEffect(() => {
        if(reduxBookmarks){
            setBookmarks(reduxBookmarks)
        }
    }, [reduxBookmarks])

    useEffect(() => {
        if(reduxCategories){
            setCategories(reduxCategories)
        }
    }, [reduxCategories])

    const searchHandler = (e) => {
        let currentList = []
        let currentCategoriesList = []
        let newBookmarkList = []
        let newCategoryList = []
        if (e.target.value !== '') {
            currentCategoriesList = reduxCategories
            currentList = reduxBookmarks
            newBookmarkList = currentList.filter((bookmark) => {
                let lc = ''
                if (bookmark.name)
                    lc = bookmark.name.toLowerCase()
                const filter = e.target.value.toLowerCase()
                let test1 = lc.includes(filter)
                let description = ''
                if (bookmark.description)
                    description = bookmark.description.toLowerCase()
                let test2 = description.includes(filter)
                return test1 || test2
            })
            if(newBookmarkList && newBookmarkList.length){
                const bookmarkListIds = newBookmarkList.map(item => item.category)
                newCategoryList = currentCategoriesList.filter(cat => bookmarkListIds.includes(cat.id))
            }
        } else {
            newCategoryList = reduxCategories
            newBookmarkList = reduxBookmarks
        }
        setCategories(newCategoryList)
        setBookmarks(newBookmarkList)
    }

    const move = useCallback((data, source, droppableSource, dest) => {
        updateBookmark(data, droppableSource.index)
    }, [])

    const onDragEnd = useCallback((e) => {
        const {source, destination} = e
        if (!destination) {
            return
        }
        const sInd = +source.droppableId
        const dInd = +destination.droppableId
        console.log('End', { source, destination, sInd, dInd, selectedBookmark })

        if (sInd !== dInd) {
            const data = {
                name: selectedBookmark.name,
                url: selectedBookmark.url,
                description: selectedBookmark.description,
                category: dInd
            }
            move(data, sInd, source, destination)
            setSelectedBookmark({})
        }
    }, [selectedBookmark])

    const exportBookmark = useCallback(() => {
        if(categories && bookmarks && categories.length && bookmarks.length){
            const categoriesList = ReactDOMServer.renderToStaticMarkup(categories.map(category => (
                <dt key={category.id}>
                    <h3>
                        {category.title}
                    </h3>
                    <dl>
                        {bookmarks.filter(b => b.category === category.id).map(b => (
                            <dt>
                                <a href={b.url} key={b.id}>{b.name}</a>
                                <div className={'description'}>
                                    {b.description}
                                </div>
                            </dt>
                        ))}
                    </dl>
                </dt>
            )))
            const blob = new Blob([categoriesList], {
                type: 'text/html;charset=utf-8'
            })
            saveAs(blob, 'Bookmark.html')
        }
    }, [categories, bookmarks])

    const openModal = useCallback((active) => {
        setCurrentActiveModal(active)
    }, [])

    const closeModal = useCallback(() => {
        setCurrentActiveModal('')
    }, [])

    useEffect(() => {
        if(categories !== reduxCategories){
            setCategories(reduxCategories)
        }if(bookmarks !== reduxBookmarks){
            setBookmarks(reduxBookmarks)
        }
    }, [reduxCategories, reduxBookmarks])

    useEffect(() => {
        getCategories()
        getBookmarks()
        getUserSubscriptionDetails()
    }, [])
    console.log('State', { categories, bookmarks })
    return (
        <div className={s.dashBoardContainer}>
           <div className={s.left}>
               <LeftPanel categories={categories}/>
           </div>
           <div className={s.right}>
               <div className={s.header}>
                   <div className={s.actions}>
                       <Button
                           onClick={() => openModal(ADD_CAT_MODAL)}
                           label={'Add Category'}
                       />
                       <Button
                           label={'Export'}
                           onClick={exportBookmark}
                       />
                       <Button
                           onClick={() => openModal(IMPORT_MODAL)}
                           label={'Import'}
                       />
                   </div>
                   <div className={s.searchBar}>
                       <input
                           type={'text'}
                           placeholder={'Search'}
                           onChange={searchHandler}
                       />
                   </div>
               </div>
               <DragDropContext onDragEnd={onDragEnd}>
                   <div className={s.gridContainer}>
                       <div className={s.col}>
                           {categoriesColumn(firstColumnCategories)}
                       </div>
                       <div className={s.col}>
                           {categoriesColumn(secondColumnCategories)}
                       </div>
                       <div className={s.col}>
                           {categoriesColumn(thirdColumnCategories)}
                       </div>
                   </div>
               </DragDropContext>
           </div>
            <Modal
                onClose={closeModal}
                openModal={currentActiveModal.length > 0}
            >
                {
                    currentActiveModal.length > 0 && currentActiveModal === ADD_CAT_MODAL ?
                        <AddCategory
                            auth={auth}
                            isPrivate={isPrivate}
                            addCategory={addCategory}
                            closeModal={closeModal}
                        /> :
                        <ImportBookmarks
                            importBookmark={importBookmark}
                            closeModal={closeModal}
                            getBookmarks={getBookmarks}
                        />
                }
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth.user,
    bookmarks: state.bookmarks.bookmarks,
    subscriptions: state.subscriptions.subscriptions,
    userSubscription: state.auth.userSubscription,
    categories: state.categories.category
})

export default connect(mapStateToProps, {
    getCategories,
    deleteCategory,
    updateCategory,
    addCategory,
    addBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark,
    importBookmark,
    getUserSubscriptionDetails,
})(MyDashboard)
