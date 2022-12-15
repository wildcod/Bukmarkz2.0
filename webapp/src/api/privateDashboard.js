import instance from './index'

export const privateDashboardAPI = {
  checkAccess() {
    return instance.get(`check_otp`)
  },

  requestOTP() {
    return instance.get(`emailOtp`)
  },

  postOTP(otp) {
    return instance.post(`emailOtp/`, {otp})
  }
}
