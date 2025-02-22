import {
  CustomerRatingsEnum,
  LanguagesEnum,
  ProductsEnum,
} from '../src/components/Calendar/Constants';

export function buildSalesManager() {
  return {
    id: 1000,
    name: 'Sales Manager 1',
    languages: [LanguagesEnum.English],
    products: [ProductsEnum.Heatpumps],
    customer_ratings: [CustomerRatingsEnum.Bronze],
  };
}

export function buildSlots() {
  return [
    {
      id: 1001,
      start_date: new Date('2025-02-21T10:30Z'),
      end_date: new Date('2025-02-21T11:30Z'),
      booked: true,
      sales_manager_id: 1000,
    },
    {
      id: 1002,
      start_date: new Date('2025-02-21T11:00Z'),
      end_date: new Date('2025-02-21T12:00Z'),
      booked: false,
      sales_manager_id: 1000,
    },
    {
      id: 1003,
      start_date: new Date('2025-02-21T11:30Z'),
      end_date: new Date('2025-02-21T12:30Z'),
      booked: false,
      sales_manager_id: 1000,
    },
  ];
}
