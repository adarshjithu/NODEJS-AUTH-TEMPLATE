import { BadRequestError, ConflictError, NotFoundError, ResourceGoneError } from "../../../constants/constants/customErrors";
import { ICoupon } from "../../../models/couponModel";
import { CouponRepository } from "./couponRepository";

export class CouponService {
    constructor(private couponRepository: CouponRepository) {}

    // Create coupon
    async createCoupon(couponData: ICoupon): Promise<ICoupon | null> {
        const coupon = await this.couponRepository.findOne({ code: couponData.code });
        if (coupon) throw new ConflictError("Coupon code already taken ");
        return await this.couponRepository.create(couponData);
    }
    // Update coupon
    async updateCoupon(couponId: string, couponData: ICoupon): Promise<ICoupon | null> {
        const existingCoupon = await this.couponRepository.findById(couponId);
        if (!existingCoupon) throw new NotFoundError("Coupon not found");
        if (!existingCoupon.isDeleted) throw new ResourceGoneError("Coupon has been deleted");

        // Check if another coupon already has this code
        const duplicateCoupon: any = await this.couponRepository.findOne({ code: couponData?.code });
        if (duplicateCoupon && duplicateCoupon._id.toString() !== couponId) {
            throw new ConflictError("Coupon code already taken");
        }

        return await this.couponRepository.update(couponId, { ...couponData, updatedAt: new Date() });
    }
    // Delete coupon
    async deleteCoupon(couponId: string): Promise<ICoupon | null> {
        const existingCoupon = await this.couponRepository.findById(couponId);
        if (!existingCoupon) throw new NotFoundError("Coupon not found");

        if (existingCoupon.isDeleted) {
            throw new BadRequestError("Coupon has already been deleted");
        }

        existingCoupon.isDeleted = true;
        return await existingCoupon.save();
    }

    // Find all coupons
    async getAllCoupons(query: Record<string,any>): Promise<ICoupon[]> {
       

        return await this.couponRepository.findAllCoupons(query as any);
    }
}
