import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import UserForm from "./components/UserForm"

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Product List</h1>
        <ProductList />
        <div id="user-product">
          <ProductForm />
          <UserForm />
        </div>
      </div>
    </ApolloProvider>
  );
}
