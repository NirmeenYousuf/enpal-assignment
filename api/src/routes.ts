import { ServerRoute } from '@hapi/hapi';
import Calendar from './components/Calendar/Route';
const routes: ServerRoute[] = [...Calendar];
export default routes;
