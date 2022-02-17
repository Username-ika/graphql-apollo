import { gql } from "@apollo/client";

const getUsersQuery = gql`
  {
    users {
      name
      id
    }
  }
`;

const getProductsQuery = gql`
  {
    products {
      name
      id
    }
  }
`;

const addProductMutation = gql`
  mutation AddProduct(
    $name: String!
    $price: Int!
    $description: String!
    $img: String!
    $userId: ID!
  ) {
    addProduct(
      name: $name
      price: $price
      description: $description
      img: $img
      userId: $userId
    ) {
      name
      id
    }
  }
`;

const addUserMutation = gql`
  mutation AddUser($name: String!, $age: Int!, $phone: String!) {
    addUser(name: $name, age: $age, phone: $phone) {
      name
      id
    }
  }
`;

const getProductQuery = gql`
  query GetProduct($id: ID) {
    product(id: $id) {
      id
      name
      price
      description
      img
      user {
        id
        name
        age
        phone
        products {
          name
          id
        }
      }
    }
  }
`;

const getUserQuery = gql`
  query GetUser($id: ID) {
    user(id: $id) {
      id
      name
      age
      phone
    }
  }
`;

const deleteUserMutation = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

const deleteProductMutation = gql`
  mutation DeleteProduct($id: ID) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const editProductMutation = gql`
  mutation EditProduct(
    $id: ID
    $name: String!
    $price: Int!
    $description: String!
    $img: String!
  ) {
    editProduct(
      id: $id
      name: $name
      price: $price
      description: $description
      img: $img
    ) {
      name
      id
    }
  }
`;

const editUserMutation = gql`
  mutation EditUser($id: ID, $name: String!, $age: Int!, $phone: String!) {
    editUser(id: $id, name: $name, age: $age, phone: $phone) {
      name
      id
    }
  }
`;

export {
  getProductQuery,
  getProductsQuery,
  getUserQuery,
  getUsersQuery,
  addProductMutation,
  addUserMutation,
  deleteUserMutation,
  deleteProductMutation,
  editUserMutation,
  editProductMutation,
};
