import React from "react";
import { my_request } from "./Request";
import ReviewModel from "../models/ReviewModel";


async function getReviewsFromBook(uRL: string): Promise<ReviewModel[]>{
    const result: ReviewModel[] = [];

    //Call request method
    const response = await my_request(uRL);
    
    //get image json
    const responseData = response._embedded.reviews;
    //console.log(responseData);

    for (const key in responseData){
        result.push(
            {
                reviewID: responseData[key].reviewID,
                comment: responseData[key].comment,
                starRating: responseData[key].starRating
            }
        );
    }
    return result;
}

export async function getAllReviewsFromABook(bookID:number): Promise<ReviewModel[]>{

    //find endpoint:
    const uRL: string =`http://localhost:8080/book/${bookID}/reviewList`;

    return getReviewsFromBook(uRL);
}

export async function getOneReviewFromABook(bookID:number): Promise<ReviewModel[]>{

    //find endpoint:
    const uRL: string =`http://localhost:8080/book/${bookID}/reviewList?sort=imageID,asc&page=0&size=1`;

    return getReviewsFromBook(uRL);
}