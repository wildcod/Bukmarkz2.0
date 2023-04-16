import React, {useState} from 'react';
import Button from '../../../../../common/button/Button'
import s from './ImportBookmarks.module.scss'
import Spinner from "../../../../../common/spinner/Spinner";
import axios from "axios";

const ImportBookmarks = ({
    importBookmark,
    closeModal,
    getBookmarks,
    onRefresh
 }) => {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie("csrftoken");

    const [file, setFile] = useState(null)
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onFileHandler = (e) => {
        const name = e.target.files[0].name
        const file = e.target.files[0]
        if (name.slice(name.length - 4, name.length) === 'html') {
            setFile(file)
        } else {
            alert('Please load HTML files only')
        }
    }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     const data = new FormData()
    //     data.append('file', file, file.name);
    //     data.append('category', category);
    //     setIsLoading(true)
    //     importBookmark(data)
    //         .then((res) => {
    //             if(res.ok){
    //                 getBookmarks()
    //             }
    //             setIsLoading(false)
    //             closeModal()
    //         }).catch(error => {
    //             console.error(error)
    //             setIsLoading(false)
    //             closeModal()
    //     })
    // }

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('file', file, file.name);
        data.append('category', category);
        setIsLoading(true)

        console.log(data);
        axios({
            method: "POST",
            url:`/api/import/importFile/`,
            data: data,
            headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
        })
        .then((response) => {
            onRefresh();
            setIsLoading(false);
            closeModal();
        }).catch((error) => {
            if (error) {
                console.error(error)
                setIsLoading(false)
                closeModal()
            }
        })
    }

    return (
        <div className={s.importBookmarks}>
           <h3>Import Your Bookmarks</h3>
            <form className={s.body} onSubmit={onSubmit}>
               <span className={s.note}>Note: Export your browser bookmarks as <b>.html</b> file</span>
               <span className={s.title}>Select the file</span>
               <input
                   type={'file'}
                   accept={'.html'}
                   name={'bookmark'}
                   onChange={onFileHandler}
                   required
               />
               <input
                   type={'text'}
                   required
                   name={'category'}
                   minLength={5}
                   maxLength={30}
                   onChange={(e) => setCategory(e.target.value)}
                   placeholder={'Please enter a category upto 30 char'}
               />
               <div className={s.btnContainer}>
                   <Button label={'IMPORT'} type={'submit'}/>
               </div>
            </form>
            {isLoading && <Spinner />}
        </div>
    );
};

export default ImportBookmarks;
