// server/src/schemas/index.ts
import { gql } from 'apollo-server-express';
// 1) Define your schema
export const typeDefs = gql `
  type Ticket {
    id: ID!
    title: String!
    description: String
    status: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    tickets: [Ticket]
    ticket(id: ID!): Ticket
    users: [User]
    user(id: ID!): User
  }
`;
// 2) Wire up your resolvers (stubbed here for example)
export const resolvers = {
    Query: {
        tickets: async (_parent, _args, { db }) => {
            // e.g. return db.models.Ticket.findAll();
            return [];
        },
        ticket: async (_parent, { id }, { db }) => {
            // e.g. return db.models.Ticket.findByPk(id);
            return null;
        },
        users: async (_parent, _args, { db }) => [],
        user: async (_parent, { id }, { db }) => null,
    },
};
