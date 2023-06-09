import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function PeoplesMediaCard({ people }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + people.profile_path;
  return (
    <Card>
      <CardMedia
        sx={{ height: 400 }}
        image={imageUrl}
        title={people.name + " image."}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {people.name}
        </Typography>
        <Typography mt={2} variant="body2" color="p">
          <span style={{ fontWeight: "700", marginRight: "5px" }}>
            Known For:
          </span>
          {people.known_for_department}
        </Typography>
      </CardContent>{" "}
      <Link to={`/people/${people.id}`}>
        <div>
          <Button sx={{ width: "100%" }} variant="contained">
            See More
          </Button>
        </div>
      </Link>
    </Card>
  );
}

PeoplesMediaCard.propTypes = {
  people: PropTypes.shape({
    name: PropTypes.string,
    profile_path: PropTypes.string,
    known_for_department: PropTypes.string,
  }),
};
