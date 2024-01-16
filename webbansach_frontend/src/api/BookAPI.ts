import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";

interface ResultInterface {
    result: BookModel[];
    totalPages: number;
    booksPerPage: number;
}

async function getBook(uRL: string): Promise<ResultInterface> {
    const result: BookModel[] = [];

    //Call request method
    const response = await my_request(uRL);

    //get book json
    const responseData = response._embedded.books;
    console.log(responseData);

    //get page infomation
    const totalPages: number = response.page.totalPages;
    const booksPerPage: number = response.page.totalElements;
    for (const key in responseData) {
        result.push(
            {
                bookID: responseData[key].bookID,
                bookName: responseData[key].bookName,
                price: responseData[key].price,
                originalPrice: responseData[key].originalPrice,
                description: responseData[key].description,
                quantity: responseData[key].quantity,
                author: responseData[key].author,
                averageStar: responseData[key].averageStar
            }
        );
    }
    return { result: result, booksPerPage: booksPerPage, totalPages: totalPages };
}
export async function getAllBooks(page: number): Promise<ResultInterface> {
    //find endpoint:
    const uRL: string = `http://localhost:8080/book?sort=bookID,desc&size=8&page=${page}`;

    return getBook(uRL);

}

export async function getThreeLastestBooks(): Promise<ResultInterface> {
    //find endpoint:
    const uRL: string = 'http://localhost:8080/book?sort=bookID,desc&page=0&size=3';

    return getBook(uRL);

}

export async function searchBook(keyword: string, genreID: number, page: number): Promise<ResultInterface> {
    // find endpoint
    let uRL: string = `http://localhost:8080/book?sort=bookID,desc&size=8&page=0`;
    if (keyword !== "" && genreID === 0) {
        uRL = `http://localhost:8080/book/search/findByBookNameContaining?sort=bookID,desc&size=8&page=${page}&bookName=${keyword}`;  
    } else if (keyword === '' && genreID > 0) {
        uRL = `http://localhost:8080/book/search/findByGenreList_GenreID?sort=bookID,desc&size=8&page=${page}&genreID=${genreID}`;
    } else if (keyword !== '' && genreID > 0) {
        uRL = `http://localhost:8080/book/search/findByBookNameContainingAndGenreList_GenreID?sort=bookID,desc&size=8&page=${page}&genreID=${genreID}&bookName=${keyword}`;
    }
    
    return getBook(uRL);
}

export async function getBookByBookID(bookID: number): Promise<BookModel | null> {
    const uRL: string = `http://localhost:8080/book/${bookID}`;

    let result: BookModel;

    try {
        //Access the url
        const response = await fetch(uRL);

        //if it can not return the url => error
        if (!response.ok) {
            throw new Error(`Can not access the link ${uRL}`);
        }
        //if it's ok
        const bookData = await response.json();

        if (bookData) {
            return {
                bookID: bookData.bookID,
                bookName: bookData.bookName,
                price: bookData.price,
                originalPrice: bookData.originalPrice,
                description: bookData.description,
                quantity: bookData.quantity,
                author: bookData.author,
                averageStar: bookData.averageStar
            }
        } else {
            throw new Error('The book does not exist');
        }

    } catch (error) {
        console.error("Error", error);
        return null;
    }
}