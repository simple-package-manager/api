import { User } from '../entity/User';
import { Dependency } from '../entity/Dependency';
import { AppDataSource } from "../data-source";

const resolvers = {
  Query: {
    users: async () => AppDataSource.getRepository(User).find(),
    user: async (_: any, user: any) => AppDataSource.getRepository(User).findOneBy({ id: user.id }),
    dependencies: async (_: any, user: any) => AppDataSource.getTreeRepository(Dependency).findTrees(),
  },
  Mutation: {
    addUser: async (_: any, { userName, email }: User) => {
      const user = new User;
      user.userName = userName;
      user.email = email;

      return await AppDataSource
        .manager
        .save(user);
    },
    addDependency: async (_: any, { name, osTypesSupported, parent }: {name: string, osTypesSupported: string[], parent: string}) => {
      const dependency = new Dependency();
      dependency.name = name;
      dependency.osTypesSupported = osTypesSupported;
      dependency.parent = await AppDataSource.getRepository(Dependency).findOneBy({ id: parseInt(parent, 10) });

      return await AppDataSource
        .manager
        .save(dependency);
    }
  }
};

export default resolvers;