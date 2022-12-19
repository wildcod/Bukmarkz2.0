import React, { useState } from "react";
import axios from "axios";
import s from "./Register.module.scss";
import Button from "../common/button/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { loginUser, resetPassword } from "../../redux/reducers/auth";
import { useHistory } from "react-router-dom";
import Modal from "../common/Modal/Modal";
import AccountCircleOutlinedIcon from "../../../node_modules/@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "../../../node_modules/@mui/icons-material/LockOutlined";
import DesktopLogo from '../../assets/img/fwdlogo/logo.png';


const Login = ({
  onToggle,
  isFromExtension = false,
  isLoading,
  loginUser,
  onClose,
  error,
  resetPassword,
}) => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  
  const [formLogin, setLoginForm] = useState({
    username: "",
    password: "",
  })

  const [formPassReset, setFormPassReset] = useState({
    email: "",
  });

  const history = useHistory();

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");

  const username = formLogin.username;
  const password = formLogin.password;

  // const onSubmit = (e) => {
  //   console.log("CLICK");
  //   e.preventDefault();
  //   loginUser({
  //     username,
  //     password,
  //   }).then((res) => {
  //     if (res.ok) {
  //       if (!isFromExtension) {
  //         onClose();
  //         history.push("/dashboard");
  //       }
  //     }
  //   });
  //   // passLoginForm(e);
  // };

  // const reactLogin = (e) => {
  //   loginUser({
  //     username,
  //     password,
  //   }).then((res) => {
  //     if (res.ok) {
  //       if (!isFromExtension) {
  //         onClose();
  //         history.push("/dashboard");
  //       }
  //     }
  // });


  function passLoginForm(event) {
    event.preventDefault();
    var data = {
      username: username,
      password: password,
    }
    axios({
      method: "POST",
      url:`/api/auth/login/`,
      data:JSON.stringify(data),
      headers: { "X-CSRFTOKEN": csrftoken, "Content-type": "application/json" },
    }).then((response, dispatch) => {
      loginUser({
        username,
        password,
      }).then((res) => {
        if (res.ok) {
          if (!isFromExtension) {
            onClose();
            history.push("/dashboard");
          }
        }
      });
    }).catch((error) => {
        if (error.response) {
          // setPassErr(error.response.data.err[0].split(" - ")[1]);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    })
  }

  const forgotPassHandler = (e) => {
    e.preventDefault();
    resetPassword({ email })
      .then((res) => {
        console.log("Res", res);
        res.ok && setOpenForgotPassword(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function passReset(event) {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/reset/password/",
      data: {
        email: formPassReset.email,
      },
    })
      .then((response) => {
        setOpenForgotPassword(false);
        setFormPassReset({ email: "" });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFormPassReset((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  }

  function handleLoginChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  }

  return (
    <div className={s.registerWrapper}>
      <img
        src={DesktopLogo}
        alt={'bukmarz-logo'}
      />
      <form id="loginForm" className={s.formContainer} onSubmit={passLoginForm}>
        <div className={s.formGroup}>
          <div className={s.formInput}>
            <div className={s.svgDiv}>
              <AccountCircleOutlinedIcon />
            </div>
            <div className={s.rightBorder}></div>
            <input
              autoComplete="off"
              type={"text"}
              required
              name={"username"}
              placeholder={"Username"}
              text={formLogin.username}
              onChange={handleLoginChange}
            />
          </div>
        </div>

        <div className={s.formGroup}>
          <div className={s.formInput}>
            <div className={s.svgDiv}>
              <LockOutlinedIcon />
            </div>
            <div className={s.rightBorder}></div>
            <input
              type={"password"}
              required
              name={"password"}
              placeholder={"Password"}
              text={formLogin.password}
              onChange={handleLoginChange}
            />
          </div>
        </div>
      </form>
      <div className={s.formBottom}>
        <div className={s.btnContainer}>
          <Button form="loginForm" label={"Login"} type={"submit"} isLoading={isLoading} />
        </div>
        {!isFromExtension ? (
        <p className={s.forgotCaption}>
          <span
            onClick={() => setOpenForgotPassword(true)}
          >
            Forgot Password?
          </span>
        </p>
        ) : null}
      </div>
      {!isFromExtension ? (
        <span className={s.registerCaption}>
          Don't have an account? <a onClick={onToggle}>Sign Up</a>
        </span>
      ) : null}
      <Modal
        openModal={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      >
        <form className={s.formContainer} onSubmit={passReset}>
          <h2 style={{ textAlign: "center" }}>Password Reset</h2>
          <div className={s.formInput}>
            <input
              type={"email"}
              required
              name={"email"}
              text={formPassReset.email}
              placeholder={"email"}
              onChange={handleChange}
            />
          </div>
          <div className={s.btnContainer}>
            <Button label={"Submit"} type={"submit"} />
          </div>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.loading.isLoading,
  error: state.errors,
  slug: state.auth.slug,
});

export default compose(
  connect(mapStateToProps, { loginUser, resetPassword }),
  withRouter
)(Login);
