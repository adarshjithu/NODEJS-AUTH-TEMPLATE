import express from 'express';
import couponRouter from '../api/admin/coupon/couponRouter';
const adminRoutes = express.Router();

adminRoutes.use('/coupons',couponRouter)
export default adminRoutes;