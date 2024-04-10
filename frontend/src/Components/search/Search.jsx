import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import SearchList from "./SearchList";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";

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
      <Form className="form">
        <Row className="mb-5">
          <Col>
            <FormControl
              type="search"
              placeholder="Search product"
              ref={inputRef}
            />
          </Col>
          <Col xs="auto">
            <Button variant="info" onClick={handleChange}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <SearchList filteredProducts={filteredProducts} />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  margin-top: 0;
  padding: 5%;
`;

export default SearchProduct;
