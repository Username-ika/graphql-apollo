import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getProductQuery } from "../queries/queries";

const ProductDetails = (props) => {
  const [displayProduct, setDisplayProduct] = useState(
    <div>No product selected...</div>
  );

  const { loading, error, data } = useQuery(getProductQuery, {
    variables: {
      id: props.productId,
    },
  });

  useEffect(() => {
    displayProductDetails();
  }, [data]);

  let product;

  const displayProductDetails = () => {
    if(data){
      product = data.product;
    }
    if (product) {
      setDisplayProduct(
        <div>
          <h2>{product.name}</h2>
          <img src={product.img}></img>
          <p>Price: {product.price} $</p>
          <p>Description: {product.description}</p>
          <h1>User information</h1>
          <p>Name: {product.user.name}</p>
          <p>Phone number: {product.user.phone}</p>
          <p>Other products by this user:</p>
          <ul className="other-products">
            {product.user.products.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return <div id="product-details">{displayProduct}</div>;
};

export default ProductDetails;
