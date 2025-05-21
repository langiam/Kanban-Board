// server/src/schemas/index.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
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
    tickets: async (_parent: any, _args: any, _context: any): Promise<any[]> => {
      return [];
    },
    ticket: async (
      _parent: any,
      _args: { id: string },
      _context: any
    ): Promise<any | null> => {
      return null;
    },
    users: async (_parent: any, _args: any, _context: any): Promise<any[]> => {
      return [];
    },
    user: async (
      _parent: any,
      _args: { id: string },
      _context: any
    ): Promise<any | null> => {
      return null;
    },
  },
};
