import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../services/AuthService";
import { errorToast, successToast } from "../../ui/toast/Toasts";

const theme = createTheme();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send email to the server
    AuthService.resetPassword(email)
      .then((response) => {
        successToast("Email sent");
        // alert("link sent");
      })
      .catch((err) => {
        console.error(err);
        errorToast("Could not sent");
        // alert("Could not sent");
      });
    // generate request
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
              Reset Password
            </Typography>
            <Typography>
              You will get a password reset link to your registered email
              address
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
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!email}
              >
                Reset
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{" Go to login page"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
};
export default ForgotPassword;
