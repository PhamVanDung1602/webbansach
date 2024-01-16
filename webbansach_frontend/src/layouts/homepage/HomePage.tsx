import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ProductList from "../products/ProductList";
import { useParams } from "react-router-dom";


interface HomePageProps {
    keyword: string;
}

function HomePage({keyword}: HomePageProps){
    const {genreID} = useParams();
    let genreIDNumber = 0;

    try {
        genreIDNumber = parseInt(genreID+'');  //NaN
    } catch (error) {
        genreIDNumber = 0;
        console.error('Error: ',error);
    }

    if (Number.isNaN(genreIDNumber)){
        genreIDNumber=0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <ProductList keyword={keyword} genreID={genreIDNumber} />
        </div>
    );
}

export default HomePage