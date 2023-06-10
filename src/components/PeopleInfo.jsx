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

function PeopleInfo() {
  let { id } = useParams();
  const [personDetail, setPersonDetail] = useState([]);
  //   const [videos, setVideos] = useState([]);
  //   const [cast, setCast] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  let images;

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
      `https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=images`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPersonDetail(response);
        // setMovieDetails(response);
        // setCast(response.credits.cast);
      })
      .catch((err) => console.error(err));
  }, []);

  if (personDetail.images && personDetail.images.profiles.length > 0) {
    images = personDetail.images.profiles.map((obj, index) => {
      return (
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <img
            style={{ maxWidth: "300px", maxHeight: "400px" }}
            src={`https://image.tmdb.org/t/p/w500/${obj.file_path}`}
            alt=""
          />
        </Grid>
      );
    });
  }

  return (
    <div>
      <Header />

      <Container sx={{ padding: "20px" }} maxWidth="md">
        {/* {console.log(videos)} */}
        <h2 className="text-center">{personDetail.name}</h2>
        {/* <h3>ID: {id} </h3> */}

        <div className="box">
          <div className="img">
            <img
              src={
                "https://image.tmdb.org/t/p/w500" + personDetail.profile_path
              }
              alt=""
              style={{ maxHeight: "300px" }}
            />
          </div>

          <div>
            <p>{personDetail.biography}</p>
            {personDetail.homepage ? (
              <p>
                <b>Homepage:</b>{" "}
                <a href={personDetail.homepage} target="_blank">
                  {personDetail.homepage}
                </a>
              </p>
            ) : (
              ""
            )}

            <p>
              <b>Born:-</b> {personDetail.birthday}
            </p>
            {personDetail.deathday ? (
              <p>
                <b>Died:-</b> {personDetail.deathday}
              </p>
            ) : (
              ""
            )}

            <p>
              <b>Place of Birth:-</b> {personDetail.place_of_birth}
            </p>

            {personDetail.also_known_as &&
              personDetail.also_known_as.length > 0 && (
                <p>
                  <b>Also known as:-</b> {personDetail.also_known_as.join(", ")}
                </p>
              )}
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>Related Images:</h3>
        {personDetail.images && <Grid container spacing={{ xs: 2, lg: 4 }}>{images}</Grid>}
      </Container>
      <Footer />
    </div>
  );
}

export default PeopleInfo;
