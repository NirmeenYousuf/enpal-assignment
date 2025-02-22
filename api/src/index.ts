import Hapi from '@hapi/hapi';
import routes from './routes';

import Joi from 'joi';

export async function startServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });
  server.validator(Joi);
  // Add routes
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

void startServer();
