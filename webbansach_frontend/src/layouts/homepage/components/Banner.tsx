import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
                <div className="container-fluid py-5 text-white d-flex 
                justify-content-center align-items-center" >
                    <div>
                        <h3 className="display-6 fw-bold">
                             Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu
                        </h3>
                        <p className="">Mary Pope Osborne</p>
                        <button className="btn btn-primary text-white float-end">Khám phá sách tại Bookstore.com</button>                        
                    </div>
                </div>
        </div>
    );
}

export default Banner