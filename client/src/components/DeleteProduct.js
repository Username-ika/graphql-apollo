import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { deleteProductMutation, getProductsQuery } from "../queries/queries";

const AddProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const result = useQuery(getProductsQuery);

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    deleteProductMutation,
    {
      refetchQueries: [{ query: getProductsQuery }],
    }
  );

  useEffect(() => {
    displayProducts();
  }, [result.loading, result.data]);

  const displayProducts = () => {
    const data = result.data;
    if (result.loading) {
      setProducts(<option disabled>Loading Products</option>);
    } else {
      setProducts(
        data.products.map((product) => {
          return (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          );
        })
      );
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (productId !== "") {
      mutateFunction({
        variables: {
          id: productId,
        },
      });
      setProductId("");
    } else {
      alert("Select product");
    }
  };

  return (
    <form id="add-product" onSubmit={submitForm}>
      <div className="field">
        <label>Product:</label>
        <select
          onChange={(e) => setProductId(e.target.value)}
          value={productId}
        >
          <option>Select product</option>
          {products}
        </select>
      </div>
      <button>Delete</button>
    </form>
  );
};

export default AddProduct;
