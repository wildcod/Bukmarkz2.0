import instance from './index'

export const recommendationsAPI = {
    getRecommendations() {
        return instance.get(`recommendation/`).then(res => res.data)
    },

    deleteRecommendation(id) {
        return instance.delete(`recommendation/${id}/`)
    },

    addRecommendation(data) {
        return instance.post(`recommendation/`, data).then(res => res.data)
    },

    updateRecommendation(data, id) {
        return instance.put(`recommendation/${id}/`, data)
    }
}
