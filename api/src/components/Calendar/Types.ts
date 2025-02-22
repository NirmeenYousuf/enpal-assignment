export type QueryRequest = {
  date: string;
  products: string[];
  language: string;
  rating: string;
};

export type SalesManager = {
  id: number;
  name: string;
  languages: string[];
  products: string[];
  customer_ratings: string[];
};

export type Slot = {
  id: number;
  start_date: Date;
  end_date: Date;
  booked: boolean;
  sales_manager_id: number;
};
