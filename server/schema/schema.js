const graphql = require("graphql");
const { findById } = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    phone: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ userId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          age: args.age,
          phone: args.phone,
        });
        return user.save();
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let product = new Product({
          name: args.name,
          price: args.price,
          description: args.description,
          img: args.img,
          userId: args.userId,
        });
        return product.save();
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        await User.findByIdAndDelete(args.id);
        await Product.deleteMany({ userId: args.id });
        return;
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id);
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        await User.updateOne(
          { _id: args.id },
          {
            name: args.name,
            age: args.age,
            phone: args.phone,
          }
        );
        return args;
      },
    },
    editProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        await Product.updateOne(
          { _id: args.id },
          {
            name: args.name,
            price: args.price,
            description: args.description,
            img: args.img,
          }
        );

        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
