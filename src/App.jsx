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
import HeroSection from "./components/HeroSection";
function App() {
  const [showContent, setShowContent] = useState("movie");
  const [contentList, setContentList] = useState([]);
  const [tab, setTab] = useState("now playing");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const previousPageStateRef = useRef(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowContent("search");
    setSearchQuery(searchInput);
    setTab("multi");
    setSearchInput("");
  };

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

    const url =
      showContent !== "search"
        ? `https://api.themoviedb.org/3/${showContent}/${tabParam}?language=en-US&page=${page}`
        : `https://api.themoviedb.org/3/${showContent}/${tabParam}?query=${searchQuery}&include_adult=false&language=en-US&$page=1`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
      },
      signal: signal, // Pass the signal to the fetch options
    })
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
  }, [showContent, tab, page, searchQuery]);

  return (
    <div>
      <MenuBar handleClick={changeContent} />
      <HeroSection
        input={searchInput}
        handleSubmit={handleSubmit}
        handleChange={handleSearchInputChange}
      />
      {contentList.length < 1 ? (
        <Loader />
      ) : (
        <Container sx={{}} maxWidth="md">
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
                  <Grid
                    key={index}
                    item
                    lg={4}
                    xl={3}
                    sm={6}
                    xs={12}
                    sx={{ display: "flex", justifyContent: { xs: "center" } }}
                  >
                    <MoviesMediaCard movie={movie} />
                  </Grid>
                ))}
              </>
            )}
            {showContent === "person" && (
              <>
                {contentList.map((people, index) => (
                  <Grid
                    key={index}
                    item
                    lg={4}
                    xl={3}
                    sm={6}
                    xs={12}
                    sx={{ display: "flex", justifyContent: { xs: "center" } }}
                  >
                    <PeoplesMediaCard people={people} />
                  </Grid>
                ))}
              </>
            )}
            {showContent === "tv" && (
              <>
                {contentList.map((tvshow, index) => (
                  <Grid
                    key={index}
                    item
                    lg={4}
                    xl={3}
                    sm={6}
                    xs={12}
                    sx={{ display: "flex", justifyContent: { xs: "center" } }}
                  >
                    <TvMediaCard tvshow={tvshow} />
                  </Grid>
                ))}
              </>
            )}

            {showContent === "search" && (
              <>
                {contentList.map((obj, index) => (
                  <Grid
                    key={index}
                    item
                    lg={4}
                    xl={3}
                    sm={6}
                    xs={12}
                    sx={{ display: "flex", justifyContent: { xs: "center" } }}
                  >
                    {/* Render specific card according to results.media_type returned from content list */}
                    {obj.media_type === "tv" && <TvMediaCard tvshow={obj} />}
                    {obj.media_type === "movie" && (
                      <MoviesMediaCard movie={obj} />
                    )}
                    {obj.media_type === "person" && (
                      <PeoplesMediaCard people={obj} />
                    )}
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

      <footer>
        <div className="photo-credit">
          Thanks to the HeroSection image by
          <a
            target="blank"
            href="https://unsplash.com/photos/AtPWnYNDJnM?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          >
            {" "}
            Krists Luhaers on unsplash
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
