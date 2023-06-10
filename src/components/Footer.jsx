import { useState } from "react";
import { Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <footer style={{ marginTop: "20px" }}>
      {isHomePage && (
        <div className="photo-credit">
          Photo credit:{" "}
          <a
            target="_blank"
            href="https://unsplash.com/photos/AtPWnYNDJnM?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
            rel="noopener noreferrer"
          >
            Krists Luhaers on Unsplash
          </a>
        </div>
      )}
      <p>
        Developed by{" "}
        <Tooltip title="Go to developer website" arrow>
          <a
            href="https://ajaykc.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              color: isHovered ? "#4135dc" : "inherit",
              textDecoration: isHovered ? "underline" : "none",
              fontWeight: "bold",
            }}
          >
            Ajay KC
          </a>
        </Tooltip>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
