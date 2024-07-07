import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieInfo from "./components/MovieInfo";
import TvInfo from "./components/TvInfo";
import PeopleInfo from "./components/PeopleInfo";
import { useEffect, useState } from "react";
import Redirect from "./components/Redirect";

function App() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((previousPage) => previousPage + 1);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/:page" element={<Home nextPage={nextPage} page={page} />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/tvshow/:id" element={<TvInfo />} />
        <Route path="/people/:id" element={<PeopleInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
