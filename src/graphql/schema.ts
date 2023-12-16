import { ApolloServer } from 'apollo-server-koa';
import resolvers from '@/graphql/resolvers';

const schemaString = `
type User {
  id: ID!
  userName: String!
  email: String!
}

type Dependency {
  id: ID!
  name: String
  osTypesSupported: [String]
  dependentOf: Dependency
  dependents: [Dependency]
}

type Query {
  users: [User]
  user(id: ID!): User
  dependencies: [Dependency]
}

type Mutation {
  addUser(userName: String!, email: String!): User
  addDependency(name: String!, osTypesSupported: [String], dependentOf: String): Dependency
}
`;

export const server = new ApolloServer({
  typeDefs: schemaString,
  resolvers,
});

