// Import ApolloServer and schema import 
const { ApolloServer } = require("apollo-server");
// Import schema 
const { importSchema } = require("graphql-import");
// Import datasource 
const EtherDataSource = require("./datasource/ethDatasource");
// Import schema
const typeDefs = importSchema("./schema.graphql");

// Configure dotenv
require("dotenv").config();

// Define resolvers
const resolvers = {
  Query: {
    // Resolver to get ether balance
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest ether price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout 
server.timeout = 0;
// Start server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
