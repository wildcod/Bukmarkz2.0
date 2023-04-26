import { Formik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import ImgAvatar from "../../assets/img/avatar.svg";
import ImgBg from "../../assets/img/bg.svg";
import ImgWave from "../../assets/img/wave.png";
import { AUTH_TYPE } from "../../constants";
import { LoadingOverlay } from "../../theme";
import Login from "./LoginV2";
import s from "./Register.module.scss";
import Register from "./RegisterV2";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  registerUser,
  loginUser,
  resetPassword,
} from "../../redux/reducers/auth";
import ForgotPassword from "./ForgotPassword";
import { useAlert } from "react-alert";

export const Auth = ({ registerUser, loginUser, resetPassword, isLoading }) => {
  const [authType, setAuthType] = useState(AUTH_TYPE.LOGIN);
  const history = useHistory();
  const alert = useAlert();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigateToHome = () => {
    setTimeout(() => history.push("/dashboard"), 2000);
  };

  const onRegister = useCallback(
    (values) => {
      registerUser(values).then(navigateToHome);
    },
    [navigateToHome, registerUser]
  );

  const onLogin = useCallback(
    (values) => {
      loginUser(values).then(navigateToHome);
    },
    [navigateToHome, loginUser]
  );

  const onForgotPass = useCallback(
    (values) => {
      resetPassword(values);
    },
    [resetPassword]
  );

  const {
    component: Component,
    handler,
    label,
  } = useMemo(() => {
    if (authType === AUTH_TYPE.REGISTER) {
      return {
        component: Register,
        handler: onRegister,
        label: "Sign up",
      };
    }
    if (authType === AUTH_TYPE.FORGOT) {
      return {
        component: ForgotPassword,
        handler: onForgotPass,
        label: "Submit",
      };
    }
    return {
      component: Login,
      handler: onLogin,
      label: "Login",
    };
  }, [authType, onForgotPass, onLogin, onRegister]);

  return (
    <div className={s.loginWrapper}>
      <img className={s.wave} alt="Wave" src={ImgWave} />
      <div className={s.container}>
        <div className={s.imh}>
          <img alt="background" src={ImgBg} />
        </div>
        <div className={s.loginContent}>
          <LoadingOverlay loading={isLoading} />
          <img alt="Avatar" src={ImgAvatar} />
          <h2 className={s.title}>Welcome </h2>
          <Formik initialValues={{}} onSubmit={handler}>
            {({ values, handleChange, handleSubmit, resetForm }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <Component
                    setAuthType={setAuthType}
                    values={values}
                    handleChange={handleChange}
                    resetForm={resetForm}
                  />
                  <input type="submit" className={s.btn} value={label} />
                </form>
                <div
                  onClick={() => {
                    setAuthType(AUTH_TYPE.FORGOT);
                    resetForm();
                  }}
                  style={{ cursor: "pointer", color: "#2196f3" }}
                >
                  Forgot Password?
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
  isLoading: state.loading.isLoading,
  slug: state.auth.slug,
});

export default compose(
  connect(mapStateToProps, { registerUser, loginUser, resetPassword }),
  withRouter
)(Auth);
