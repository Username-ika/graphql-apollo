import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  getUserQuery,
  editUserMutation,
  getUsersQuery,
} from "../queries/queries";

const EditUser = (props) => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    age: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);

  const result = useQuery(getUsersQuery);

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    editUserMutation,
    {
      refetchQueries: [{ query: getUsersQuery }],
    }
  );

  const [getUser, { loading, data }] = useLazyQuery(getUserQuery);
  

  const setFields = () => {
    if (data && data.user && data.user.id !== user.userId) {
      setUser({
        userId: data.user.id,
        name: data.user.name,
        age: data.user.age,
        phone: data.user.phone,
      });
      console.log(JSON.stringify(data.user)+"esdataa")
    }
  };

  useEffect(() => {
    setFields();
  }, [data]);

  useEffect(() => {
    displayUsers();
  }, [result.loading, result.data]);

  const displayUsers = () => {
    const usersdata = result.data;
    if (result.loading) {
      setUsers(<option disabled>Loading Users</option>);
    } else {
      setUsers(
        usersdata.users.map((user) => {
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
      user.userId !== "" &&
      user.name !== "" &&
      user.age !== "" &&
      user.phone !== "" 
    ) {
      mutateFunction({
        variables: {
          id: user.userId,
          name: user.name,
          age: user.age,
          phone: user.phone,
        },
      });
      getUser({ variables: { id: e.target.value } })
    }

   
  };

  return (
    <form id="add-user" onSubmit={submitForm}>
      <div className="field">
        <label>User:</label>
        <select
          onChange={(e) => getUser({ variables: { id: e.target.value } })}
          value={user.userId}
        >
          <option>Select user</option>
          {users}
        </select>
      </div>
      <div className="field">
        <label>User name:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
        />
      </div>
      <div className="field">
        <label>Age:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          value={user.age}
        />
      </div>
      <div className="field">
        <label>Phone:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          value={user.phone}
        />
      </div>
      <button>Edit</button>
    </form>
  );
};

export default EditUser;
