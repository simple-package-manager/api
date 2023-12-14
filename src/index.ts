import Koa from 'koa';
import Router from 'koa-router';
import { AppDataSource } from './data-source';

import { server } from './graphql/schema';
import { Dependency } from './entity/Dependency';

const app = new Koa();
const router = new Router();

server.start().then(() => {
  server.applyMiddleware({ app });
});

AppDataSource.initialize().then(() => {
  router.get('/dependencyTree', async (ctx, next) => {
    ctx.body = await AppDataSource.getTreeRepository(Dependency).findTrees();
  });

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT);
});

