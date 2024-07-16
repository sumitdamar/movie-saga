import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UseFetch from '../../../hooks/UseFetch';
import Img from '../../../components/lazyLoadImg/Img';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import { useSelector } from 'react-redux';
import "./Styles.scss"

function HomeBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)

  const { data, loading } = UseFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {loading === false && <div className='backdrop_img'>
        <Img src={background} />
      </div>}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Millions of Movie, TV shows and People to discover.Explore now </span>
          <div className="searchInput">
            <input type="text"
              placeholder='Search for movies and tv shows...'
              onKeyUp={searchQueryHandler}
              onChange={(ev) => setQuery(ev.target.value)}
            />
            <button>Search</button>
          </div>
        </div>

      </ContentWrapper>

    </div>
  )
}

export default HomeBanner