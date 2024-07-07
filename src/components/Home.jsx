import CenteredTabs from "./CenteredTabs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import MoviesMediaCard from "./MoviesMediaCard";
import PeoplesMediaCard from "./PeoplesMediaCard";
import TvMediaCard from "./TvMediaCard";
import Loader from "./Loader";
import AppAlert from "./Alert";
import { Box, Button } from "@mui/material";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home( ) {
  const [showContent, setShowContent] = useState("movie");
  const [contentList, setContentList] = useState([]);
  const [tab, setTab] = useState("now playing");
  const [value, setValue] = useState(0);
  const previousPageStateRef = useRef(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isResultEmpty, setIsResultEmpty] = useState(false);

  const { page } = useParams();
  const navigate = useNavigate();
  console.log({ page });

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setIsResultEmpty(false);
  };

  const handleSubmit = (e) => {
    if (searchInput === "") return null;
    e.preventDefault();
    setShowContent("search");
    setSearchQuery(searchInput);
    setTab("multi");
    setSearchInput("");
    setPage(1);
    setIsResultEmpty(false);
    setContentList([]);
  };

  const changeContent = (event) => {
    let link = event.target.innerText.toLowerCase();
    link = link.replace(/\n/g, "");
    if (link === "tv") {
      setTab("airing today");
      setShowContent("tv");
    }
    if (link === "movie") {
      setTab("now playing");
      setShowContent("movie");
    }
    if (link === "person" && showContent !== "person") {
      setTab("popular");
      setShowContent("person");
    }
    if (link !== showContent) {
      setContentList([]);
    }
    setShowContent(link);
    setValue(0);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setTab(event.target.innerText.toLowerCase());
  };


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let tabParam = tab.trim();

    switch (tabParam) {
      case "now playing":
        tabParam = "now_playing";
        break;
      case "top rated":
        tabParam = "top_rated";
        break;
      case "airing today":
        tabParam = "airing_today";
        break;
      case "on the air":
        tabParam = "on_the_air";
        break;
      default:
        // Handle unknown tab values
        break;
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
        setIsResultEmpty(response.total_results === 0 ? true : false);
        console.log(response);
        // if (previousPageStateRef.current !== page) {
        //   setContentList((previousState) => [
        //     ...previousState,
        //     ...response.results,
        //   ]);
        // } else {
        setContentList(response.results);
        setTotalPages(response.total_pages);
        // }
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
      {console.log(contentList)}
      <MenuBar handleClick={changeContent} />
      <HeroSection
        searchInput={searchInput}
        handleSubmit={handleSubmit}
        handleChange={handleSearchInputChange}
      />
      {isResultEmpty ? (
        <AppAlert />
      ) : contentList.length < 1 && !isResultEmpty ? (
        <Loader />
      ) : (
        <Container sx={{}} maxWidth="md">
          <CenteredTabs
            handleChange={handleTabChange}
            value={value}
            tab={tab}
            content={showContent}
          />
          <Grid container spacing={2}>
            {showContent === "movie" && (
              <>
                {contentList.map((movie, index) => (
                  <Grid key={index} item lg={4} xl={3} sm={6} xs={12}>
                    <MoviesMediaCard movie={movie} />
                  </Grid>
                ))}
              </>
            )}
            {showContent === "person" && (
              <>
                {contentList.map((people, index) => (
                  <Grid key={index} item lg={4} xl={3} sm={6} xs={12}>
                    <PeoplesMediaCard people={people} />
                  </Grid>
                ))}
              </>
            )}
            {showContent === "tv" && (
              <>
                {contentList.map((tvshow, index) => (
                  <Grid key={index} item lg={4} xl={3} sm={6} xs={12}>
                    <TvMediaCard tvshow={tvshow} />
                  </Grid>
                ))}
              </>
            )}

            {showContent === "search" && (
              <>
                {contentList.map((obj, index) => (
                  <Grid key={index} item lg={4} xl={3} sm={6} xs={12}>
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

          <Grid sx={{ justifyContent: "center" }} container spacing={2}>
            <Grid item>
              {page > 1 && (
                <>
                  <Box sx={{ marginTop: "30px", textAlign: "center" }}>
                    <Button
                      sx={{ marginBottom: "10px" }}
                      onClick={() => {
                        navigate(`/page/${Number(page) - 1}`);
                        window.scrollTo(0, 0);
                      }}
                      variant="outlined"
                    >
                      <ArrowBackIosNewIcon />
                      Previous
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
            <Grid item>
              {totalPages > page && (
                <>
                  <Box sx={{ marginTop: "30px", textAlign: "center" }}>
                    <Button
                      sx={{ marginBottom: "10px" }}
                      onClick={() => {
                        navigate(`/page/${Number(page) + 1}`);
                        window.scrollTo(0, 0);
                      }}
                      variant="outlined"
                    >
                      <ArrowForwardIosIcon />
                      Next
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      )}

      <Footer />
    </div>
  );
}

export default Home;
