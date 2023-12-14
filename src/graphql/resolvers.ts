import { User } from '../entity/User';
import { Dependency } from '../entity/Dependency';
import { connect } from '../connection';

const resolvers = {
  Query: {
    users: async () => (await connect()).getRepository(User).find(),
    user: async (_: any, user: any) => (await connect()).getRepository(User).findOne({ id: user.id }),
    dependencies: async (_: any, user: any) => (await connect()).getTreeRepository(Dependency).findTrees(),
  },
  Mutation: {
    addUser: async (_: any, { userName, email }: User) => {
      const user = new User;
      user.userName = userName;
      user.email = email;

      return await (await connect())
        .manager
        .save(user);
    },
    addDependency: async (_: any, { name, osTypesSupported, parent }: {name: string, osTypesSupported: string[], parent: string}) => {
      const dependency = new Dependency();
      dependency.name = name;
      dependency.osTypesSupported = osTypesSupported;
      dependency.parent = await (await connect()).getRepository(Dependency).findOne({ id: parseInt(parent, 10) });

      return await (await connect())
        .manager
        .save(dependency);
    }
  }
};

export default resolvers;