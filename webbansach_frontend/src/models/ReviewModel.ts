class ReviewModel {
    reviewID: number;
    starRating: number;
    comment: string;
   
    constructor(
        reviewID: number,
        starRating: number,
        comment: string,
        
    ) {
        this.reviewID = reviewID;
        this.starRating = starRating;
        this.comment = comment;
        
    }   

}

export default ReviewModel