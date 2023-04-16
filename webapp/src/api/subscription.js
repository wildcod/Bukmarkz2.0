import instance from './index'

export const subscriptionAPI = {
    getSubscriptions() {
        return instance.get(`/subscription/`).then(res => res.data)
    },

    getSubscriptionDetails(id) {
        return instance.get(`/subscription/${id}/`).then(res => res.data)
    },

    getUserSubscriptionDetails() {
        return instance.get(`/subscription/user_subscription/`).then(res => res.data)
    }
}