import React, { useState, useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Destination from "../../shared/models/DestinationsModel";
import DestinationService from "../../services/DestinationService";
import ImageGallery from "react-image-gallery";
import { endpoints } from "../../api";
import style from "./DestinationDetails.module.css";
interface IDestinationDetailsProps {}

const DestinationDetails: React.FunctionComponent<IDestinationDetailsProps> = (
  props
) => {
  const { id } = useParams();

  const [destinationData, setDestinationData] = React.useState<Destination>();

  const loadDestination = async () => {
    const response = await DestinationService.gertOneDestination(id as string);

    setDestinationData(response?.data?.data);
  };

  React.useEffect(() => {
    loadDestination();
  }, [id]);

  const images = React.useMemo(() => {
    return (
      destinationData?.images?.map((img) => ({
        original: `${endpoints?.serverBaseURL}/${img}`,
        thumbnail: `${endpoints?.serverBaseURL}/${img}`,
      })) || []
    );
  }, [destinationData]);
  var {
    address,
    category,
    eateries,
    explanation,
    guides,
    name,
    nearBy,
    ratings,
    status,
    stay,
    travelMode,
    timeToVisit,
  } = destinationData || {};

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <ImageGallery items={images} />;
          </Box>
        </Grid>
      </Grid>
      <hr />
      <Grid container>
        <Grid item xs={12} className={style.text}>
          <Typography> {name}</Typography>
          <Typography> Type: {category}</Typography>
          <Typography> Best Time to visit: {timeToVisit}</Typography>
          <Typography> Accomodation: {stay}</Typography>
          <Typography> Hotels to eat: {eateries}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DestinationDetails;
