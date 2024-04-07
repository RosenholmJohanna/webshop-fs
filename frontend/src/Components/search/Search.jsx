import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import SearchList from "./SearchList";

const SearchProduct = ({ productList }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef();

  const filterProducts = useCallback(
    (value) => {
      const filtered = productList.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [productList]
  );

  const handleChange = useCallback(() => {
    const inputValue = inputRef.current.value;
    if (inputValue.trim() === "") {
      setFilteredProducts([]);
    } else {
      filterProducts(inputValue);
    }
  }, [filterProducts]);

  return (
    <SearchWrapper>
      <section>
        <div>
          <input type="search" placeholder="search product" ref={inputRef} />
          <button variant="outline-success" onClick={handleChange}>
            Search
          </button>
        </div>
        <SearchList filteredProducts={filteredProducts} />
      </section>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  background-color: #3f3932;
  margin-top: 10%;
  height: 15%;
  padding: 2%;
`;

export default SearchProduct;
