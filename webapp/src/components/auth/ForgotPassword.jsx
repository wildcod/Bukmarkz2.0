import { Email as EmailIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { AUTH_TYPE } from "../../constants";
import { CustomGrid, primaryColor, softColor } from "../../theme";

const styles = {
  input: {
    paddingBottom: 14,
  },
};

export const ForgotPassword = ({
  handleChange,
  setAuthType,
  values,
  resetForm,
}) => {
  const [colorIconEmail, setColorIconEmail] = useState(softColor);

  return (
    <div>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <EmailIcon style={{ color: colorIconEmail }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={"email"}
            value={values["email"]}
            label="email"
            type="email"
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
      <Box
        style={{ float: "right", margin: "1rem 0", cursor: "pointer" }}
        onClick={() => {
          setAuthType(AUTH_TYPE.LOGIN);
          resetForm();
        }}
      >
        Sign In
      </Box>
    </div>
  );
};

export default ForgotPassword;
