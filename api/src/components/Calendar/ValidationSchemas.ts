import Joi from 'joi';
import { CustomerRatingsEnum, LanguagesEnum, ProductsEnum } from './Constants';

export const querySchema = {
  payload: Joi.object({
    date: Joi.string().required(),
    products: Joi.array()
      .items(
        Joi.string()
          .valid(...Object.values(ProductsEnum))
          .required(),
      )
      .min(1)
      .required(),
    language: Joi.string()
      .valid(...Object.values(LanguagesEnum))
      .required(),
    rating: Joi.string()
      .valid(...Object.values(CustomerRatingsEnum))
      .required(),
  }),
};

export const queryResponseSchema = {
  status: {
    200: Joi.any(),
    409: Joi.disallow(),
    400: Joi.any(),
  },
};
