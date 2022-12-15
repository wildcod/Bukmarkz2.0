import instance from './index'

export const subscriptionAPI = {
    getSubscriptions() {
        return instance.get(`api/subscription/`).then(res => res.data)
    },

    getSubscriptionDetails(id) {
        return instance.get(`api/subscription/${id}/`).then(res => res.data)
    },

    getUserSubscriptionDetails() {
        return instance.get(`api/subscription/user_subscription/`).then(res => res.data)
    }
}