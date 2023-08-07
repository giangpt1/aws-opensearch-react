import { Grid, Typography } from "@mui/material";
import React from "react";

const EmptyProductsList = () => {
  return (
    <Grid container item justifyContent="center">
      <Typography>No products found.</Typography>
    </Grid>
  );
};

export default EmptyProductsList;
