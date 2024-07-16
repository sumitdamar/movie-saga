import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";


import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/no-poster.png";
import UseFetch from "../../../hooks/UseFetch";
import Genres from "../../../components/genres/Genres";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import "./Styles.scss"
import { PlayIcon } from "./PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";




const DetailsBanner = ({ video, crew }) => {

    const[videoId,setVideoId]=useState(null);
    const [show,setShow]=useState(false);

    const { mediaType, id } = useParams();
    const { data, loading } = UseFetch(`/${mediaType}/${id}`)

    const __genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((p) => p.job === "Director");
    const writer = crew?.filter((p) => p.job === "Writer" || p.job === "Screenplay" || p.job === "Story")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const { url } = useSelector((state) => state.home);

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        !!data &&    //turns to bool data
                        (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data?.poster_path ? (

                                                <Img className="posterImg"
                                                    src={url.backdrop + data.poster_path } />

                                            ) : (
                                                <Img className="posterImg"
                                                    src={PosterFallback} />

                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data?.title || data?.name}
                                            (${dayjs(data?.release_date || data.first_air_date).format("YYYY")})`
                                                }
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>
                                            <Genres data={__genres} />
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />
                                                <div className="playbtn"
                                                onClick={()=>{
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}>
                                                <PlayIcon/>
                                                <span className="text">Watch Now</span> 
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">
                                                    {data.overview}
                                                </div>
                                            </div>
                                            <div className="info">
                                                {
                                                    data.status && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Status:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data.status}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data.release_date && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Release date:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {dayjs(data.release_date).format("MMM D, YYYY")}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data.runtime && (
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Runtime:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {toHoursAndMinutes(data.runtime)}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                director?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Director:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {director?.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {director.length-1 !== i && ", "}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                writer?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Writer:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {writer?.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {writer.length-1 !== i && ", "}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data?.created_by?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Creater:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data?.created_by?.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {data?.created_by?.length-1 !== i && ", "}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                    {
                                        videoId !=null &&  
                                        <VideoPopup
                                        show={show}
                                        setShow={setShow}
                                        videoId={videoId}
                                        setVideoId={setVideoId}
                                        />
                                    }
                                   
                                </ContentWrapper>
                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;