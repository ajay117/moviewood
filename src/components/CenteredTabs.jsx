// import * as React from "react";
import { PropTypes } from "prop-types";
// import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs({
  content,
  value,
  handleChange,
}) {
  const movieTabs = ["now playing", "top rated", "popular", "upcoming"];
  const tvTabs = ["airing today", "top rated", "on the air", "popular"];
  const personTabs = ["popular"];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        {content === "movie" &&
          movieTabs.map((item, index) => <Tab label={item} key={index} />)}

        {content === "tv" &&
          tvTabs.map((item, index) => <Tab label={item} key={index} />)}

        {content === "person" &&
          personTabs.map((item, index) => <Tab label={item} key={index} />)}

        {/* {content === "person" && <Tab label="Popular" />} */}
      </Tabs>
    </Box>
  );
}

CenteredTabs.propTypes = {
  content: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
