import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import logo from "../assets/logo.jpeg";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Header from "./Header";
import formatNumber from "../modules/formatNumber";

function MovieInfo() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  const videoLink = "https://www.youtube.com/watch?v=";
  let budget = movieDetails.budget || 0;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
    },
    signal: signal,
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.credits);
        setVideos(response.videos.results);
        setMovieDetails(response);
        setCast(response.credits.cast);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />

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
              <b>Budget:</b> $ {formatNumber(budget)}
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

        <h3 style={{ textAlign: "center" }}>Cast:</h3>
        <div className="grid-container">
          {cast.map((item, index) => (
            <div key={item.id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  alt=""
                />
              </div>
              <p>
                <b>Original name:</b> {item.name}
              </p>
              <p>
                <b>Character:</b> {item.character}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MovieInfo;
