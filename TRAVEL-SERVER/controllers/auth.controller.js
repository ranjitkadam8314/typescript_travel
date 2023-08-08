const { compare } = require("../helpers/encryption");
const { pickUser, UserModel } = require("../models/user.model");
const { createToken, verifyToken } = require("../helpers/token");
const sendemail = require("../helpers/email");

module.exports = {
  userLogin(req, res) {
    const handleErrorResponse = (status, message, error) => {
      res.status(status).send({ message, error });
    };

    const { email, password } = req.body;
    // validate the email
    UserModel.findOne({ email, status: 1 })
      .then((result) => {
        if (!result) {
          //invalid email
          return handleErrorResponse(404, "Invalid email or user is disabled");
        }
        //validate password
        // compare( => { // check this compare why it is not working
        if (compare(password, result?.password)) {
          // if (password == result.password) {
          // valid password
          // generate token
          const accesstoken = createToken(
            {
              id: result?._id,
              role: result?.role,
              type: "access",
            },
            15 * 60
          );

          const refreshtoken = createToken(
            {
              id: result?._id,
              role: result?.role,
              type: "refresh",
            },
            30 * 60
          );
          // add token in response

          res.set("x-accesstoken", accesstoken);
          res.set("x-refreshtoken", refreshtoken);
          // send response

          res
            .status(200)
            .send({ message: "Login successful", data: pickUser(result) });
        } else {
          // invalid password
          return handleErrorResponse(404, "Invalid password");
        }
        // });
      })
      .catch((err) => {
        // invalid email
        return handleErrorResponse(404, "Could not ");
      });
  }, // useLogin

  validateToken(req, res) {
    const { token } = req.body;
    const payload = verifyToken(token);
    if (payload) {
      //valid token
      res
        .status(200)
        .send({ message: "Token is valid", data: { id: payload.id } });
    } else {
      // invalid token
      res.status(400).send({ message: "Token is invalid", error: null });
    }
  }, // validateToken

  passwordResetLink(req, res) {
    const { email } = req.body;

    UserModel.findOne({ email, status: 1 })
      .then((result) => {
        if (result?._id) {
          // user is available
          // generate a link to change the password
          // http://localhost:3000/change-password/token

          const domain = req.headers.origin;
          // console.log("domain: ", domain);
          // generate token
          const token = createToken({ id: result?._id, email }, 10 * 60);
          if (!token) return Promise.reject("token not generated");
          const link = `${domain}/change-password/${token}`;

          console.log("reset link: ", link);

          const textBody = `
          Copy the below link and paste in address bar of the web browser.
          Link is valid only for 10 minutes.
          ${link}`;

          const htmlBody = `<div> 
             <p> Copy the below link and paste in address bar of the web browser. </p>
             <p> Link is valid only for 10 minutes. </p>
             <a href= "${link}"> Reset password </a>
            </div>`;

          sendemail(
            email,
            "kadamranjit529@gmail.com",
            "Password Reset Link",
            textBody,
            htmlBody
          );

          res.status(200).send({ message: "the password link sent", data: {} });
        } else {
          // user is not available
          return Promise.reject("Invalid email id");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "invalid email address", error: err });
      });
  }, // passwordResetLink

  refreshToken(req, res) {
    const { token } = req?.body;
    const payload = verifyToken(token);

    if (payload) {
      // generate access token
      const accesstoken = createToken({
        _id: payload?._id, // check it later
        role: payload?.role,
        type: "access",
      });
      res.status(200).send({ message: "Token generated", data: accesstoken });
    } else {
      res
        .status(403)
        .send({ message: "Login to the app, session expired!", error: null });
    }
  },
  //
};
