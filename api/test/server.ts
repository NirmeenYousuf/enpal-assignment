import Hapi from '@hapi/hapi';
import Joi from 'joi';
import routes from '../src/routes';

export async function getServer() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.validator(Joi);
  // Add routes
  server.route(routes);
  return server;
}
