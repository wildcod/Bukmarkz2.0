import instance from './index'

export const defaultDashboardAPI = {
    getDefaultBookmarks() {
        return instance.get(`default_bookmark/`).then(res => res.data)
    },

    getDefaultCategories() {
        return instance.get(`default_category/`).then(res => res.data)
    },

    addCategoryToDashboard(id) {
        return instance.post(`default_category/add_to_my_dashboard/`, {
            'default_category': id
        })
    },

    addBookmarkToCategory(data){
        return instance.post(`default_bookmark/add_to_my_category/`, data)
    }
}
