import React, { useEffect, useState } from "react";
import { getOneImageFromABook } from "../../../api/ImageAPI";
import ImageModel from "../../../models/ImageModel";
import BookModel from "../../../models/BookModel";


interface CarouselItemInterface {
    book: BookModel;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CarouselItem: React.FC<CarouselItemInterface> = (props) =>{
    const bookID: number = props.book.bookID;
    const [imageList, setimageList] = useState<ImageModel[]>([]);
    const [loadingData,setLoadingData] = useState<boolean>(true);
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
        <div className="row align-items-center">
        <div className="col-5 text-center">
            <img src={imageData} className="float-end" style={{ width: '150px' }} alt="" />
        </div>
        <div className="col-7">
            <h5>{props.book.bookName}</h5>
            <p>{props.book.description}</p>
        </div>
    </div> 
    );
}

export default CarouselItem