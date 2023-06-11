import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function TvMediaCard({ tvshow }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + tvshow.poster_path;
  const [fullContent, setFullContent] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setFullContent(true);
  };

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Card>
      <CardMedia
        sx={{ height: 400 }}
        image={imageUrl}
        title={tvshow.original_name + " image."}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {tvshow.original_name}
        </Typography>
        <Typography variant="body2" color="p">
          {!fullContent ? (
            tvshow.overview.length < 100 ? (
              tvshow.overview
            ) : (
              <span>
                {tvshow.overview.slice(0, 99)}{" "}
                <a href="#" onClick={handleClick}>
                  <ArrowCircleRightIcon sx={{ verticalAlign: "middle" }} />
                </a>
              </span>
            )
          ) : (
            tvshow.overview
          )}
        </Typography>
        <Typography mt={2} variant="body2" color="p">
          <span style={{ fontWeight: "700", marginRight: "5px" }}>
            Release Date:
          </span>{" "}
          {tvshow.first_air_date}
        </Typography>{" "}
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>
            <b>{""}</b>
          </p>
          <Rating
            name="rating"
            value={tvshow.vote_average / 2}
            precision={0.1}
            readOnly
          />
        </div>
      </CardContent>

      <Link to={`/tvshow/${tvshow.id}`} style={linkStyle}>
        <div>
          <Button sx={{ width: "100%" }} variant="contained">
            More Info
          </Button>
        </div>
      </Link>
    </Card>
  );
}

TvMediaCard.propTypes = {
  tvshow: PropTypes.shape({
    original_name: PropTypes.string,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    first_air_date: PropTypes.string,
  }),
};
