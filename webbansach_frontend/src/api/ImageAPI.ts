import React from "react";
import { my_request } from "./Request";
import ImageModel from "../models/ImageModel";

async function getImagesFromBook(uRL: string): Promise<ImageModel[]>{
    const result: ImageModel[] = [];

    //Call request method
    const response = await my_request(uRL);
    
    //get image json
    const responseData = response._embedded.images;
    //console.log(responseData);

    for (const key in responseData){
        result.push(
            {
                imageID: responseData[key].imageID,
                imageName: responseData[key].imageName,
                icon: responseData[key].icon,
                link: responseData[key].link,
                imageData: responseData[key].imageData
            }
        );
    }
    return result;
}

export async function getAllImagesFromABook(bookID:number): Promise<ImageModel[]>{

    //find endpoint:
    const uRL: string =`http://localhost:8080/book/${bookID}/imageList`;

    return getImagesFromBook(uRL);
}

export async function getOneImageFromABook(bookID:number): Promise<ImageModel[]>{

    //find endpoint:
    const uRL: string =`http://localhost:8080/book/${bookID}/imageList?sort=imageID,asc&page=0&size=1`;

    return getImagesFromBook(uRL);
}