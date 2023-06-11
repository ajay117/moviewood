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
import Footer from "./Footer";
import Image from "./../assets/blank_img.webp";

function MovieInfo() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  const videoLink = "https://www.youtube.com/watch?v=";
  let budget = movieDetails.budget || 0;
  const linkStyle = {
    textDecoration: "none",
  };

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
        {videos.length > 0 ? (
          <Grid container spacing={{ xs: 2, lg: 4 }}>
            {videos.map(
              (item, index) =>
                index < 5 && (
                  <Grid key={item.id} item xs={12} sm={6} lg={4}>
                    <div className="iframe-container">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.key}`}
                        className="responsive-iframe"
                      ></iframe>
                    </div>
                    <p>{item.name}</p>
                    <Divider sx={{ borderWidth: 2 }} />
                  </Grid>
                )
            )}
          </Grid>
        ) : (
          <p style={{ paddingBottom: "20px" }} className="text-center">
            No Videos
          </p>
        )}

        <h3 style={{ textAlign: "center" }}>Cast:</h3>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          {cast.map((item, index) => (
            <Grid key={item.id} item xs={12} sm={6} lg={4}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ textAlign: "center", height: "100%" }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                          : Image
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div style={{ flex: "0 0 auto", marginTop: "auto" }}>
                  <p>
                    <b>Original name:</b> {item.name}
                  </p>
                  <p>
                    <b>Character:</b> {item.character}
                  </p>

                  <Link to={`/people/${item.id}`} style={linkStyle}>
                    <div>
                      <Button
                        sx={{ width: "100%", textDecoration: "none" }}
                        variant="contained"
                      >
                        More Info
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default MovieInfo;
