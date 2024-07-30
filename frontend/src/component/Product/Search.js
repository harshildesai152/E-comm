import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom'; 
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate(); 

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          id="w1"
          placeholder="Search product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" id="w2">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
