import React, { useState } from "react";

import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

const UserForm = (props) => {
  const [selectedForm, setSelectedForm] = useState("Add");

  const setForm = (form) => {
    if (form === "Add" && selectedForm !== "Add") {
      setSelectedForm(form);
    }
    if (form === "Edit" && selectedForm !== "Edit") {
      setSelectedForm(form);
    }
    if (form === "Delete" && selectedForm !== "Delete") {
      setSelectedForm(form);
    }
  };

  return (
    <div id="select-form">
      <div id="change-buttons">
        <button onClick={() => setForm("Add")}>Add User</button>
        <button onClick={() => setForm("Edit")}>Edit User</button>
        <button onClick={() => setForm("Delete")}>Delete User</button>
      </div>
      {selectedForm === "Add" && <AddUser />}
      {selectedForm === "Edit" && <EditUser />}
      {selectedForm === "Delete" && <DeleteUser />}
    </div>
  );
};

export default UserForm;
