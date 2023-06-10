import Box from "@mui/material/Box";
import logo from "../assets/logo.jpeg";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

function Header() {
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
        <a href="/">
          <img className="logo" src={logo} alt="" />
        </a>
      </Box>

      <Tooltip title="Go back to home page" arrow>
        <Button variant="text" sx={{ fontSize: { xs: "14px", sm: "15px" } }}>
          <Link to="/" style={{ display: "flex",alignItems: "center" ,textDecoration: "none" }}>
            <HomeIcon style={{ marginRight: "1px" }} />
            Homepage
          </Link>
        </Button>
      </Tooltip>
    </Box>
  );
}

export default Header;
