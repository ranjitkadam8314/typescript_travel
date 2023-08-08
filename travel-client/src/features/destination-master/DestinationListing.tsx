import * as React from "react";

import DestinationService from "../../services/DestinationService";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Destination from "../../shared/models/DestinationsModel";
import { useNavigate } from "react-router-dom";

interface IDestinationListingProps {}

const DestinationListing: React.FunctionComponent<IDestinationListingProps> = (
  props
) => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = React.useState<Destination[]>([]);

  const loadDestinations = async () => {
    const response = await DestinationService?.getAllDestinations();
    setDestinations(response?.data?.data);
    console.log("setdestinations: ", response?.data?.data);
  };

  React.useEffect(() => {
    loadDestinations();
  }, []);

  const addDestination = () => {
    navigate(`/secured/destinations/add-edit/add/0`);
  };
  const editDestination = (id: string) => {
    navigate(`/secured/destinations/add-edit/edit/${id}`);
  };
  const deleteDestination = (id: string) => {
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
        DestinationService.deleteDestination(id)
          .then((response) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            loadDestinations();
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
      label: "Name",
      name: "name",
      options: {
        sort: true,
        filter: false,
      },
    },

    {
      label: "Category",
      name: "category",
      options: {
        sort: true,
        filter: true,
      },
    },

    {
      label: "City",
      name: "address",
      options: {
        sort: true,
        filter: true,
        customBodyRender: (address) => address?.city,
      },
    },

    {
      label: "Ratings",
      name: "ratings",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const ratings = destinations[index]?.ratings;

          let rate = "";
          const sum =
            Array.isArray(ratings) &&
            ratings?.reduce((prev: number, rating: any) => {
              return rating?.rating ? prev + rating?.rating : prev;
            }, 0);
          const avg = (sum ? sum : 0) / ratings?.length;
          return avg ? avg : "NA";
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
          return status == 1 ? "Active" : "Inactive";
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
          const user = destinations[index];
          return (
            <>
              <IconButton
                color="primary"
                onClick={() => editDestination(user?._id as string)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteDestination(user?._id as string)}
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
      <Button variant="contained" onClick={addDestination}>
        New++
      </Button>
      <MUIDataTable
        title="Destination List"
        columns={columns}
        data={destinations}
      />
    </>
  );
};

export default DestinationListing;
