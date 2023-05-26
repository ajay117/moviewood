// import * as React from "react";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs({ changeTab, content, tab, link }) {
  const [value, setValue] = useState(0);

  const movieTabs = ["now playing", "top rated", "popular", "upcoming"];
  const tvTabs = ["airing today", "top rated", "on the air", "popular"];
  const personTabs = ["popular"];

  let arr;
  if (content === "movie") {
    arr = movieTabs;
  } else if (content === "tv") {
    arr = tvTabs;
  } else if (content === "person") {
    arr = personTabs;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeTab(event);
  };

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
  changeTab: PropTypes.func.isRequired,
};
