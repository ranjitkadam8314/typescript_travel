import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SignupForm from "./SignupForm";
import UserContext from "../customers/UserContext";

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const { open, handleClose, operation } = React.useContext(UserContext);
  return (
    <>
      <h3> Sign up Page </h3>
      <Dialog open={true} onClose={handleClose} maxWidth="md">
        {/* <DialogTitle> {operation == "add" && "Add"} User</DialogTitle> */}
        <DialogTitle> Register Form </DialogTitle>
        <DialogContent>
          <SignupForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpPage;
