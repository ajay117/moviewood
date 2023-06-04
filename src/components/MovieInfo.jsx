import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

function MovieInfo() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  const videoLink = "https://www.youtube.com/watch?v=";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
    },
    signal: signal,
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setMovieDetails(response))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVideos(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{ padding: "20px" }} maxWidth="md">
      <h2 className="text-center">{movieDetails.title}</h2>

      <div className="box">
        <div className="img">
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

      <h3 style={{ textAlign: "center" }}>Related videos:</h3>
      <div className="grid-container">
        {videos.map(
          (item, index) =>
            index < 5 && (
              <div
                style={{ border: "1px solid black", padding: "20px" }}
                key={item.id}
                className="grid-container_child"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                ></iframe>
                <p>{item.name}</p>
                <Divider sx={{ borderWidth: 2 }} />
              </div>
            )
        )}
      </div>
    </Container>
  );
}

export default MovieInfo;
