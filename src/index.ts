import { createKoaServer } from 'routing-controllers';
import path from 'path';

import { AppDataSource } from './data-source';
import { server } from './graphql/schema';

// Config routing
const app = createKoaServer({
  controllers: [path.join(__dirname + '/controller/*.{js,ts}')],
})

// Handles GraphQL requests
server.start().then(() => {
  server.applyMiddleware({ app });
});

// Initialize ORM and start server
AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT);
});

