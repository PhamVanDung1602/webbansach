/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { getOneImageFromABook } from "../../../api/ImageAPI";
import ImageModel from "../../../models/ImageModel";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";
import renderRating from "../../utils/RenderRating";
import formatNumber from "../../utils/NumberFormat";


interface BookPropsInterface {
    book: BookModel;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const BookProps: React.FC<BookPropsInterface> = (props) => {
    const bookID: number = props.book.bookID;
    const [imageList, setimageList] = useState<ImageModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getOneImageFromABook(bookID).then(
            imageData => {
                setimageList(imageData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setError(error.message);
            }
        );
    }, [bookID] //only call once

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

    let imageData: string = "";
    if (imageList[0] && imageList[0].imageData) {
        imageData = imageList[0].imageData;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/book/${props.book.bookID}`} >
                    <img
                        src={imageData}
                        className="card-img-top"
                        alt={props.book.bookName}
                        style={{ height: '200px' }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`/book/${props.book.bookID}`} style={{ textDecoration: 'none' }}>
                        <h5 className="card-title">{props.book.bookName}</h5>
                    </Link>
                    <div className="price row">
                        <span className="original-price row-6">
                            <del>{formatNumber(props.book.originalPrice)}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{formatNumber(props.book.price)}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            {renderRating(props.book.averageStar?props.book.averageStar:0)}
                        </div>
                        <div className="col-6 text-end">
                            <a href="#" className="btn btn-secondary btn-block me-2">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookProps