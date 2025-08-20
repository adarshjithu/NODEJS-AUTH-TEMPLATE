"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const couponRouter_1 = __importDefault(require("../api/admin/coupon/couponRouter"));
const adminRoutes = express_1.default.Router();
adminRoutes.use('/coupons', couponRouter_1.default);
exports.default = adminRoutes;
