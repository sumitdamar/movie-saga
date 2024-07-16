import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams, useSubmit } from 'react-router-dom'
import "./Styles.scss"
import { fetchDataFromApi } from '../../utils/Api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from "../../components/spinner/Spinner"

import noResults from "../../assets/no-results.png"
import MovieCard from '../../components/movieCard/MovieCard'

export default function SearchResult() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false);
    })
  }
    const fetchNextPageData = () => {
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...data.results, ...res.results]
          })
        }
        else {
          setData[res]
        }
        setPageNum((prev)=>prev+1)
      })

    }
    useEffect(() => {
      setPageNum(1);
      fetchInitialData();
    }, [query])
    return (
      <div className='searchResultsPage'>
        {loading && <Spinner initial={true} />}
        {
          !loading && (
            <ContentWrapper>
                {
                  data?.total_results > 0 ? (<>
                    <div className="pageTitle">{`Search ${data.total_results>1 ? "results":"result"} of '${query}'`}</div>
                      <InfiniteScroll
                      className='content'
                      dataLength={data?.results.length || []}
                      hasMore={pageNum<=data?.total_pages}
                      next={fetchNextPageData}
                      loader={<Spinner/>}
                      >
                        {
                          data?.results.map((item,index)=>{
                            if(item.media_type==="person") return;
                            return <MovieCard key={index} data={item} fromSearch={true} mediaType={item.media_type}/>
                          })
                        }
                      </InfiniteScroll>
                  </>):(<span className='resultNotFound'>Sorry, no result found :(</span>)
                }
            </ContentWrapper>
          )
        }
        </div>
    )
  }
