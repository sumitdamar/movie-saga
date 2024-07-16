import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import UseFetch from "../../../hooks/UseFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = UseFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div>
        {
             data?.total_results > 0 &&  
            <Carousel
            title={title}
            data={data?.results}
            loading={loading} 
            endpoint={mediaType}
        /> 
        }
        </div>
    
    );
};

export default Similar;