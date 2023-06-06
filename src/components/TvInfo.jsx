import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Header from "./Header";

function TvInfo() {
  let { id } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [videos, setTvVideos] = useState([]);
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
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setTvShows(response))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTvVideos(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />

      <Container sx={{ padding: "20px" }} maxWidth="md">
        {console.log(videos)}
        <h2 className="text-center">{tvShows.name}</h2>
        {/* <h3>ID: {id} </h3> */}

        <div className="box">
          <div className="img">
            <img
              src={"https://image.tmdb.org/t/p/w500" + tvShows.poster_path}
              alt=""
              style={{ maxHeight: "300px" }}
            />
          </div>

          <div>
            <p>{tvShows.overview}</p>
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
    </div>
  );
}

export default TvInfo;
