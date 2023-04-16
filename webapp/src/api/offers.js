import instance from './index'

export const offersAPI = {
    getOffers() {
        return instance.get(`/offer/`).then(res => res.data)
    },
};
