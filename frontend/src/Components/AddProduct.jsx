import React, {useEffect, useState }from "react";
import { Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addToCart } from "../Reducers/cartSlice";


export const AddProduct = ({ productDetail }) => {
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(null);
  //console.log('Product to be add to cart', productDetail)
   
  
    useEffect(() => {
      setCurrentProduct(productDetail);
    }, [productDetail],
    //  console.log('use Effect')
     );

    const handleAddToCart = () => {
      if (currentProduct) {
        dispatch(addToCart(currentProduct));
      }
    };

    // const handleAddToCart = () => {
    //   if (productDetail) {
    //     dispatch(addToCart(productDetail));
    //   }
    // };
  
    return (
      <Button variant='primary' onClick={handleAddToCart}>Add to Cart</Button>
    );
  };
  
  export default AddProduct;