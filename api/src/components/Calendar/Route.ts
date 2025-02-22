import { ServerRoute } from '@hapi/hapi';
import QueryController from './QueryController';

const routes: ServerRoute[] = [
  {
    method: 'post',
    path: '/calendar/query',
    options: QueryController,
  },
];
export default routes;
