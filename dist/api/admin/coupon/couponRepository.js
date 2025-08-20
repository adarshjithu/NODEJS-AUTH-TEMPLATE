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
exports.CouponRepository = void 0;
const couponModel_1 = __importDefault(require("../../../models/couponModel"));
const baseRepository_1 = require("../../../repository/baseRepository");
class CouponRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(couponModel_1.default);
    }
    findAllCoupons(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status = null, sortOrder = "desc", sortedBy = "createdAt", search, page = "1", limit = "10" } = query;
            const pipeline = [];
            // Filtering
            const matchStage = {};
            if (status === "active")
                matchStage.isActive = true;
            else if (status === "inactive")
                matchStage.isActive = false;
            else if (status === "deleted")
                matchStage.isDeleted = true;
            if (search) {
                matchStage.code = { $regex: search, $options: "i" };
            }
            if (Object.keys(matchStage).length > 0) {
                pipeline.push({ $match: matchStage });
            }
            // Sorting
            pipeline.push({
                $sort: { [sortedBy || "createdAt"]: sortOrder === "asc" ? 1 : -1 },
            });
            // Pagination
            pipeline.push({
                $skip: (Number(page) - 1) * Number(limit),
            });
            pipeline.push({
                $limit: Number(limit),
            });
            return yield couponModel_1.default.aggregate(pipeline);
        });
    }
}
exports.CouponRepository = CouponRepository;
