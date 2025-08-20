import { NextFunction, Request, Response } from "express";
import { CouponService } from "./couponService";
import { createCouponSchema, updateCouponSchema } from "../../../validations/couponValidator";
import { BodyValidator, NotFoundError } from "../../../constants/constants/customErrors";
import { STATUS_CODES } from "../../../constants/constants/statusCodes";
import mongoose from "mongoose";

export class CouponController {
    constructor(private couponService: CouponService) {}

    // @description: Create coupon
    // @route: POST /api/v1/admin/coupons
    async createCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            BodyValidator(createCouponSchema, req.body);
            const result = await this.couponService.createCoupon(req.body);
            res.status(STATUS_CODES.CREATED).json({ success: true, message: "Coupon created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }
    // @description: Update coupon
    // @route: PUT /api/v1/admin/coupons/:couponId
    async updateCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { couponId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(couponId)) throw new NotFoundError("Invalid couponId");
            BodyValidator(updateCouponSchema, req.body);
            const result = await this.couponService.updateCoupon(couponId,req.body);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Coupon updated successfully", data: result });
        } catch (error) {
            next(error);
        }
    }
    // @description: Delete coupon
    // @route: DELETE /api/v1/admin/coupons/:couponId
    async deleteCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { couponId } = req.params;
            if (!couponId||!mongoose.Types.ObjectId.isValid(couponId)) throw new NotFoundError("Invalid couponId");
            const result = await this.couponService.deleteCoupon(couponId);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Coupon has been successfully removed", data: result });
        } catch (error) {
            next(error);
        }
    }
    // @description: Get all coupons
    // @route: GET /api/v1/admin/coupons
    async getAllCoupons(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
           
            const result = await this.couponService.getAllCoupons(req.query as any);
            res.status(STATUS_CODES.OK).json({ success: true, message: "", data: result });
        } catch (error) {
            next(error);
        }
    }
}
