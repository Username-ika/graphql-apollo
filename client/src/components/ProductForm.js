import React, { useState } from "react";

import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductForm = (props) => {
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
        <button onClick={() => setForm("Add")}>Add Product</button>
        <button onClick={() => setForm("Edit")}>Edit Product</button>
        <button onClick={() => setForm("Delete")}>Delete Product</button>
      </div>
      {selectedForm === "Add" && <AddProduct />}
      {selectedForm === "Edit" && <EditProduct />}
      {selectedForm === "Delete" && <DeleteProduct />}
    </div>
  );
};

export default ProductForm;
