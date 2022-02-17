import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  getProductQuery,
  editProductMutation,
  getProductsQuery,
} from "../queries/queries";

const EditProduct = (props) => {
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    description: "",
    img: "",
  });
  const [products, setProducts] = useState([]);

  const result = useQuery(getProductsQuery);

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    editProductMutation,
    {
      refetchQueries: [{ query: getProductsQuery }],
    }
  );

  const [getProduct, { loading, error, data, refetch }] =
    useLazyQuery(getProductQuery);

  const setFields = () => {
    if (data && data.product && data.product.id !== product.productId) {
      setProduct({
        productId: data.product.id,
        name: data.product.name,
        price: data.product.price,
        description: data.product.description,
        img: data.product.img,
      });
      console.log(JSON.stringify(data.product) + "esdataa");
    }
  };

  useEffect(() => {
    setFields();
  }, [data]);

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
    if (
      product.productId !== "" &&
      product.name !== "" &&
      product.price !== "" &&
      product.description !== "" &&
      product.img !== ""
    ) {
      mutateFunction({
        variables: {
          id: product.productId,
          name: product.name,
          price: product.price,
          description: product.description,
          img: product.img,
        },
      });
      getProduct({ variables: { id: e.target.value } });
      console.log("submit")
    }
  };

  return (
    <form id="add-product" onSubmit={submitForm}>
      <div className="field">
        <label>Product:</label>
        <select
          onChange={(e) => getProduct({ variables: { id: e.target.value } })}
          value={product.productId}
        >
          <option>Select product</option>
          {products}
        </select>
      </div>
      <div className="field">
        <label>Product name:</label>
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          value={product.name}
        />
      </div>
      <div className="field">
        <label>Price:</label>
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          value={product.price}
        />
      </div>
      <div className="field">
        <label>Image URL:</label>
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, img: e.target.value })}
          value={product.img}
        />
      </div>
      <div className="field">
        <label>Description:</label>
        <input
          type="text"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          value={product.description}
        />
      </div>
      <button>Edit</button>
    </form>
  );
};

export default EditProduct;
