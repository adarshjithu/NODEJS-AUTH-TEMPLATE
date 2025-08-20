import couponModel, { ICoupon } from "../../../models/couponModel";
import { BaseRepository } from "../../../repository/baseRepository";

export class CouponRepository extends BaseRepository<ICoupon> {
    constructor() {
        super(couponModel);
    }

    async findAllCoupons(query: {
        status?: string;
        sortOrder?: string;
        sortedBy?: string;
        page?: string;
        search?: string;
        limit?: string;
    }): Promise<ICoupon[]> {
        const { status = null, sortOrder = "desc", sortedBy = "createdAt", search, page = "1", limit = "10" } = query;

        const pipeline: any[] = [];

        // Filtering
        const matchStage: any = {};

        if (status === "active") matchStage.isActive = true;
        else if (status === "inactive") matchStage.isActive = false;
        else if (status === "deleted") matchStage.isDeleted = true;

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

        return await couponModel.aggregate(pipeline);
    }
}
