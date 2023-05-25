import CenteredTabs from "./components/CenteredTabs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MoviesMediaCard from "./components/MoviesMediaCard";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [show, setShow] = useState("movies");
  const [moviesList, setMoviesList] = useState([]);
  const [tab, setTab] = useState("now playing");
  // const tabs = ["now playing", "popular", "top rated", "upcoming", "trending"];

  const changeTab = (event) => {
    setTab(event.target.innerText.toLowerCase());
  };

  useEffect(() => {
    let tabParam = tab;

    if (tab === "now playing") {
      tabParam = "now_playing";
    } else if (tab === "top rated") {
      tabParam = "top_rated";
    }

    let url = `https://api.themoviedb.org/3/movie/${tabParam}?language=en-US&page=1`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setMoviesList(response.results))
      .catch((err) => console.error(err));
  }, [tab]);

  return (
    <div>
      <Container maxWidth="md">
        <CenteredTabs changeTab={changeTab} />
        <Grid container spacing={2}>
          {show === "movies" && (
            <>
              {moviesList.map((movie, index) => (
                <Grid key={index} item sm={6} xs={12}>
                  <MoviesMediaCard movie={movie} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
