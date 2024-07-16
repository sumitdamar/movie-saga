import { useState, useEffect } from 'react'
import { fetchDataFromApi } from "./utils/Api";
import { getApiConfigration ,getGeneres} from "./store/homeSlice"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home/Home"
import SearchResult from './pages/searchResult/SearchResult';
import Detail from './pages/Details/Detail';
import Explore from './pages/Explore/Explore';
import PageNotFound from './pages/404/PageNotFound'
import Header from './components/Header/Header';
import Footer from './components/Footer.js/Footer';




function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfigration(url));
    });
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });


    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGeneres(allGenres));
};

  return (
    <div>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Detail />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  )
}

export default App