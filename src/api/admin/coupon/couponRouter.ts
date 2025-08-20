import express from 'express'
import { CouponRepository } from './couponRepository';
import { CouponService } from './couponService';
import { CouponController } from './couponController';
import { adminAuth } from '../../../middlewares/adminAuth';

const couponRouter = express.Router();

const couponRepository = new CouponRepository();
const couponService = new CouponService(couponRepository);
const controller = new CouponController(couponService);

couponRouter.post("/",adminAuth(),controller.createCoupon.bind(controller));
couponRouter.put("/:couponId",adminAuth(),controller.updateCoupon.bind(controller));
couponRouter.delete("/:couponId",adminAuth(),controller.deleteCoupon.bind(controller));
couponRouter.get("/",adminAuth(),controller.getAllCoupons.bind(controller));
// couponRouter.patch("/status/:couponId",adminAuth(),controller.toggleCouponStatus.bind(controller))

export default couponRouter