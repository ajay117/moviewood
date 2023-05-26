import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from "../assets/logo.jpeg";

export default function MenuBar({ handleClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <div>
        <img className="logo"  src={logo} alt=""></img>
      </div>
      <div>
        <Button onClick={handleClick} variant="text">
          movie
        </Button>
        <Button onClick={handleClick} variant="text">
          tv
        </Button>
        <Button onClick={handleClick} variant="text">
          person
        </Button>
      </div>
    </Box>
  );
}

MenuBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
