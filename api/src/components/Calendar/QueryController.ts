import { Request, ResponseToolkit, RouteOptions } from '@hapi/hapi';
import { querySchema, queryResponseSchema } from './ValidationSchemas';
import { QueryRequest, SalesManager } from './Types';
import { getEligibleSalesManagers } from './Model';
import Boom from '@hapi/boom';
import { getAvailableSlots } from './helpers';

const options: RouteOptions = {
  validate: querySchema,
  response: queryResponseSchema,
  async handler(req: Request, h: ResponseToolkit) {
    const { date, products, language, rating } = req.payload as QueryRequest;

    //get eligible sales manager that can fit the language, rating and products requirement
    const eligibleSalesManagers: SalesManager[] =
      await getEligibleSalesManagers({
        language,
        rating,
        products,
      });

    if (eligibleSalesManagers.length === 0) {
      return Boom.conflict('No eligible sales manager found');
    }

    const eligibleSalesManagerIds = eligibleSalesManagers.map((m) => m.id);

    const availableSlots = await getAvailableSlots({
      salesManagerIds: eligibleSalesManagerIds,
      date,
    });

    return h.response(availableSlots).code(200);
  },
};

export default options;
