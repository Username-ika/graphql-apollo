import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getUsersQuery, deleteUserMutation } from "../queries/queries";

const AddProduct = (props) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const result = useQuery(getUsersQuery);

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    deleteUserMutation,
    {
      refetchQueries: [{ query: getUsersQuery }],
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
    if (userId !== "") {
      mutateFunction({
        variables: {
          id: userId,
        },
      });
      setUserId("");
    } else {
      alert("Select user");
    }
  };

  return (
    <form id="add-user" onSubmit={submitForm}>
      <div className="field">
        <label>User:</label>
        <select onChange={(e) => setUserId(e.target.value)} value={userId}>
          <option>Select user</option>
          {users}
        </select>
      </div>
      <button>Delete</button>
    </form>
  );
};

export default AddProduct;
