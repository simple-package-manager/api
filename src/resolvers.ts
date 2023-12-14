import { User } from "./entity/User";
import { connect } from './connection';

const resolvers = {
  Query: {
    users: async () => (await connect()).getRepository(User).find(),
    user: async (_: any, user: any) => (await connect()).getRepository(User).findOne({ id: user.id }),
  },
  Mutation: {
    addUser: async (_: any, { userName, email }: User) => {
      const user = new User;
      user.userName = userName;
      user.email = email;

      await (await connect())
        .manager
        .save(user);
    },
  }
};

export default resolvers;