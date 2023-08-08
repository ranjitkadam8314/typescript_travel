import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { yupResolver } from "@hookform/resolvers/yup"; // npm i @hookform/resolvers   npm install @hookform/resolvers yup
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"; // npm i react-hook-form
import User from "../../shared/models/UserModel";
import UserContext from "./UserContext";
import UserService from "../../services/UserService";
import { errorToast, successToast } from "../../ui/toast/Toasts";
import IconButton from "@mui/material/IconButton";
import ChangeIcon from "@mui/icons-material/ChangeCircle";
import { endpoints } from "../../api";

const userSchema = yup.object({
  name: yup.object().shape({
    first: yup.string().min(3, "Too Short").max(25, "Too large"),
    last: yup.string().min(3, "Too Short").max(25, "Too large"),
  }),
  mobile: yup.string().matches(/^[0-9]{10}$/, "Enter 10 digits only"),
  email: yup.string().email("Enter valid email address"),
});
interface IUserFormProps {}

interface IAvatarState {
  base64: string;
  binary?: File;
}
const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
  const { operation, initialCustomer, loadCustomers, handleClose } =
    React.useContext(UserContext);
  const [avatar, setAvatar] = React.useState<IAvatarState>({
    base64: "",
  });

  const {
    register,
    handleSubmit,

    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...initialCustomer,
    },
    resolver: yupResolver(userSchema),
  });

  const handleUser = (user: User) => {
    console.log("User: ", user);

    const fd = new FormData();
    if (user?.name?.first) fd.append("name.first", user?.name?.first);
    if (user?.name?.last) fd.append("name.last", user?.name?.last);
    if (user?.mobile) fd.append("mobile", user.mobile);
    if (user?.email) fd.append("email", user.email);
    if (user?.password) fd.append("password", user.password);
    if (user?.role) fd.append("role", user.role);
    if (user?.status) fd.append("status", user.status as unknown as string);
    if (avatar?.binary) fd.append("avatar", avatar?.binary);
    console.log("FormData: ", fd);

    // make API call
    if (operation == "edit") {
      UserService?.updateUser(initialCustomer?._id as string, fd) //   here i think fd not given data so empty data is going
        //UserService?.updateUser(initialCustomer?._id as string, user) // it is working
        .then((response) => {
          console.log(response);
          successToast("User updated");
          handleClose();
          loadCustomers();
        })
        .catch((err) => {
          console.log(err);
          errorToast("User not updated");
        });
    } else {
      UserService?.createUser(fd)
        .then((response) => {
          console.log(response);
          successToast("User created");
          handleClose();
          loadCustomers();
          console.log("formdata", fd);
        })
        .catch((err) => {
          console.error(err);
          errorToast("User not created");
        });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target?.files[0];
    //conversion
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      if (file)
        setAvatar({
          ...avatar,
          base64: fr.result as string,
          binary: file,
        });
    });
    if (file) fr.readAsDataURL(file);
  };

  return (
    <Container component="form" onSubmit={handleSubmit(handleUser)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            {...register("name.first")}
            error={
              touchedFields?.name?.first && errors?.name?.first ? true : false
            }
            helperText={
              touchedFields?.name?.first && errors?.name?.first
                ? errors?.name?.first.message
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            {...register("name.last")}
            error={
              touchedFields?.name?.last && errors?.name?.last ? true : false
            }
            helperText={
              touchedFields?.name?.last && errors?.name?.last
                ? errors?.name?.last.message
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Mobile"
            {...register("mobile")}
            error={touchedFields?.mobile && errors?.mobile ? true : false}
            helperText={
              touchedFields?.mobile && errors?.mobile
                ? errors?.mobile.message
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            {...register("email")}
            error={touchedFields?.email && errors?.email ? true : false}
            helperText={
              touchedFields?.email && errors?.email ? errors?.email.message : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            {...register("password")}
            error={touchedFields?.password && errors?.password ? true : false}
            helperText={
              touchedFields?.password && errors?.password
                ? errors?.password.message
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {/* avatar */}

          <Box
            component="figure"
            sx={{
              maxWidth: 180,
              border: "1px solid #9999",
              outline: "1px solid #0009",
              outlineOffset: 5,
              position: "relative",
            }}
          >
            <img
              style={{ width: "100%", height: 170 }}
              src={
                operation == "edit" && initialCustomer?.avatar
                  ? `${endpoints?.serverBaseURL}/${initialCustomer?.avatar}`
                  : avatar?.base64
                  ? avatar?.base64
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwaLDKaK49tsHmdMGOrmTdns5qiw080F2Yw&usqp=CAU"
              }
            />

            <IconButton sx={{ position: "absolute", right: 5, bottom: 5 }}>
              <label htmlFor="avatar">
                <ChangeIcon />
              </label>
            </IconButton>
            <input
              style={{ display: "none" }}
              type="file"
              id="avatar"
              onChange={handleAvatarChange}
            />
          </Box>
        </Grid>

        <Grid item container xs={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select labelId="role" label="Role" {...field}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select labelId="status" label="Status" {...field}>
                    <MenuItem value={0}>Inactive</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" type="submit">
            {" "}
            {operation == "edit" ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default UserForm;

// copy code ------------------------------------
// import * as React from "react";

// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import ChangeIcon from "@mui/icons-material/ChangeCircle";

// import { useForm, Controller } from "react-hook-form"; // npm i react-hook-form

// import { yupResolver } from "@hookform/resolvers/yup"; // npm i @hookform/resolvers

// import * as yup from "yup"; //npm i yup

// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import CustomerContext from "./CustomerContext";
// import User from "../../shared/models/UserModel";
// import UserService from "../../services/UserService";
// import { errorToast, successToast } from "../../ui/toast/Toast";

// const userSchema = yup.object({
//   name: yup.object({
//     first: yup.string().min(3, "Too Short").max(25, "Too Long"),
//     last: yup.string().min(3, "Too Short").max(25, "Too Long"),
//   }),
//   mobile: yup.string().matches(/^[0-9]{10}$/, "Enter 10 digits only"),
//   email: yup.string().email("Enter valid email address"),
// });

// interface IUserFormProps {}

// interface IAvatarState {
//   base64: string;
//   binary?: File;
// }

// const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
//   const { operation, initialCustomer } = React.useContext(CustomerContext);

//   const [avatar, setAvatar] = React.useState<IAvatarState>({ base64: "" });

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, touchedFields },
//   } = useForm({
//     defaultValues: {
//       ...initialCustomer,
//     },
//     resolver: yupResolver(userSchema),
//   });

//   const handleUser = (user: User) => {
//     console.log("User: ", user);

//     const fd = new FormData();

//     if (user?.name?.first) fd.append("name.first", user?.name?.first);
//     if (user?.name?.last) fd.append("name.last", user?.name?.last);
//     if (user?.mobile) fd.append("mobile", user?.mobile);
//     if (user?.email) fd.append("email", user?.email);
//     if (user?.password) fd.append("password", user?.password);
//     if (user?.role) fd.append("role", user?.role);
//     if (user?.status) fd.append("status", user?.status as unknown as string);
//     if (avatar?.binary) fd.append("avatar", avatar?.binary);

//     //make API calls
//     if (operation == "edit") {
//       UserService?.updateUser(initialCustomer?._id as string, fd)
//         .then((response) => {
//           console.log(response);
//           successToast("User updated");
//         })
//         .catch((err) => {
//           console.log(err);
//           errorToast("User not updated");
//         });
//     } else {
//       UserService?.createUser(fd)
//         .then((response) => {
//           console.log(response);
//           successToast("User created");
//         })
//         .catch((err) => {
//           console.log(err);
//           errorToast("User not created");
//         });
//     }
//   };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target?.files && e.target?.files[0];

//     const fr = new FileReader();

//     fr.addEventListener("load", () => {
//       if (file)
//         setAvatar({
//           ...avatar,
//           base64: fr.result as string,
//           binary: file,
//         });
//     });

//     if (file) fr.readAsDataURL(file);
//   };

//   return (
//     <Container component="form" onSubmit={handleSubmit(handleUser)}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="First Name"
//             {...register("name.first")}
//             error={
//               touchedFields?.name?.first && errors?.name?.first ? true : false
//             }
//             helperText={
//               touchedFields?.name?.first && errors?.name?.first
//                 ? errors?.name?.first.message
//                 : ""
//             }
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Last Name"
//             {...register("name.last")}
//             error={
//               touchedFields?.name?.first && errors?.name?.last ? true : false
//             }
//             helperText={
//               touchedFields?.name?.first && errors?.name?.last
//                 ? errors?.name?.last.message
//                 : ""
//             }
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Mobile"
//             {...register("mobile")}
//             error={touchedFields?.mobile && errors?.mobile ? true : false}
//             helperText={
//               touchedFields?.mobile && errors?.mobile
//                 ? errors?.mobile.message
//                 : ""
//             }
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Email"
//             type="email"
//             {...register("email")}
//             error={touchedFields?.email && errors?.email ? true : false}
//             helperText={
//               touchedFields?.email && errors?.email ? errors?.email.message : ""
//             }
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Password"
//             type="password"
//             {...register("password")}
//             error={touchedFields?.password && errors?.password ? true : false}
//             helperText={
//               touchedFields?.password && errors?.password
//                 ? errors?.password.message
//                 : ""
//             }
//           />
//         </Grid>

//         <Grid xs={12} md={6}>
//           {/* {/ avatar /} */}

//           <Box
//             component="figure"
//             sx={{
//               maxWidth: 180,
//               height: 170,
//               border: "1px solid #fff",
//               outline: "1px solid #000",
//               outlinedOffset: 5,

//               position: "relative",
//             }}
//           >
//             <img
//               style={{ width: "100%", height: 170 }}
//               src={
//                 avatar?.base64
//                   ? avatar?.base64
//                   : "https://www.pngkit.com/png/detail/518-5186670_login-icon-login-signup-icon-png.png"
//               }
//             />

//             <IconButton sx={{ position: "absolute", right: 5, bottom: 5 }}>
//               <label htmlFor="avatar">
//                 <ChangeIcon sx={{ color: "white", cursor: "pointer" }} />
//               </label>
//             </IconButton>
//             <input
//               style={{ display: "none" }}
//               type="file"
//               id="avatar"
//               onChange={handleAvatarChange}
//             />
//           </Box>
//         </Grid>

//         <Grid item container xs={12} md={6} spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="status">Status</InputLabel>
//               <Controller
//                 name="status"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <Select labelId="status" label="Status" {...field}>
//                     <MenuItem value={0}>Inactive</MenuItem>
//                     <MenuItem value={1}>Active</MenuItem>
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="role">Role</InputLabel>

//               <Controller
//                 name="role"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <Select labelId="role" label="Role" {...field}>
//                     <MenuItem value="admin">Admin</MenuItem>
//                     <MenuItem value="customer">Customer</MenuItem>
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" fullWidth>
//             {operation == "edit" ? "Update" : "Create"}
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default UserForm;
