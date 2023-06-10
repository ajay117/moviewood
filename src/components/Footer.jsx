import { useState } from "react";
import { Tooltip } from "@mui/material";

function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <footer style={{ marginTop: "20px" }}>
      <div className="photo-credit">
        Thanks to the HeroSection image by{" "}
        <a
          target="_blank"
          href="https://unsplash.com/photos/AtPWnYNDJnM?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
        >
          Krists Luhaers on unsplash
        </a>
      </div>
      <p>
        Developed by{" "}
        <Tooltip title="Go to developer website" arrow>
          <a
            href="https://ajaykc.netlify.app/"
            target="_blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              color: isHovered ? "#4135dc" : "inherit",
              textDecoration: isHovered ? "underline" : "none",
            }}
          >
            Ajay KC
          </a>
        </Tooltip>
        .
      </p>
    </footer>
  );
}

export default Footer;
