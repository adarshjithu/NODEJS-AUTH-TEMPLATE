// import { z } from "zod";
// import { Types } from "mongoose";

// // Zod schema for Coupon
// export const couponValidator = z.object({
//     code: z
//         .string()
//         .min(1, "Code is required")
//         .transform((val) => val.toUpperCase().trim()), // mimic uppercase & trim
//     description: z.string().optional(),
//     discountType: z.enum(["percentage", "flat"]),
//     discountValue: z.number().positive("Discount value must be positive"),
//     maxDiscountAmount: z.number().positive().optional(),
//     minCartValue: z.number().nonnegative().default(0),
//     usageLimit: z
//         .object({
//             total: z.number().int().positive().optional(),
//             perUser: z.number().int().positive().optional(),
//         })
//         .optional(),
//     firstOrderOnly: z.boolean().default(false),
//     validFrom: z.preprocess((arg) => (arg ? new Date(arg as string) : new Date()), z.date()).optional(),
//     validTill: z.preprocess((arg) => new Date(arg as string), z.date()),
//     applicableCategories: z.array(z.instanceof(Types.ObjectId)).optional(),
//     applicableProducts: z.array(z.instanceof(Types.ObjectId)).optional(),
//     applicableBrands: z.array(z.instanceof(Types.ObjectId)).optional(),
//     isActive: z.boolean().default(true),
//     isDeleted: z.boolean().default(false),
//     createdAt: z.preprocess((arg) => (arg ? new Date(arg as string) : new Date()), z.date()).optional(),
//     updatedAt: z.preprocess((arg) => (arg ? new Date(arg as string) : undefined), z.date()).optional(),
// });

// // TypeScript type inferred from Zod
// export type CouponInput = z.infer<typeof couponValidator>;


import Joi from 'joi';

 export const createCouponSchema = Joi.object({
  code: Joi.string()
    .trim()
    .uppercase()
    .min(1)
    .required()
    .messages({
      'string.base': `"code" must be a string`,
      'string.empty': `"code" cannot be empty`,
      'any.required': `"code" is required`,
    }),

  description: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': `"description" must be a string`,
    }),

  discountType: Joi.string()
    .valid('percentage', 'flat')
    .required()
    .messages({
      'any.only': `"discountType" must be one of [percentage, flat]`,
      'any.required': `"discountType" is required`,
    }),

  discountValue: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': `"discountValue" must be a number`,
      'number.positive': `"discountValue" must be a positive number`,
      'any.required': `"discountValue" is required`,
    }),

  maxDiscountAmount: Joi.number()
    .positive()
    .optional()
    .messages({
      'number.base': `"maxDiscountAmount" must be a number`,
      'number.positive': `"maxDiscountAmount" must be a positive number`,
    }),

  minCartValue: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': `"minCartValue" must be a number`,
      'number.min': `"minCartValue" cannot be negative`,
    }),

  usageLimit: Joi.object({
    total: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        'number.base': `"usageLimit.total" must be a number`,
        'number.integer': `"usageLimit.total" must be an integer`,
      }),
    perUser: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        'number.base': `"usageLimit.perUser" must be a number`,
        'number.integer': `"usageLimit.perUser" must be an integer`,
      }),
  })
    .optional()
    .messages({
      'object.base': `"usageLimit" must be an object with "total" and/or "perUser"`,
    }),

  firstOrderOnly: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"firstOrderOnly" must be true or false`,
    }),

  validFrom: Joi.date()
    .optional()
    .messages({
      'date.base': `"validFrom" must be a valid date`,
    }),

  validTill: Joi.date()
    .required()
    .messages({
      'date.base': `"validTill" must be a valid date`,
      'any.required': `"validTill" is required`,
      'date.greater': `"validTill" must be later than "validFrom"`,
    }),

  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"isActive" must be true or false`,
    }),

  isDeleted: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"isDeleted" must be true or false`,
    }),

});



export  const updateCouponSchema = Joi.object({
  code: Joi.string()
    .trim()
    .uppercase()
    .min(1)
    .optional()
    .messages({
      'string.base': `"code" must be a string`,
      'string.empty': `"code" cannot be empty`,
    }),

  description: Joi.string()
    .trim()
    .optional()
    .allow('')
    .messages({
      'string.base': `"description" must be a string`,
    }),

  discountType: Joi.string()
    .valid('percentage', 'flat')
    .optional()
    .messages({
      'any.only': `"discountType" must be one of [percentage, flat]`,
    }),

  discountValue: Joi.number()
    .positive()
    .optional()
    .messages({
      'number.base': `"discountValue" must be a number`,
      'number.positive': `"discountValue" must be a positive number`,
    }),

  maxDiscountAmount: Joi.number()
    .positive()
    .optional()
    .messages({
      'number.base': `"maxDiscountAmount" must be a number`,
      'number.positive': `"maxDiscountAmount" must be a positive number`,
    }),

  minCartValue: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': `"minCartValue" must be a number`,
      'number.min': `"minCartValue" cannot be negative`,
    }),

  usageLimit: Joi.object({
    total: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages({
        'number.base': `"usageLimit.total" must be a number`,
        'number.integer': `"usageLimit.total" must be an integer`,
      }),
    perUser: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        'number.base': `"usageLimit.perUser" must be a number`,
        'number.integer': `"usageLimit.perUser" must be an integer`,
      }),
  })
    .optional()
    .messages({
      'object.base': `"usageLimit" must be an object`,
    }),

  firstOrderOnly: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"firstOrderOnly" must be true or false`,
    }),

  validFrom: Joi.date()
    .optional()
    .messages({
      'date.base': `"validFrom" must be a valid date`,
    }),

  validTill: Joi.date()
    .optional()
    .greater(Joi.ref('validFrom'))
    .messages({
      'date.base': `"validTill" must be a valid date`,
      'date.greater': `"validTill" must be later than "validFrom"`,
    }),

  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"isActive" must be true or false`,
    }),

  isDeleted: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': `"isDeleted" must be true or false`,
    }),
})