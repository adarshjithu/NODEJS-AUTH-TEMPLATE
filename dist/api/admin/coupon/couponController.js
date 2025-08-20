"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const couponValidator_1 = require("../../../validations/couponValidator");
const customErrors_1 = require("../../../constants/constants/customErrors");
const statusCodes_1 = require("../../../constants/constants/statusCodes");
const mongoose_1 = __importDefault(require("mongoose"));
class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    // @description: Create coupon
    // @route: POST /api/v1/admin/coupons
    createCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, customErrors_1.BodyValidator)(couponValidator_1.createCouponSchema, req.body);
                const result = yield this.couponService.createCoupon(req.body);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json({ success: true, message: "Coupon created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Update coupon
    // @route: PUT /api/v1/admin/coupons/:couponId
    updateCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { couponId } = req.params;
                if (!mongoose_1.default.Types.ObjectId.isValid(couponId))
                    throw new customErrors_1.NotFoundError("Invalid couponId");
                (0, customErrors_1.BodyValidator)(couponValidator_1.updateCouponSchema, req.body);
                const result = yield this.couponService.updateCoupon(couponId, req.body);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "Coupon updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Delete coupon
    // @route: DELETE /api/v1/admin/coupons/:couponId
    deleteCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { couponId } = req.params;
                if (!couponId || !mongoose_1.default.Types.ObjectId.isValid(couponId))
                    throw new customErrors_1.NotFoundError("Invalid couponId");
                const result = yield this.couponService.deleteCoupon(couponId);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "Coupon has been successfully removed", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Get all coupons
    // @route: GET /api/v1/admin/coupons
    getAllCoupons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.couponService.getAllCoupons(req.query);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ success: true, message: "", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CouponController = CouponController;
