import React, {useEffect, useMemo, useState} from 'react';
import style from './BookmarkExtensionPage.module.scss'
import Button from "../../common/button/Button";
import {connect} from "react-redux";
import {getCategories} from "../../../redux/reducers/categories";
import { addBookmark } from "../../../redux/reducers/bookmarks";
import Login from "../../auth/Login";
import { useHistory } from "react-router-dom";

const BookmarkExtensionPage = ({
   getCategories,
   categories,
   isAuthenticated,
   addBookmark
}) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [cat, setCat] = useState('')
    const history = useHistory()

    useEffect(() => {
        getCategories()
    }, [])

    const options = useMemo(() => {
        return categories.map((category) => (
            {label: category.title, value: category.id}
        ))
    }, [categories])

    useEffect(() => {
        if(history){
            let query = {}
            let queryString = history.location.search;
            queryString = queryString.slice(1)
            for (let ele of queryString.split('&')){
                const key = ele.split('=')[0]
                const value = ele.split('=')[1]
                query = { ...query, [key]: value }
            }
            setTitle(decodeURIComponent(query.title))
            setUrl(decodeURIComponent(query.url))
        }
    }, [history])

    const addBookmarkHandler = (e) => {
        e.preventDefault()
        addBookmark({
            name: title,
            url,
            description,
            category: cat
        }).then((res) => {
            if(res.ok){
                window.close()
            }
        }).catch(error => {
            console.error(error)
            alert('Something went wrong')
        })
    }

    return isAuthenticated ?
        <div className={style.formContainer}>
            <form onSubmit={addBookmarkHandler}>
                <div className={style.input}>
                    <label>Category:</label>
                    <select required onChange={(e) => setCat(e.target.value)}>
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
                <div className={style.input}>
                    <label>Title:</label>
                    <input required type={'text'} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={style.input}>
                    <label>URL:</label>
                    <input required type={'text'} value={url} onChange={(e) => setUrl(e.target.value)}/>
                </div>
                <div className={style.input}>
                    <label>Description:</label>
                    <input required type={'text'} value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className={style.btnContainer}>
                    <div className={style.btn}>
                        <Button label={'Add'} small={true} type={'submit'}/>
                    </div>
                    <div className={style.btn}>
                        <Button label={'Cancel'} small={true} onClick={() => window.close()}/>
                    </div>
                </div>
            </form>
        </div> :
        <div className={style.login}>
            <Login isFromExtension={true}/>
        </div>
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    categories: state.categories.category
})

export default connect(mapStateToProps, {
    getCategories,
    addBookmark
})(BookmarkExtensionPage)
