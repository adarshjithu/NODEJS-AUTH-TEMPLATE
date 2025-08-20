import mongoose, { Document, Schema, Types } from "mongoose";


export interface ICoupon extends Document {
    code: string;
    description?: string;
    discountType: "percentage" | "flat";
    discountValue: number;
    maxDiscountAmount?: number;
    minCartValue: number;
    usageLimit?: {
        total?: number;
        perUser?: number;
    };
    firstOrderOnly: boolean;
    validFrom: Date;
    validTill: Date;
    applicableCategories?: Types.ObjectId[];
    applicableProducts?: Types.ObjectId[];
    applicableBrands?: Types.ObjectId[];
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
}


const couponSchema: Schema<ICoupon> = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: { type: String },
    discountType: {
        type: String,
        enum: ["percentage", "flat"],
        required: true,
    },
    discountValue: { type: Number, required: true },
    maxDiscountAmount: { type: Number },
    minCartValue: { type: Number, default: 0 },
    usageLimit: {
        total: { type: Number },
        perUser: { type: Number },
    },
    firstOrderOnly: { type: Boolean, default: false },
    validFrom: { type: Date, default: Date.now },
    validTill: { type: Date, required: true },
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    applicableBrands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});


export default mongoose.model<ICoupon>("Coupon", couponSchema);

