import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function MovieInfo() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
      },
      signal: signal,
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setMovieDetails(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{padding: "20px"}} maxWidth="md">
      {console.log(movieDetails)}
      <h2 className="text-center">{movieDetails.title}</h2>
      {/* <h3>ID: {id} </h3> */}

      <div className="box">
        <div  className="img">
          <img
            src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}
            alt=""
            style={{ maxHeight: "300px" }}
          />
        </div>

        <div>
          <p>{movieDetails.overview}</p>
          <p>
            <b>Homepage:</b>{" "}
            <a href={movieDetails.homepage} target="_blank">
              {movieDetails.homepage}
            </a>
          </p>
          <p>
            <b>Budget:</b> ${movieDetails.budget}
          </p>

          <p>
            <b>Release Date:-</b> {movieDetails.release_date}
          </p>
          <p>
            <b>Rating:</b> {movieDetails.vote_average}
          </p>
        </div>
      </div>
    </Container>
  );
}

export default MovieInfo;
