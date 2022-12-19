import instance from './index';


export const authAPI = {
    me() {
        return instance.get('auth/user/').then(res => res.data)
    },

    login(data) {
        return instance.post(`api/auth/login/`, data).then(res => res.data)
    },

    register(data) {
        return instance.post(`api/auth/register/`, data).then(res => res.data)
    },

    logout() {
        return instance.post(`auth/logout/`)
    },

    resetPassword(data) {
        return instance.post(`password_reset/`, data).then(res => res.data)
    },

    passwordResetConfirm(data) {
        return instance.post(`password_reset/confirm/`, data).then(res => res.data)
    },

    getUserReferralsData() {
        return instance.get(`referral/`).then(res => res.data)
    },

    getUserSubscriptionDetails() {
        return instance.get(`subscription-details/`).then(res => res.data)
    },

}
