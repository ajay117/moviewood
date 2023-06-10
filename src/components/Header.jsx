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
        <img className="logo" src={logo} alt="" />
      </Box>

      <Tooltip title="Go back to home page" arrow>
        <Button variant="text" sx={{ fontSize: { xs: "12px", sm: "15px" } }}>
          <Link to="/" style={{ display: "flex" }}>
            <HomeIcon style={{ marginRight: "1px" }} />
            Go Home
          </Link>
        </Button>
      </Tooltip>
    </Box>
  );
}

export default Header;
