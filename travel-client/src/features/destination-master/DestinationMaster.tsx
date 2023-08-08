import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AddEditDestination from "./AddEditDestination";
import DestinationListing from "./DestinationListing";
interface IDestinationMasterProps {}

const DestinationMaster: React.FunctionComponent<IDestinationMasterProps> = (
  props
) => {
  return (
    <>
      <Routes>
        <Route path="" element={<DestinationListing />} />
        <Route
          path="add-edit/:operation/:id"
          element={<AddEditDestination />}
        />
      </Routes>
    </>
  );
};

// http://localhost:3000/secured/destinations/add-edit/add/0

export default DestinationMaster;
