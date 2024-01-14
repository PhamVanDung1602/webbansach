import React, { useEffect, useState } from "react";
import { getAllImagesFromABook } from "../../../api/ImageAPI";
import ImageModel from "../../../models/ImageModel";
import BookModel from "../../../models/BookModel";


interface BookPropsInterface {
    book: BookModel;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const BookProps: React.FC<BookPropsInterface> = (props) =>{
    const bookID: number = props.book.bookID;
    const [imageList, setimageList] = useState<ImageModel[]>([]);
    const [loadingData,setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getAllImagesFromABook(bookID).then(
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
    },[] //only call once

    )

    if(loadingData){
        return(
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if(eRROR){
        return(
            <div>
                <h1>Gặp lỗi: {eRROR}</h1>
            </div>
        );
    }

    let imageData:string="";
    if(imageList[0] && imageList[0].imageData){
        imageData=imageList[0].imageData;
    }
 
    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src={imageData}
                    className="card-img-top"
                    alt={props.book.bookName}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.book.bookName}</h5>
                    <p className="card-text">{props.book.description}</p>
                    <div className="price">
                        <span className="original-price">
                           <del>{props.book.originalPrice}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.book.price}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
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