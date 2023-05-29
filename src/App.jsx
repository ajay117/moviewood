import CenteredTabs from "./components/CenteredTabs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import MenuBar from "./components/MenuBar";
import MoviesMediaCard from "./components/MoviesMediaCard";
import PeoplesMediaCard from "./components/PeoplesMediaCard";
import TvMediaCard from "./components/TvMediaCard";
import Loader from "./components/Loader";

import { Box, Button } from "@mui/material";

function App() {
  const [showContent, setShowContent] = useState("movie");
  const [contentList, setContentList] = useState([]);
  const [tab, setTab] = useState("now playing");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const previousPageStateRef = useRef(1);

  const changeContent = (event) => {
    let link = event.target.innerText.toLowerCase();
    if (link === "tv") setTab("airing today");
    if (link === "movie") setTab("now playing");
    if (link === "person" && showContent !== "person") {
      setTab("popular");
    }
    if (link !== showContent) {
      setContentList([]);
    }
    // if (link === "person")
    setShowContent(link);
    setValue(0);
  };

  const changeTab = (event) => {
    setTab(event.target.innerText.toLowerCase());
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    changeTab(event);
  };

  const nextPage = () => {
    setPage((previousPage) => previousPage + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let tabParam = tab;
    if (tab === "now playing") {
      tabParam = "now_playing";
    } else if (tab === "top rated") {
      tabParam = "top_rated";
    } else if (tab === "airing today") {
      tabParam = "airing_today";
    } else if (tab === "on the air") {
      tabParam = "on_the_air";
    }

    fetch(
      `https://api.themoviedb.org/3/${showContent}/${tabParam}?language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
        },
        signal: signal, // Pass the signal to the fetch options
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (previousPageStateRef.current !== page) {
          setContentList((previousState) => [
            ...previousState,
            ...response.results,
          ]);
        } else {
          setContentList(response.results);
        }
        previousPageStateRef.current = page;
      })
      .catch((err) => console.error(err));

    return () => {
      // Abort the fetch request when the component unmounts
      controller.abort();
    };
  }, [showContent, tab, page]);

  return (
    <div>
      <MenuBar handleClick={changeContent} />
      {contentList.length < 1 ? (
        <Loader />
      ) : (
        <Container maxWidth="md">
          <CenteredTabs
            handleChange={handleTabChange}
            value={value}
            tab={tab}
            changeTab={changeTab}
            content={showContent}
          />
          <Grid container spacing={2}>
            {showContent === "movie" && (
              <>
                {contentList.map((movie, index) => (
                  <Grid key={index} item sm={6} xs={12}>
                    <MoviesMediaCard movie={movie} />
                  </Grid>
                ))}
              </>
            )}

            {showContent === "person" && (
              <>
                {contentList.map((people, index) => (
                  <Grid key={index} item sm={6} xs={12}>
                    <PeoplesMediaCard people={people} />
                  </Grid>
                ))}
              </>
            )}

            {showContent === "tv" && (
              <>
                {contentList.map((tvshow, index) => (
                  <Grid key={index} item sm={6} xs={12}>
                    <TvMediaCard tvshow={tvshow} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>

          <Box sx={{ marginTop: "30px", textAlign: "center" }}>
            <Button
              sx={{ marginBottom: "10px", width: "200px" }}
              onClick={nextPage}
              variant="contained"
            >
              See More
            </Button>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default App;
