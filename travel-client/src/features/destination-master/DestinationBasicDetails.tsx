import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IInput } from "./AddEditDestination";
import { Grid } from "@mui/material";

interface IDestinationBasicDetailsProps {
  errors: any;
  touchedFields: any;
  register: any;
  Input: React.FunctionComponent<IInput>;
}

const DestinationBasicDetails: React.FunctionComponent<
  IDestinationBasicDetailsProps
> = ({ register, errors, touchedFields, Input }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Input label="Name" name="name" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Explanation" name="explanation" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Time to visit" name="timetoVisit" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="category"> Category</InputLabel>
          <Select label="Category" {...register("category")}>
            <MenuItem value="historical"> Historical</MenuItem>
            <MenuItem value="devotional"> Devotional</MenuItem>
            <MenuItem value="beach"> Beach</MenuItem>
            <MenuItem value="hills"> Hills</MenuItem>
            <MenuItem value="garden"> Garden</MenuItem>
            <MenuItem value="nature"> Nature</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <Input label="Near By" name="nearBy" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Stay" name="stay" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Eateries" name="eateries" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Travel Mode" name="travelMode" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input label="Guides" name="guides" />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="status"> Status</InputLabel>
          <Select label="Status" {...register("status")}>
            <MenuItem value={0}> Inactive</MenuItem>
            <MenuItem value={1}> Active</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DestinationBasicDetails;
