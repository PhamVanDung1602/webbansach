import React, { useEffect, useState } from "react";
import { getAllImagesFromABook } from "../../../api/ImageAPI";
import ImageModel from "../../../models/ImageModel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS cho carousel
import { Carousel } from "react-responsive-carousel";

interface ImagePropsInterface {
    bookID: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ImageProps: React.FC<ImagePropsInterface> = (props) => {
    const bookID: number = props.bookID;

    const [imageList, setimageList] = useState<ImageModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getAllImagesFromABook(bookID).then(
            imageList => {
                setimageList(imageList);
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

    return (
    <div className="row">
        <div className="col-12">
            <Carousel showArrows={true} showIndicators={true}>
                {
                    imageList.map((image, index) => (
                        <div key={index}>
                            <img src={image.imageData} alt={`${image.imageName}`} style = {{maxWidth:'250px'}} />
                        </div>
                    )
                    )
                }
            </Carousel>
        </div>
    </div>

    );
}

export default ImageProps