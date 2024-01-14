class BookModel {
    bookID: number;
    bookName?: string; // can be null
    price?: number;
    originalPrice?: number;
    description?: string;
    quantity?: number;
    author?: string;
    averageStar?: number;

    constructor(
        bookID: number,
        bookName?: string, // can be null
        price?: number,
        originalPrice?: number,
        description?: string,
        quantity?: number,
        author?: string,
        averageStar?: number,
    ){
        this.bookID = bookID;
        this.bookName = bookName;
        this.price = price;
        this.originalPrice = originalPrice;
        this.description = description;
        this.quantity = quantity;
        this.author = author;
        this.averageStar = averageStar;
    }
}

export default BookModel