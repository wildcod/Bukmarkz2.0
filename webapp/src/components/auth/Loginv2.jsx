import React, { useState,useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import ImgWave from '../../assets/img/wave.png'
import ImgBg from '../../assets/img/bg.svg'
import ImgAvatar from '../../assets/img/avatar.svg'

import Grid from '@mui/material/Grid'
import {Email as EmailIcon,
        Lock as LockIcon} from '@mui/icons-material'
import {CustomGrid,primaryColor,softColor,LoadingOverlay} from '../../theme'
import TextField from '@mui/material/TextField'
import s from "./Register.module.scss";


export const Login = props => {
  const [loading,setLoading] = useState(false)
  const [password,setPassword] = useState("")
  const [colorIconEmail,setColorIconEmail] = useState(softColor)
  const [colorIconPassrowd,setColorIconPassrowd] = useState(softColor)
  const [email,setEmail] = useState("")
 
//   useEffect(()=>{
//     if (isAuthenticated()) {
//       props.history.push("/app");
//     }
//   },[props])

  const handleSignIn = async e => {
    e.preventDefault();

    // if (!email || !password) {
    //   alert("Error","fill in all fields before proceeding");
    // } else {
    //   setLoading(true)
    //   try {
    //     const response = await api.post("/login", { email, password });
    //     login(response.headers.authorization.replace("Bearer", ""));
    //     setLoading(false);
    //     setAuthEmail(email);
    //     props.history.push("/app");
    //   } catch (err) {
    //     var message = "Unknown error";
    //     if (err.response && err.response.data.message) {
    //       message = err.response.data.message;
    //     };
        
    //     console.error("Error",message);
    //     setLoading(false)
    //   }
    // }
  };

  return (
    <div className={s.loginWrapper}>
      <img className={s.wave} alt='Wave' src={ImgWave} />
      <div className={s.container}>
        <div className={s.imh}>
          <img alt='background' src={ImgBg} />
        </div>
        <div className={s.loginContent}>
          <LoadingOverlay loading={loading} />
          <form onSubmit={handleSignIn}>
              <img alt='Avatar' src={ImgAvatar} />
              <h2 className={s.title}>Welcome </h2>
              <CustomGrid container spacing={1} alignItems="flex-end">
                <Grid xs={2} item>
                  <EmailIcon style={{color:colorIconEmail}}/>
                </Grid>
                <Grid xs={10} item>
                  <TextField label="e-mail" 
                              type='email'
                              onChange={e => setEmail(e.target.value)}
                              onFocus={setColorIconEmail.bind(this,primaryColor)}
                              onBlur={setColorIconEmail.bind(this,softColor)}
                              variant="standard"
                              fullWidth />
                </Grid>
              </CustomGrid>
              <CustomGrid container spacing={1} alignItems="flex-end">
                <Grid xs={2} item>
                  <LockIcon style={{color:colorIconPassrowd}}/>
                </Grid>
                <Grid xs={10} item>
                  <TextField label="password" 
                              type='password'
                              onChange={e => setPassword(e.target.value)}
                              onFocus={setColorIconPassrowd.bind(this,primaryColor)}
                              onBlur={setColorIconPassrowd.bind(this,softColor)}
                              variant="standard"
                              fullWidth />
                </Grid>
              </CustomGrid>
              <Link to="/signup">Sign Up</Link>
              <input type="submit" disabled={loading} className={s.btn} value="Login" />
            </form>
          </div>
        </div>
    </div>
  )
}

export default withRouter(Login);