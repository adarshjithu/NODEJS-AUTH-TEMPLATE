"use strict";
// import { z } from "zod";
// import { Types } from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCouponSchema = exports.createCouponSchema = void 0;
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
const joi_1 = __importDefault(require("joi"));
exports.createCouponSchema = joi_1.default.object({
    code: joi_1.default.string()
        .trim()
        .uppercase()
        .min(1)
        .required()
        .messages({
        'string.base': `"code" must be a string`,
        'string.empty': `"code" cannot be empty`,
        'any.required': `"code" is required`,
    }),
    description: joi_1.default.string()
        .trim()
        .optional()
        .allow('')
        .messages({
        'string.base': `"description" must be a string`,
    }),
    discountType: joi_1.default.string()
        .valid('percentage', 'flat')
        .required()
        .messages({
        'any.only': `"discountType" must be one of [percentage, flat]`,
        'any.required': `"discountType" is required`,
    }),
    discountValue: joi_1.default.number()
        .positive()
        .required()
        .messages({
        'number.base': `"discountValue" must be a number`,
        'number.positive': `"discountValue" must be a positive number`,
        'any.required': `"discountValue" is required`,
    }),
    maxDiscountAmount: joi_1.default.number()
        .positive()
        .optional()
        .messages({
        'number.base': `"maxDiscountAmount" must be a number`,
        'number.positive': `"maxDiscountAmount" must be a positive number`,
    }),
    minCartValue: joi_1.default.number()
        .min(0)
        .optional()
        .messages({
        'number.base': `"minCartValue" must be a number`,
        'number.min': `"minCartValue" cannot be negative`,
    }),
    usageLimit: joi_1.default.object({
        total: joi_1.default.number()
            .integer()
            .min(0)
            .optional()
            .messages({
            'number.base': `"usageLimit.total" must be a number`,
            'number.integer': `"usageLimit.total" must be an integer`,
        }),
        perUser: joi_1.default.number()
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
    firstOrderOnly: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"firstOrderOnly" must be true or false`,
    }),
    validFrom: joi_1.default.date()
        .optional()
        .messages({
        'date.base': `"validFrom" must be a valid date`,
    }),
    validTill: joi_1.default.date()
        .required()
        .messages({
        'date.base': `"validTill" must be a valid date`,
        'any.required': `"validTill" is required`,
        'date.greater': `"validTill" must be later than "validFrom"`,
    }),
    isActive: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"isActive" must be true or false`,
    }),
    isDeleted: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"isDeleted" must be true or false`,
    }),
});
exports.updateCouponSchema = joi_1.default.object({
    code: joi_1.default.string()
        .trim()
        .uppercase()
        .min(1)
        .optional()
        .messages({
        'string.base': `"code" must be a string`,
        'string.empty': `"code" cannot be empty`,
    }),
    description: joi_1.default.string()
        .trim()
        .optional()
        .allow('')
        .messages({
        'string.base': `"description" must be a string`,
    }),
    discountType: joi_1.default.string()
        .valid('percentage', 'flat')
        .optional()
        .messages({
        'any.only': `"discountType" must be one of [percentage, flat]`,
    }),
    discountValue: joi_1.default.number()
        .positive()
        .optional()
        .messages({
        'number.base': `"discountValue" must be a number`,
        'number.positive': `"discountValue" must be a positive number`,
    }),
    maxDiscountAmount: joi_1.default.number()
        .positive()
        .optional()
        .messages({
        'number.base': `"maxDiscountAmount" must be a number`,
        'number.positive': `"maxDiscountAmount" must be a positive number`,
    }),
    minCartValue: joi_1.default.number()
        .min(0)
        .optional()
        .messages({
        'number.base': `"minCartValue" must be a number`,
        'number.min': `"minCartValue" cannot be negative`,
    }),
    usageLimit: joi_1.default.object({
        total: joi_1.default.number()
            .integer()
            .min(1)
            .optional()
            .messages({
            'number.base': `"usageLimit.total" must be a number`,
            'number.integer': `"usageLimit.total" must be an integer`,
        }),
        perUser: joi_1.default.number()
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
    firstOrderOnly: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"firstOrderOnly" must be true or false`,
    }),
    validFrom: joi_1.default.date()
        .optional()
        .messages({
        'date.base': `"validFrom" must be a valid date`,
    }),
    validTill: joi_1.default.date()
        .optional()
        .greater(joi_1.default.ref('validFrom'))
        .messages({
        'date.base': `"validTill" must be a valid date`,
        'date.greater': `"validTill" must be later than "validFrom"`,
    }),
    isActive: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"isActive" must be true or false`,
    }),
    isDeleted: joi_1.default.boolean()
        .optional()
        .messages({
        'boolean.base': `"isDeleted" must be true or false`,
    }),
});
