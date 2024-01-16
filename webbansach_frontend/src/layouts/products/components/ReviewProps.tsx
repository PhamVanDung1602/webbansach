import React, { useEffect, useState } from "react";
import { getAllReviewsFromABook } from "../../../api/ReviewAPI";
import ReviewModel from "../../../models/ReviewModel";
import { Star, StarFill } from "react-bootstrap-icons";
import renderRating from "../../utils/RenderRating";



interface ReviewPropsInterface {
    bookID: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ReviewProps: React.FC<ReviewPropsInterface> = (props) => {
    const bookID: number = props.bookID;

    const [reviewList, setReviewList] = useState<ReviewModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getAllReviewsFromABook(bookID).then(
            reviewList => {
                setReviewList(reviewList);
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
        <div className="container mt-2 mb-2 text-center">
            <h4>Đánh giá sản phẩm: </h4>
            {
                reviewList.map((review, index) => (
                    <div className="row">
                        <div className="col-4  text-end">
                            <p>{renderRating(review.starRating?review.starRating:0)}</p>
                        </div>
                        <div className="col-8 text-start">
                            <p>{review.comment}</p>
                        </div>
                    </div>
                )
                )
            }

        </div>
    );
}

export default ReviewProps