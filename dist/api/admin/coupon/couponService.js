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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const customErrors_1 = require("../../../constants/constants/customErrors");
class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    // Create coupon
    createCoupon(couponData) {
        return __awaiter(this, void 0, void 0, function* () {
            const coupon = yield this.couponRepository.findOne({ code: couponData.code });
            if (coupon)
                throw new customErrors_1.ConflictError("Coupon code already taken ");
            return yield this.couponRepository.create(couponData);
        });
    }
    // Update coupon
    updateCoupon(couponId, couponData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCoupon = yield this.couponRepository.findById(couponId);
            if (!existingCoupon)
                throw new customErrors_1.NotFoundError("Coupon not found");
            if (!existingCoupon.isDeleted)
                throw new customErrors_1.ResourceGoneError("Coupon has been deleted");
            // Check if another coupon already has this code
            const duplicateCoupon = yield this.couponRepository.findOne({ code: couponData === null || couponData === void 0 ? void 0 : couponData.code });
            if (duplicateCoupon && duplicateCoupon._id.toString() !== couponId) {
                throw new customErrors_1.ConflictError("Coupon code already taken");
            }
            return yield this.couponRepository.update(couponId, Object.assign(Object.assign({}, couponData), { updatedAt: new Date() }));
        });
    }
    // Delete coupon
    deleteCoupon(couponId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCoupon = yield this.couponRepository.findById(couponId);
            if (!existingCoupon)
                throw new customErrors_1.NotFoundError("Coupon not found");
            if (existingCoupon.isDeleted) {
                throw new customErrors_1.BadRequestError("Coupon has already been deleted");
            }
            existingCoupon.isDeleted = true;
            return yield existingCoupon.save();
        });
    }
    // Find all coupons
    getAllCoupons(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.couponRepository.findAllCoupons(query);
        });
    }
}
exports.CouponService = CouponService;
