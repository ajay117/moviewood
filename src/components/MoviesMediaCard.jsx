import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

export default function MoviesMediaCard({ movie }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const [fullContent, setFullContent] = useState(false);

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   setFullContent(true);
  // };

  const linkStyle = {
    textDecoration: "none",
  };
  return (
    <Card>
      <CardMedia
        sx={{ height: 400 }}
        image={imageUrl}
        title={movie.title + " image."}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="p">
          {!fullContent ? (
            movie.overview.length < 100 ? (
              movie.overview
            ) : (
              <span>
                {movie.overview.slice(0, 99)}{" "}
                <Link to={`/movie/${movie.id}`} style={linkStyle}>
                  ...Read More
                </Link>
              </span>
            )
          ) : (
            movie.overview
          )}
        </Typography>
        <Typography mt={2} variant="body2" color="p">
          <span style={{ fontWeight: "700", marginRight: "5px" }}>
            Release Date:
          </span>{" "}
          {movie.release_date}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>
            <b>{""}</b>
          </p>
          <Rating
            name="rating"
            value={movie.vote_average / 2}
            precision={0.1}
            readOnly
          />
        </div>
      </CardContent>
      <Link to={`/movie/${movie.id}`} style={linkStyle}>
        <div>
          <Button sx={{ width: "100%" }} variant="contained">
            More Info
          </Button>
        </div>
      </Link>
    </Card>
  );
}

MoviesMediaCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }),
};
