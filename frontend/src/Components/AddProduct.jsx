import React, {useEffect, useState }from "react";
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
        //console.log('current prduct', currentProduct)
        dispatch(addToCart(currentProduct));
      }
    };

    // const handleAddToCart = () => {
    //   if (productDetail) {
    //     dispatch(addToCart(productDetail));
    //   }
    // };
  
    return (
      <button onClick={handleAddToCart}>Add to Cart</button>
    );
  };
  
  export default AddProduct;