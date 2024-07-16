import React from 'react'
import HomeBanner from './homeBanner/HomeBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'


export default function Home() {
  return (
    <div>
      <HomeBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}
