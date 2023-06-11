import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import Header from "./Header";
import Image from "./../assets/blank_img.webp";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function TvInfo() {
  let { id } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [videos, setTvVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const linkStyle = {
    textDecoration: "none",
  };

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

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=credits,videos`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setTvShows(response);
        setTvVideos(response.videos.results);
        setCast(response.credits.cast);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />

      <Container sx={{ padding: "20px" }} maxWidth="md">
        {/* {console.log(videos)} */}
        <h2 className="text-center">{tvShows.name}</h2>
        {/* <h3>ID: {id} </h3> */}

        <div className="box">
          <div className="img">
            <img
              src={"https://image.tmdb.org/t/p/w500" + tvShows.poster_path}
              alt=""
              style={{ maxHeight: "300px", marginBottom: "10px" }}
            />
          </div>

          <div>
            <p style={{marginTop: "0px"}}>{tvShows.overview}</p>
            <p>
              <b>Homepage:</b>{" "}
              <a href={tvShows.homepage} target="_blank">
                {tvShows.homepage}
              </a>
            </p>

            <p>
              <b>First Air Date:-</b> {tvShows.first_air_date}
            </p>
            <p>
              <b>Rating:</b> {tvShows.vote_average}
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
          <p className="text-center" style={{ paddingBottom: "20px" }}>
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

export default TvInfo;
