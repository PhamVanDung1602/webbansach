import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  keyword: string;
  setKeyWord: (keyword: string) => void
}
function Navbar({ keyword, setKeyWord }: NavbarProps) {
  const [transientKeyword, setTransientKeyword] = useState('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransientKeyword(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      setKeyWord(target.value);
    }
  }

  const handleSearching = () => {
    setKeyWord(transientKeyword);
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://localhost:3000">Bookstore</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="http://localhost:3000">Trang chủ</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Thể loại sách
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link className="dropdown-item" to="/1">Thể loại 1</Link></li>
                <li><Link className="dropdown-item" to="/2">Thể loại 2</Link></li>
                <li><Link className="dropdown-item" to="/3">Thể loại 3</Link></li>
                <li><Link className="dropdown-item" to="/4">Thể loại 4</Link></li>
                <li><Link className="dropdown-item" to="/5">Thể loại 5</Link></li>
                <li><Link className="dropdown-item" to="/6">Thể loại 6</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quy định bán hàng
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} onKeyPress={handleKeyPress} value={transientKeyword} />
          <button className="btn btn-outline-primary me-2 " type="button" onClick={handleSearching}>
            <Search />
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>

        {/* Biểu tượng đăng nhập */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;