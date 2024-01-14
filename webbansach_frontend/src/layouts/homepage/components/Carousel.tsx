import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";
import { getThreeLastestBooks } from "../../../api/BookAPI";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getThreeLastestBooks().then(
            bookData => {
                setBookList(bookData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setError(error.message);
            }
        );
    }, [] //only call once

    )

    if (loadingData) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (eRROR) {
        return (
            <div>
                <h1>Gặp lỗi: {eRROR}</h1>
            </div>
        );
    }

    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <CarouselItem key={0} book={bookList[0]} />
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <div className="row align-items-center">
                            <CarouselItem key={1} book={bookList[1]} />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row align-items-center">
                            <CarouselItem key={2} book={bookList[2]} />
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel