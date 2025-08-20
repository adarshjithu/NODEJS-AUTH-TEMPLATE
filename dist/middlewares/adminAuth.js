"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const adminAuth = () => {
    return (req, res, next) => {
        next();
    };
};
exports.adminAuth = adminAuth;
