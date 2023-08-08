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

import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { errorToast } from "../../ui/toast/Toasts";
import { useDispatch } from "react-redux";
import { addUser } from "../../app/slices/authSlice";
// import { toast } from "react-toastify";

const theme = createTheme();

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // generate request
    AuthService.userLogin(user)
      .then((response) => {
        console.log("Response", response);

        //store the token in the sessionStorage
        sessionStorage.setItem(
          "accesstoken",
          response?.headers["x-accesstoken"]
        );
        sessionStorage.setItem(
          "refreshtoken",
          response?.headers["x-refreshtoken"]
        );
        // add the user to redux state
        dispatch(addUser(response?.data?.data));
        // navigate to dashboard
        navigate("/secured");
      })
      .catch((err) => {
        console.error(err);
        const message =
          err?.response.data?.message || "Could not login, try again!";
        console.log("Error Message", message);
        errorToast("Could not login, try again!");
        // toast.error(message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card sx={{ padding: 2, marginTop: 4 }}>
          <CssBaseline />
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
              Sign in
            </Typography>
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
};
export default LoginPage;
