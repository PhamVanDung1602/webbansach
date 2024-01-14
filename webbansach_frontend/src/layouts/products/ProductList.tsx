import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./components/BookProps";
import { getAllBooks } from "../../api/BookAPI";
import { error } from "console";

const ProductList: React.FC =() => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadingData,setLoadingData] = useState<boolean>(true);
    const [eRROR, setError] = useState(null);

    useEffect(() => {
        getAllBooks().then(
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

    return (
        <div className="container">
            <div className="row mt-4">
                {
                    bookList.map((book) => (
                        <BookProps key={book.bookID} book={book} />
                    )
                    )
                }
            </div>
        </div>
    );
     
}

export default ProductList