import React, { FormEvent, useState } from "react"
import RequireAdmin from "./components/RequireAdmin";
const AddBookForm: React.FC = () => {
    const [book, setBook] = useState(
        {
            bookID: 0,
            bookName: '',
            price: 0,
            originalPrice: 0,
            description: '',
            quantity: 0,
            author: '',
            averageStar: 0,
            isbn: ''
        }
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/book',
            {
                method:'POST',
                headers: {
                    'Content-Type' :'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(book)
            }
        ).then((response) =>{
            if(response.ok){
                alert("Đã thêm sách thành công!");
                setBook(
                    {
                        bookID: 0,
                        bookName: '',
                        price: 0,
                        originalPrice: 0,
                        description: '',
                        quantity: 0,
                        author: '',
                        averageStar: 0,
                        isbn: ''
                    }
                )
            }else {
                alert("Gặp lỗi trong quá trình thêm sách!");
            }
        })
    }

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Thêm sách</h1>
            <div className="mb-3 col-mb-6 col-6 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="bookID" className="form-label d-flex"><strong>Mã sách:</strong></label>
                        <input
                            type="hidden"
                            id="bookName"
                            className="form-control"
                            value={book.bookID}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bookName" className="form-label d-flex"><strong>Tên sách:</strong></label>
                        <input
                            type="text"
                            id="bookName"
                            className="form-control"
                            value={book.bookName}
                            onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label d-flex"><strong>Giá bán:</strong></label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            value={book.price}
                            onChange={(e) => setBook({ ...book, price: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="originalPrice" className="form-label d-flex"><strong>Giá niêm yết:</strong></label>
                        <input
                            type="number"
                            id="originalPrice"
                            className="form-control"
                            value={book.originalPrice}
                            onChange={(e) => setBook({ ...book, originalPrice: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label d-flex"><strong>Số lượng:</strong></label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            value={book.quantity}
                            onChange={(e) => setBook({ ...book, quantity: parseInt(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label d-flex"><strong>Tên tác giả:</strong></label>
                        <input
                            type="text"
                            id="author"
                            className="form-control"
                            value={book.author}
                            onChange={(e) => setBook({ ...book, author: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label d-flex"><strong>Miêu tả:</strong></label>
                        <input
                            type="text"
                            id="description"
                            className="form-control"
                            value={book.description}
                            onChange={(e) => setBook({ ...book, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label d-flex"><strong>ISBN:</strong></label>
                        <input
                            type="isbn"
                            id="isbn"
                            className="form-control"
                            value={book.isbn}
                            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="averageStar" className="form-label d-flex"><strong>Điểm đánh giá trung bình:</strong></label>
                        <input
                            type="number"
                            id="averageStar"
                            className="form-control"
                            value={book.averageStar}
                            onChange={(e) => setBook({ ...book, averageStar: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const AddBookForm_Admin = RequireAdmin(AddBookForm);
export default AddBookForm_Admin