import { Server, ServerInjectOptions } from '@hapi/hapi';
import { getServer } from '../server';
import { SalesManager, Slot } from '../../src/components/Calendar/Types';
import { buildSalesManager, buildSlots } from '../fixtures';
import { deleteData, insert } from '../db';
import { CustomerRatingsEnum } from '../../src/components/Calendar/Constants';

describe('POST /calendar/query', () => {
  let server: Server;
  let salesManager: SalesManager;
  let slots: Slot[];

  beforeAll(async () => {
    server = await getServer();
    salesManager = buildSalesManager();
    slots = buildSlots();
    await insert('sales_managers', salesManager);
    await insert('slots', slots);
  });

  afterAll(async () => {
    await deleteData('slots', { sales_manager_id: salesManager.id });
    await deleteData('sales_managers', { id: salesManager.id });
    await server.stop();
  });

  function getInjectOptions(): ServerInjectOptions {
    return {
      method: 'post',
      url: `/calendar/query`,
    };
  }

  function getPayload() {
    return {
      date: '2025-02-21',
      products: ['Heatpumps'],
      language: 'English',
      rating: 'Silver',
    };
  }

  it('should return 400 if date is missing from payload', async () => {
    const payload = getPayload() as any;
    delete payload.date;

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if products is missing from payload', async () => {
    const payload = getPayload() as any;
    delete payload.products;

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if language is missing from payload', async () => {
    const payload = getPayload() as any;
    delete payload.language;

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if rating is missing from payload', async () => {
    const payload = getPayload() as any;
    delete payload.rating;

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if invalid product is in payload', async () => {
    const payload = getPayload() as any;
    payload.products = ['invalid product'];

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if invalid language is in payload', async () => {
    const payload = getPayload() as any;
    payload.language = 'invalid language';

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 if invalid rating is in payload', async () => {
    const payload = getPayload() as any;
    payload.rating = 'invalid rating';

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);

    expect(res.statusCode).toEqual(400);
  });

  /*This test can not work right now due to the reason that the data provided with the assignment
  fulfills all the conditions and atleast one eligible salesperson would be there in every case but still the 
  check is good to have in code and if a separate DB instance for test is setup for the actual application code,
  this test can be enabled
   */
  // it('should return 409 with a valid error message if no eligible sales manager found', async () => {
  //   const payload = getPayload() as any;

  //   const options = getInjectOptions();
  //   options.payload = payload;
  //   const res = await server.inject(options);
  //   const result = res.result as any;
  //   expect(res.statusCode).toEqual(409);
  //   expect(result.message).toBe('No eligible sales manager found');
  // });

  it('should return 200 with available slots', async () => {
    const payload = getPayload() as any;
    payload.rating = CustomerRatingsEnum.Bronze;

    const options = getInjectOptions();
    options.payload = payload;
    const res = await server.inject(options);
    const result = res.result as any;
    expect(res.statusCode).toEqual(200);
    expect(result.length).toBe(1);
  });
});
