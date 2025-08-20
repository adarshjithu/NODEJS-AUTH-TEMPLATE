"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponRepository_1 = require("./couponRepository");
const couponService_1 = require("./couponService");
const couponController_1 = require("./couponController");
const adminAuth_1 = require("../../../middlewares/adminAuth");
const couponRouter = express_1.default.Router();
const couponRepository = new couponRepository_1.CouponRepository();
const couponService = new couponService_1.CouponService(couponRepository);
const controller = new couponController_1.CouponController(couponService);
couponRouter.post("/", (0, adminAuth_1.adminAuth)(), controller.createCoupon.bind(controller));
couponRouter.put("/:couponId", (0, adminAuth_1.adminAuth)(), controller.updateCoupon.bind(controller));
couponRouter.delete("/:couponId", (0, adminAuth_1.adminAuth)(), controller.deleteCoupon.bind(controller));
couponRouter.get("/", (0, adminAuth_1.adminAuth)(), controller.getAllCoupons.bind(controller));
// couponRouter.patch("/status/:couponId",adminAuth(),controller.toggleCouponStatus.bind(controller))
exports.default = couponRouter;
