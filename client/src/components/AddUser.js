import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { getUsersQuery, addUserMutation } from "../queries/queries";

const AddUser = (props) => {
  const [user, setUser] = useState({ name: "", age: "", phone: "" });

  const [mutateFunction, { mutateData, load, err }] = useMutation(
    addUserMutation,
    {
      refetchQueries: [{ query: getUsersQuery }],
    }
  );

  const submitForm = async (e) => {
    e.preventDefault();
    if (user.name !== "" && user.age !== "" && user.phone !== "") {
      mutateFunction({
        variables: {
          name: user.name,
          age: user.age,
          phone: user.phone,
        },
      });
      setUser({ name: "", age: "", phone: "" });
    } else {
      alert("Fill out all fields");
    }
  };

  return (
    <form id="add-user" onSubmit={submitForm}>
      <div className="field">
        <label>Name:</label>
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
        <label>Phone Number:</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          value={user.phone}
        />
      </div>
      <button>Add</button>
    </form>
  );
};

export default AddUser;
