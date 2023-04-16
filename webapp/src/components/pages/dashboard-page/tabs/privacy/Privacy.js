import React, {useEffect, useMemo, useState} from 'react'
import Modal from '../../../../common/Modal/Modal'
import {checkAccess, getOTP, postOTP, setAccessStatus} from '../../../../../redux/reducers/privateDashboard'
import {getCategories} from '../../../../../redux/reducers/categories'
import s from './Privacy.module.scss'
import {connect, useDispatch} from 'react-redux'
import {MyDashboard} from '../index'
import EmailOtp from './email-otp/EmailOtp'

const Privacy = ({
                   auth,
                   hasAccess,
                   categories,
                   requestOTP,
                   checkAccess,
                   getCategories,
                   getOTP,
                   postOTP
                 }) => {
  const [otp, setOtp] = useState('')

  const mainCategories = useMemo(() => {
    return categories.filter(category => category.private === true)
  }, [categories])

  const dispatch = useDispatch()

  useEffect(() => {
    checkAccess()
    getCategories()
  }, [])

  return (
    <div className={s.privacyContainer}>
      {
        hasAccess ?
          <MyDashboard
            categories={mainCategories}
            isPrivate={true}
          /> :
          <Modal
            openModal={true}
            hideClose={true}
            onClose={null}
            modalStyle={{padding: '20px 0'}}
          >
            <EmailOtp
              validated={hasAccess}
              requestOTP={requestOTP}
              otp={otp}
              show={!hasAccess}
              handleClose={() => setAccessStatus(true)}
              handleInput={(e) => setOtp(e)}
              getOTP={getOTP}
              postOTP={postOTP}
            />
          </Modal>

      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  categories: state.categories.category,
  hasAccess: state.privateDashboard.hasAccess,
  requestOTP: state.privateDashboard.requestOTP
})

export default connect(mapStateToProps, {
  getCategories,
  checkAccess,
  getOTP,
  postOTP,
  setAccessStatus
})(Privacy)
