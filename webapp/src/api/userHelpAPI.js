import instance from "./index";

export const userHelpAPI = {
  getAids() {
    return instance.get(`/help_user/`).then((res) => res.data);
  },

  addAidForUser(data) {
    return instance.post(`/help_user/`, data).then((res) => res.data);
  },

  deleteAid(id) {
    return instance.delete(`/help_user/${id}/`);
  },
};
