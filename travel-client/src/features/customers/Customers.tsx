import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserService from "../../services/UserService";
import User from "../../shared/models/UserModel";
import MuiDatatable, { MUIDataTableColumn } from "mui-datatables"; // npm i mui-datatables     // npm i --save-dev @types/mui-datatables
import Button from "@mui/material/Button";
import UserContext from "./UserContext";
import AddEditUser from "./AddEditUsers";
import { endpoints } from "../../api";
import Swal from "sweetalert2"; // npm i sweetalert2

import { useSelector } from "react-redux";
import { selectAuth } from "../../app/slices/authSlice";
interface ICustomersProps {}

const Customers: React.FunctionComponent<ICustomersProps> = (props) => {
  const [customerList, setCustomerList] = React.useState<User[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [operation, setOperation] = React.useState<string>("add");
  const [initialCustomer, setInitialCustomer] = React.useState<User>();

  const loggedUser = useSelector(selectAuth);

  const handleDilogClose = () => setOpenDialog(false);

  const loadCustomers = async () => {
    const response = await UserService.getAllUsers();
    if (response?.data?.data) setCustomerList(response?.data?.data);
    // console.log("customers: ", response);
    console.log("responsedata: ", response?.data?.data);
  };
  React.useEffect(() => {
    loadCustomers();
  }, []);

  const addUser = () => {
    setOperation("add");
    setInitialCustomer({
      name: {
        first: "",
        last: "",
      },
      mobile: "",
      email: "",
      status: 1,
      avatar: "",
      role: "customer",
      password: "",
    });
    setOpenDialog(true);
    console.log("Customers: ", customerList);
  };
  const editUser = (user: User) => {
    setOperation("edit");
    setInitialCustomer(user);
    setOpenDialog(true);
  };
  const deleteUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then((response) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            loadCustomers();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Not Deleted!", "User has not been deletd.", "error");
          });
      }
    });
  };

  const columns: MUIDataTableColumn[] = [
    {
      label: "ID",
      name: "userId",
      options: {
        sort: true,
        filter: false,
      },
    },

    {
      label: "Avatar",
      name: "avatar",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return (
            <img
              style={{ width: 100, height: 100 }}
              src={
                user?.avatar
                  ? `${endpoints?.serverBaseURL}/${user?.avatar}`
                  : "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png"
              }
            />
          );
        },
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return `${user?.name?.first} ${user?.name?.last}`;
        },
      },
    },
    {
      label: "Mobile",
      name: "mobile",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        sort: true,
        filter: false,
      },
    },

    // addition

    {
      label: "Role",
      name: "role",
      options: {
        sort: false,
        filter: true,
        customBodyRender: (role) => {
          return role === "customer" ? "Customer" : "Admin";
          // return role;
        },
      },
    },

    {
      label: "Status",
      name: "status",
      options: {
        sort: false,
        filter: true,
        customBodyRender: (status) => {
          return status === 1 ? "Active" : "Inactive";
          // return status;
        },
      },
    },

    {
      label: "Action",
      name: "action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteUser(user?._id as string)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <UserContext.Provider
        value={{
          open: openDialog,
          handleClose: handleDilogClose,
          operation,
          loadCustomers,
          initialCustomer,
        }}
      >
        <AddEditUser />
      </UserContext.Provider>
      <Button variant="contained" onClick={addUser}>
        New++
      </Button>
      <MuiDatatable
        title="Customer List"
        // data={customerList?.filter((u) => u?._id != loggedUser?._id)}
        // data={customerList?.map((u, i) => u)}
        data={customerList}
        columns={columns}
      />
    </>
  );
};

export default Customers;
