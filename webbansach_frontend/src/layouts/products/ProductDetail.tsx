import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { getBookByBookID } from "../../api/BookAPI";
import ImageProps from "./components/ImageProps";
import ReviewProps from "./components/ReviewProps";
import renderRating from "../utils/RenderRating";
import formatNumber from "../utils/NumberFormat";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const ProductDetail: React.FC = () => {
    //get bookID from URL
    const { bookID } = useParams();

    let bookIDNumber = 0;
    try {
        bookIDNumber = parseInt(bookID + '');
        if (Number.isNaN(bookIDNumber)) {
            bookIDNumber = 0;
        }
    } catch (error) {
        bookIDNumber = 0;
        console.error('Error', error);
    }

    //declare
    const [book, setBook] = useState<BookModel | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        const remainingQuantity = (book && book.quantity ? book.quantity : 0);
        if (quantity < remainingQuantity) {
            setQuantity(quantity + 1);
        }
    }

    const decreaseQuantity = () => {
        if (quantity >= 2) {
            setQuantity(quantity - 1);
        }
    }

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        const remainingQuantity = (book && book.quantity ? book.quantity : 0);

        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= remainingQuantity) {
            setQuantity(newQuantity);
        }
    }

    const handlePurchaseNow = () => {

    }

    const handleAddToCart = () => {

    }

    useEffect(() => {
        getBookByBookID(bookIDNumber).then((book) => {
            setBook(book);
            setLoadingData(false);
        }
        ).catch((error) => {
            setError(error.message);
            setLoadingData(false);
        }
        )
    }, [bookID]
    )

    if (loadingData) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Gặp lỗi: {error}</h1>
            </div>
        );
    }

    if (!book) {
        return (
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <ImageProps bookID={bookIDNumber} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {book.bookName}
                            </h1>
                            <h4>
                                {renderRating(book.averageStar ? book.averageStar : 0)}
                            </h4>
                            <h4>
                                {formatNumber(book.price)}
                            </h4>
                            <hr />
                            <div dangerouslySetInnerHTML={{ __html: (book.description + '') }} />
                            <hr />
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">Số lượng</div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={decreaseQuantity}>-</button>
                                    <input
                                        className="form-control text-center"
                                        type="number"
                                        value={quantity}
                                        min={1}
                                        onChange={handleQuantity}
                                    />
                                    <button className="btn btn-outline-secondary ms-2" onClick={increaseQuantity}>+</button>
                                </div>
                                {
                                    book.price && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h4>{formatNumber(quantity * book.price)} đ</h4>
                                        </div>
                                    )
                                }
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button type="button" className="btn btn-primary btn-block mt-3" onClick={handlePurchaseNow}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary btn-block mt-3" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <ReviewProps bookID={bookIDNumber} />
            </div>
        </div>
    );
}

export default ProductDetail