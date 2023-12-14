import Koa from 'koa';
import Router from 'koa-router';
import { server } from './graphql/schema';

import { Dependency } from './entity/Dependency';
import { connect } from './connection';

const app = new Koa();
const router = new Router();

server.start().then(() => {
  server.applyMiddleware({ app });
});

router.get('/dependencyTree', async (ctx, next) => {
  ctx.body = await (await connect()).getTreeRepository(Dependency).findTrees();
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT);

