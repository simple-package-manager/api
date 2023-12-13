const users = [
  { id: '1', username: 'john_doe', email: 'john@example.com' },
  { id: '2', username: 'jane_doe', email: 'jane@example.com' },
];

const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, user: any) => users.find(u => u.id === user.id),
  },
  Mutation: {
    addUser: ({ username, email }: { username: string, email: string }) => {
      const newUser = { id: String(users.length + 1), username, email };
      users.push(newUser);
      return newUser;
    },
  }
};

export default resolvers;