import { getKnexInstance } from '../../db';

export async function getEligibleSalesManagers({
  language,
  rating,
  products,
}: {
  language: string;
  rating: string;
  products: string[];
}) {
  const db = await getKnexInstance();
  return await db('sales_managers')
    .select('id')
    .where('languages', '&&', [language])
    .where('customer_ratings', '&&', [rating])
    .whereRaw('products @> ?', [products]);
}

export async function getFreeSlotsbyManagerIds({
  salesManagerIds,
  date,
}: {
  salesManagerIds: number[];
  date: string;
}) {
  const db = await getKnexInstance();
  return await db('slots')
    .select('id', 'start_date', 'end_date', 'sales_manager_id')
    .whereIn('sales_manager_id', salesManagerIds)
    .where('booked', false)
    .where('start_date', '>=', `${date} 00:00:00`)
    .where('start_date', '<', `${date} 23:59:59`)
    .orderBy('start_date');
}

export async function getBookedSlotsByManagerIds({
  salesManagerIds,
  date,
}: {
  salesManagerIds: number[];
  date: string;
}) {
  const db = await getKnexInstance();
  return await db('slots')
    .select('start_date', 'end_date', 'sales_manager_id')
    .whereIn('sales_manager_id', salesManagerIds)
    .where('booked', true)
    .where('start_date', '>=', `${date} 00:00:00`)
    .where('start_date', '<', `${date} 23:59:59`);
}
