import {
  AccountCircle,
  Email,
  Lock,
  Smartphone as SmartphoneIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useMemo, useState } from "react";
import { AUTH_TYPE } from "../../constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import countryList from "react-select-country-list";
import { CustomGrid, primaryColor, softColor } from "../../theme";

const REGISTER_FIELDS = {
  username: "username",
  email: "email",
  phone: "phone",
  password: "password",
  password2: "password2",
  country: "country",
};

const styles = {
  input: {
    paddingBottom: 14,
  },
};

export const Register = ({ handleChange, setAuthType, values, resetForm }) => {
  const [emailIconColor, setEmailIconColor] = useState(softColor);
  const [passwordIconColor, setPasswordIconColor] = useState(softColor);
  const [userIconColor, setUserIconColor] = useState(softColor);
  const [phoneIconColor, setPhoneIconColor] = useState(softColor);
  const [password2IconColor, setPassword2IconColor] = useState(softColor);
  const [countryIconColor, setCountryIconColor] = useState(softColor);
  const countryOptions = useMemo(() => countryList().getData(), []);

  return (
    <div>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <AccountCircle style={{ color: userIconColor }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={REGISTER_FIELDS.username}
            value={values[REGISTER_FIELDS.username]}
            label="username"
            onChange={handleChange}
            onFocus={setUserIconColor.bind(this, primaryColor)}
            onBlur={setUserIconColor.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            fullWidth
            required
            variant="standard"
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <Email style={{ color: emailIconColor }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={REGISTER_FIELDS.email}
            value={values[REGISTER_FIELDS.email]}
            label="e-mail"
            onChange={handleChange}
            onFocus={setEmailIconColor.bind(this, primaryColor)}
            onBlur={setEmailIconColor.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            fullWidth
            required
            variant="standard"
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <SmartphoneIcon style={{ color: phoneIconColor }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={REGISTER_FIELDS.phone}
            value={values[REGISTER_FIELDS.phone]}
            label="phone number"
            inputProps={{ maxLength: 10, style: styles.input }}
            onChange={handleChange}
            onFocus={setPhoneIconColor.bind(this, primaryColor)}
            onBlur={setPhoneIconColor.bind(this, softColor)}
            fullWidth
            required
            variant="standard"
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <Lock style={{ color: passwordIconColor }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={REGISTER_FIELDS.password}
            value={values[REGISTER_FIELDS.password]}
            label="password"
            type="password"
            onChange={handleChange}
            onFocus={setPasswordIconColor.bind(this, primaryColor)}
            onBlur={setPasswordIconColor.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            fullWidth
            required
            variant="standard"
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <Lock style={{ color: password2IconColor }} />
        </Grid>
        <Grid xs={10} item>
          <TextField
            name={REGISTER_FIELDS.password2}
            value={values[REGISTER_FIELDS.password2]}
            label="confirm password"
            type="password"
            onChange={handleChange}
            onFocus={setPassword2IconColor.bind(this, primaryColor)}
            onBlur={setPassword2IconColor.bind(this, softColor)}
            inputProps={{ style: styles.input }}
            fullWidth
            required
            variant="standard"
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container spacing={1} alignItems="flex-end">
        <Grid xs={2} item>
          <FlagIcon style={{ color: countryIconColor }} />
        </Grid>
        <Grid xs={10} item>
          <FormControl variant="standard" sx={{ width: "100%" }} required>
            <InputLabel id="demo-simple-select-standard-label">
              country
            </InputLabel>
            <Select
              required
              inputProps={{ required: true }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values[REGISTER_FIELDS.country]}
              onChange={handleChange}
              name={REGISTER_FIELDS.country}
              onFocus={setCountryIconColor.bind(this, primaryColor)}
              onBlur={setCountryIconColor.bind(this, softColor)}
            >
              {countryOptions.map((o) => (
                <MenuItem value={o.value}>{o.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default Register;
