import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

import resolvers from './resolvers';
const schemaString = `
type User {
  id: ID!
  userName: String!
  email: String!
}

type Query {
  users: [User]
  user(id: ID!): User
}

type Mutation {
  addUser(userName: String!, email: String!): User
}
`;

const server = new ApolloServer({
  typeDefs: schemaString,
  resolvers,
});

const app = new Koa();

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen(process.env.PORT);

