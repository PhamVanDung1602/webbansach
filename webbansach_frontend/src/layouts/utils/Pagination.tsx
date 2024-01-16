import React from "react";



interface PaginationInterface {
    currentPage: number;
    totalPages: number;
    paging:any;
}
const Pagination: React.FC<PaginationInterface> = (props) => {
    const pageList = [];

    if (props.currentPage === 1) {
        pageList.push(props.currentPage);
        if (props.totalPages >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        if (props.totalPages >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        //page -2
        if (props.currentPage >= 3) {
            pageList.push(props.currentPage - 2);
        }
        //page -1
        if (props.currentPage >= 2) {
            pageList.push(props.currentPage - 1);
        }
        //page itself
        pageList.push(props.currentPage);

        //page+1
        if (props.totalPages >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        //page+2
        if (props.totalPages >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paging(1)}>
                    <button className="page-link" >
                        Trang Đầu
                    </button>
                </li>
                {
                    pageList.map(page => (
                        <li className="page-item" key={page} onClick={() => props.paging(page)}>
                            <button className={"page-link " + (props.currentPage === page ? "active" : "")}>
                                {page}
                            </button>
                        </li>
                    ))
                }
                <li className="page-item" onClick={() => props.paging(props.totalPages)}>
                    <button className="page-link" >
                        Trang Cuối
                    </button>
                </li>
            </ul>
        </nav>
        
    );
}

export default Pagination