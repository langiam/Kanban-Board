// server/src/schemas/index.ts
import { gql } from 'graphql-tag';
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
export const resolvers = {
    Query: {
        tickets: async (_parent, _args, _context) => {
            return [];
        },
        ticket: async (_parent, _args, _context) => {
            return null;
        },
        users: async (_parent, _args, _context) => {
            return [];
        },
        user: async (_parent, _args, _context) => {
            return null;
        },
    },
};
