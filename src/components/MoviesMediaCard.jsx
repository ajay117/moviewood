import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MoviesMediaCard({ movie }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title={movie.title + " image."}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="p">
          {movie.overview.length < 100
            ? movie.overview
            : movie.overview.slice(0, 99) + " ..."}
        </Typography>
        <Typography mt={2} variant="body2" color="p">
          <span style={{ fontWeight: "700", marginRight: "5px" }}>
            Release Date:
          </span>{" "}
          {movie.release_date}
        </Typography>
      </CardContent>
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
