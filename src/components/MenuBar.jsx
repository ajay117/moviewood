import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function MenuBar({ handleClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Button onClick={handleClick} variant="text">
        movie
      </Button>
      <Button onClick={handleClick} variant="text">
        tv
      </Button>
      <Button onClick={handleClick} variant="text">
        person
      </Button>
    </Box>
  );
}

MenuBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
