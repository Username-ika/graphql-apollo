import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getProductsQuery } from "../queries/queries";

import ProductDetails from "./ProductDetails";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState();

  const result = useQuery(getProductsQuery);

  const displayProducts = () => {
    const data = result.data;
    if (result.loading) {
      setProducts(<div>Loading products...</div>);
    } else {
      setProducts(
        data.products.map((product) => {
          return (
            <li key={product.id} onClick={(e) => setProductId(product.id)}>
              {product.name}
            </li>
          );
        })
      );
    }
  };
  useEffect(() => {
    displayProducts();
  }, [result.data, result.loading]);

  return (
    <div>
      <ul id="product-list">{products}</ul>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default ProductList;
