import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieInfo from "./components/MovieInfo";
import TvInfo from "./components/TvInfo";
import PeopleInfo from "./components/PeopleInfo";
import { useEffect, useState } from "react";
import Redirect from "./components/Redirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/page/:page" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/tvshow/:id" element={<TvInfo />} />
        <Route path="/people/:id" element={<PeopleInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
