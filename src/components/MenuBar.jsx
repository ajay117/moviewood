import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from "../assets/logo.jpeg";
import Image from "./../assets/blank_img.webp"


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
      <Box sx={{ width: { xs: "150px", lg: "180px" } }}>
        <img className="logo" src={logo} alt="" />
      </Box>
      <div>
        <Button
          onClick={handleClick}
          variant="text"
          sx={{ fontSize: { xs: "12px", sm: "15px" } }}
        >
          movie
        </Button>
        <Button
          onClick={handleClick}
          variant="text"
          sx={{ fontSize: { xs: "12px", sm: "15px" } }}
        >
          tv
        </Button>
        <Button
          onClick={handleClick}
          variant="text"
          sx={{ fontSize: { xs: "12px", sm: "15px" } }}
        >
          person
        </Button>
      </div>
    </Box>
  );
}

MenuBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
