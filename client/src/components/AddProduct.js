import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getUsersQuery,
  addProductMutation,
  getProductsQuery,
} from "../queries/queries";

const AddProduct = (props) => {
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
    userId: "",
  });
  const result = useQuery(getUsersQuery);

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    addProductMutation,
    {
      refetchQueries: [{ query: getProductsQuery }],
    }
  );

  useEffect(() => {
    displayUsers();
  }, [result.loading, result.data]);

  const displayUsers = () => {
    const data = result.data;
    if (result.loading) {
      setUsers(<option disabled>Loading Users</option>);
    } else {
      setUsers(
        data.users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })
      );
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (
      product.name !== "" &&
      product.price !== "" &&
      product.description !== "" &&
      product.img !== "" &&
      product.userId
    ) {
      mutateFunction({
        variables: {
          name: product.name,
          price: product.price,
          description: product.description,
          img: product.img,
          userId: product.userId,
        },
      });
      setProduct({ name: "", price: "", img: "", description: "", userId: "" });
    } else {
      alert("Fill out all fields");
    }
  };

  return (
    <form id="add-product" onSubmit={submitForm}>
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
      <div className="field">
        <label>User:</label>
        <select
          onChange={(e) => setProduct({ ...product, userId: e.target.value })}
          value={product.userId}
        >
          <option>Select user</option>
          {users}
        </select>
      </div>
      <button>Add</button>
    </form>
  );
};

export default AddProduct;
