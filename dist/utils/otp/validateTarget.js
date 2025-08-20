"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTarget = validateTarget;
const customErrors_1 = require("../../constants/constants/customErrors");
function validateTarget(target) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone: only digits, 7–15 length
    const phoneRegex = /^\d{7,15}$/;
    if (emailRegex.test(target))
        return "email";
    if (phoneRegex.test(target))
        return "phone";
    throw new customErrors_1.BadRequestError("Target must be a valid email or phone number");
}
