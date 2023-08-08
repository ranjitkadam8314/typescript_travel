import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IInput } from "./AddEditDestination";

interface IDestinationLocationProps {
  register: any;
  Input: React.FunctionComponent<IInput>;
}

const DestinationLocation: React.FunctionComponent<
  IDestinationLocationProps
> = ({ register, Input }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input label="Street" name="address.street" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="City" name="address.city" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="State" name="address.state" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Country" name="address.country" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Pincode" name="address.pincode" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Latitude" name="address.latitude" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Longitude" name="address.longitude" />
        </Grid>
      </Grid>
    </>
  );
};
export default DestinationLocation;
