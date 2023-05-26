import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function TvMediaCard({ tvshow }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + tvshow.poster_path;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title={tvshow.original_name + " image."}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {tvshow.original_name}
        </Typography>
        <Typography variant="body2" color="p">
          {tvshow.overview.length < 100
            ? tvshow.overview
            : tvshow.overview.slice(0, 99) + " ..."}
        </Typography>
        <Typography mt={2} variant="body2" color="p">
          <span style={{ fontWeight: "700", marginRight: "5px" }}>
            Release Date:
          </span>{" "}
          {tvshow.first_air_date}
        </Typography>
      </CardContent>
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
