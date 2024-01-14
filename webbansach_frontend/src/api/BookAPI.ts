import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";

async function getBook(uRL: string): Promise<BookModel[]>{
    const result: BookModel[] = [];

    //Call request method
    const response = await my_request(uRL);
    
    //get book json
    const responseData = response._embedded.books;
    console.log(responseData);

    for (const key in responseData){
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
    return result;
}
export async function getAllBooks(): Promise<BookModel[]>{
    //find endpoint:
    const uRL: string ='http://localhost:8080/book?sort=bookID,desc';

    return getBook(uRL);

}

export async function getThreeLastestBooks(): Promise<BookModel[]>{
    //find endpoint:
    const uRL: string ='http://localhost:8080/book?sort=bookID,desc&page=0&size=3';

    return getBook(uRL);

}