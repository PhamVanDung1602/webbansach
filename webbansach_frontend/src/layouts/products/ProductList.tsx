import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import BookProps from "./components/BookProps";
import { getAllBooks, searchBook } from "../../api/BookAPI";
import Pagination from "../utils/Pagination";

interface ProductListProps {
    keyword: string;
    genreID: number;
}
function ProductList({ keyword, genreID }: ProductListProps) {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        if (keyword === '' && genreID === 0) {
            getAllBooks(currentPage - 1).then(
                result => {
                    setBookList(result.result);
                    setTotalPages(result.totalPages);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setLoadingData(false);
                    setError(error.message);
                }
            );
        } else {
            searchBook(keyword, genreID, currentPage - 1).then(
                result => {
                    setBookList(result.result);
                    setTotalPages(result.totalPages);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setLoadingData(false);
                    setError(error.message);
                }
            );

        }
    }, [keyword, genreID,currentPage]); //only call once

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }
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

    if (bookList.length === 0 && totalPages === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-5 mb-4">
                {
                    bookList.map((book) => (
                        <BookProps key={book.bookID} book={book} />
                    )
                    )
                }
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} paging={handlePageChange} />
        </div>
    );


}

export default ProductList