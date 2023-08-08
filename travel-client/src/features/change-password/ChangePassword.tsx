import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate, Link, useParams } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { errorToast } from "../../ui/toast/Toasts";
import { useDispatch } from "react-redux";
import { addUser } from "../../app/slices/authSlice";
import UserService from "../../services/UserService";

const theme = createTheme();

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [passwordChangeStatus, setPasswordChangeStatus] =
    React.useState<boolean>(false);

  const [user, setUser] = React.useState({
    password: "",
    cpassword: "",
    _id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  React.useEffect(() => {
    if (token)
      AuthService.validateToken(token)
        .then((response) => {
          console.log("valid token,", response);
          setShowForm(true);
          setUser({ ...user, _id: response?.data?.data?.id });
        })
        .catch((err) => {
          console.error(err);
          console.log("invalid token");
          setShowForm(false);
        });
  }, [token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // generate request
    UserService.updateUser(user?._id, { password: user?.password })
      .then((response) => {
        console.log("Response", response);
        setPasswordChangeStatus(true);

        // navigate("/secured");
      })
      .catch((err) => {
        console.error(err);
        const message =
          err?.response.data?.message || "Could not changed, try again!";
        console.log("Error Message", message);

        errorToast(message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card sx={{ padding: 2, marginTop: 4 }}>
          <CssBaseline />

          {!passwordChangeStatus ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              {showForm ? (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    autoComplete="confirm-password"
                    onChange={handleChange}
                    error={
                      user?.password && user?.password != user?.cpassword
                        ? true
                        : false
                    }
                    helperText={
                      user?.password &&
                      user?.password != user?.cpassword &&
                      "Password and confirm password did not match"
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={
                      !user?.password || user?.password != user?.cpassword
                    }
                  >
                    Change
                  </Button>
                </Box>
              ) : (
                <p>The link is invalid</p>
              )}
            </Box>
          ) : (
            <p>
              The password is changed successfully. <br />
              <Link to="/login">Goto login</Link>
            </p>
          )}
        </Card>
      </Container>
    </ThemeProvider>
  );
};
export default ChangePassword;
