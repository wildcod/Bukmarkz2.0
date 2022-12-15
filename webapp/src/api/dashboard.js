import instance from './index'

export const dashboardAPI = {
    getBookmarks() {
        return instance.get(`api/bookmark/`).then(res => res.data)
    },

    deleteBookmark(id) {
        return instance.delete(`api/bookmark/${id}/`)
    },

    saveBookmark(data) {
        return instance.post(`api/bookmark/`, data).then(res => res.data)
    },

    updateBookmark(data, id) {
        return instance.put(`api/bookmark/${id}/`, data).then(res => res.data)
    },

    getCategories() {
        return instance.get(`api/category/`).then(res => res.data)
    },

    deleteCategory(id) {
        return instance.delete(`api/category/${id}/`).then(res => res.data)
    },

    saveCategory(data) {
        return instance.post(`api/category/`, data).then(res => res.data)
    },

    updateCategory(data, id) {
        return instance.put(`api/category/${id}/`, data).then(res => res.data)
    },

    importBookmarks(data) {
        return instance.post(`api/import/importFile/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },

    addBookmarkFromExtension(body) {
        return instance.post(`api/import/add_bookmark/`, body).then(res => res.data)
    },

    getEmailBookmarks() {
        return instance.get(`api/email_bookmarks/`).then(res => res.data)
    },

    deleteEmailBookmark(id){
        return instance.delete(`api/email_bookmarks/${id}/`)
    }
}
