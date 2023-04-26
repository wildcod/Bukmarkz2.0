import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { CustomGrid, primaryColor, softColor } from "../../theme";
import { AUTH_TYPE } from "../../constants";

const LOGIN_FIELDS = {
  username: "username",
  password: "password",
};

const styles = {
  input: {
    paddingBottom: 14,
  },
};

export const Login = ({ handleChange, setAuthType, values, resetForm }) => {
  const [colorIconEmail, setColorIconEmail] = useState(softColor);
  const [colorIconPassrowd, setColorIconPassrowd] = useState(softColor);

  return (
    <div>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <EmailIcon style={{ color: colorIconEmail }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={LOGIN_FIELDS.username}
            value={values[LOGIN_FIELDS.username]}
            label="username"
            type="text"
            onChange={handleChange}
            onFocus={setColorIconEmail.bind(this, primaryColor)}
            onBlur={setColorIconEmail.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            variant="standard"
            required
            fullWidth
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <LockIcon style={{ color: colorIconPassrowd }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={LOGIN_FIELDS.password}
            value={values[LOGIN_FIELDS.password]}
            label="password"
            type="password"
            onChange={handleChange}
            onFocus={setColorIconPassrowd.bind(this, primaryColor)}
            onBlur={setColorIconPassrowd.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            variant="standard"
            required
            fullWidth
          />
        </Grid>
      </CustomGrid>
      <Box
        style={{ float: "right", margin: "1rem 0", cursor: "pointer" }}
        onClick={() => {
          setAuthType(AUTH_TYPE.REGISTER);
          resetForm();
        }}
      >
        Sign Up
      </Box>
    </div>
  );
};

export default Login;
