import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailBanner/DetailsBanner'
import UseFetch from '../../hooks/UseFetch'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import Similar from './carousel/Similar'
import Recommendation from './carousel/Recommendation'

export default function Detail() {
  const {mediaType,id}=useParams();
  const {loading,data}=UseFetch(`/${mediaType}/${id}/videos`)
  const {loading:creditsLoading,data:credits}=UseFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
        <DetailsBanner  video={data?.results[0]} crew={credits?.crew}/> 
        <Cast
        data={credits?.cast}
        loading={creditsLoading}
        />
        <VideosSection data={data} loading={loading}/>
        <Similar mediaType={mediaType} id={id}/>
        <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}
