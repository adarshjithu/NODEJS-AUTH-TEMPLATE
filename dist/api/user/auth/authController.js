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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../../config");
const customErrors_1 = require("../../../constants/constants/customErrors");
const statusCodes_1 = require("../../../constants/constants/statusCodes");
const otpValidator_1 = require("../../../validations/otpValidator");
const userValidator_1 = require("../../../validations/userValidator");
const google_auth_library_1 = require("google-auth-library");
const validateTarget_1 = require("../../../utils/otp/validateTarget");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    // @description: Register a new user
    // @route: POST /api/v1/auth/register
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { purpose, verificationId } = _a, userData = __rest(_a, ["purpose", "verificationId"]);
                userValidator_1.userValidationSchema.parse(userData);
                if (!['register-email', 'register-phone'].includes(purpose)) {
                    throw new customErrors_1.BadRequestError("Invalid purpose");
                }
                if (!verificationId || !mongoose_1.default.Types.ObjectId.isValid(verificationId)) {
                    throw new customErrors_1.BadRequestError("Invalid verification Id");
                }
                const verificationMethod = purpose == 'register-email' ? 'email' : 'phone';
                const { accessToken, refreshToken, user } = yield this.authService.registerUser(Object.assign({ verificationMethod,
                    verificationId }, userData));
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User registration successful",
                    user,
                });
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    // @description: Send otp a new user
    // @route: POST /api/v1/auth/send-otp
    sendOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                otpValidator_1.otpValidatorSchema.parse(req.body);
                const { target, purpose, code } = req.body;
                (0, validateTarget_1.validateTarget)(target);
                const result = yield this.authService.sendOTP({
                    target,
                    purpose,
                    code,
                });
                res.status(statusCodes_1.STATUS_CODES.CREATED).json({
                    success: true,
                    message: `OTP successfully sent`,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Verify email
    // @route: POST /api/v1/auth/verify-otp
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                otpValidator_1.otpVerificationValidationSchema.parse(req.body);
                const { target, purpose, otp, code } = req.body;
                const result = yield this.authService.verifyOtp({ target, purpose, otp, code });
                res.status(statusCodes_1.STATUS_CODES.OK).json({
                    message: "✅ OTP verification  successfull",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Login user
    // @route: POST /api/v1/auth/login
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userValidator_1.loginSchema.parse(req.body);
                const { user, accessToken, refreshToken } = yield this.authService.userlogin(req.body);
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User login successful",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Login user with email OTP
    // @route: POST /api/v1/auth/email-login
    userLoginWithEmailOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, verificationId } = req.body;
                if (!email || !verificationId)
                    throw new customErrors_1.NotFoundError("Invalid credentials");
                if (!mongoose_1.default.Types.ObjectId.isValid(verificationId))
                    throw new customErrors_1.BadRequestError("Invalid verificationId");
                const { user, accessToken, refreshToken } = yield this.authService.loginWithEmailOtp({ email, verificationId });
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User login successful",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Login user with phone OTP
    // @route: POST /api/v1/auth/login-phone
    userLoginWithPhoneOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone, verificationId, code } = req.body;
                if (!phone || !verificationId || code)
                    throw new customErrors_1.NotFoundError("Invalid credentials");
                if (!mongoose_1.default.Types.ObjectId.isValid(verificationId))
                    throw new customErrors_1.BadRequestError("Invalid verificationId");
                const { user, accessToken, refreshToken } = yield this.authService.loginWithMobileOtp({ phone, code, verificationId });
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User login successful",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Forget password
    // @route: POST /api/v1/auth/forget-password
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { credential, purpose, verificationId, password } = req.body;
                if (!credential || !verificationId || !purpose || !password)
                    throw new customErrors_1.NotFoundError("Invalid credentials");
                if (!["forget-password-email", "forget-password-phone"].includes(purpose)) {
                    throw new customErrors_1.NotFoundError("Invalid purpose");
                }
                if (!mongoose_1.default.Types.ObjectId.isValid(verificationId))
                    throw new customErrors_1.BadRequestError("Invalid verificationId");
                const verificationMethod = purpose == 'forget-password-email' ? 'email' : "phone";
                const result = yield this.authService.forgetPassword({ credential, verificationId, password, verificationMethod });
                res.status(statusCodes_1.STATUS_CODES.OK).json({
                    success: true,
                    message: "✅ You have successfully updated your password. Please log in with your new password.",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Reset password
    // @route: POST /api/v1/auth/reset-password
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { oldPassword, newPassword } = req.body;
                if (!oldPassword || !newPassword)
                    throw new customErrors_1.NotFoundError("Old password and new password is required");
                yield this.authService.resetPassword((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, oldPassword, newPassword);
                res.status(statusCodes_1.STATUS_CODES.OK).json({
                    success: true,
                    message: "✅ You have successfully updated your password",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Create account with google
    // @route: POST /api/v1/auth/google-signup
    signUpWithGoogle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { credential } = req.body;
                const client = new google_auth_library_1.OAuth2Client(config_1.GOOGLE_CLIENT_ID);
                if (!credential)
                    throw new customErrors_1.NotFoundError("Credential is required");
                const ticket = yield client.verifyIdToken({
                    idToken: credential,
                    audience: config_1.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload) {
                    throw new customErrors_1.UnAuthorizedError("Invalid google token");
                }
                const { email, given_name, picture } = payload;
                const userObj = { name: given_name, email, profilePicture: picture };
                const { user, accessToken, refreshToken } = yield this.authService.createAccountWithGoogle(userObj);
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User login successful",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @description: Login with google
    // @route: POST /api/v1/auth/google-login
    googleLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { credential } = req.body;
                const client = new google_auth_library_1.OAuth2Client(config_1.GOOGLE_CLIENT_ID);
                if (!credential)
                    throw new customErrors_1.NotFoundError("Credential is required");
                const ticket = yield client.verifyIdToken({
                    idToken: credential,
                    audience: config_1.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload) {
                    throw new customErrors_1.UnAuthorizedError("Invalid google token");
                }
                const { email } = payload;
                const { user, accessToken, refreshToken } = yield this.authService.googleLogin(email);
                res.cookie("ecom-access-token", accessToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.ACCESS_TOKEN_MAXAGE),
                })
                    .cookie("ecom-refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: config_1.SECURE,
                    sameSite: "strict",
                    maxAge: Number(config_1.REFRESH_TOKEN_MAXAGE),
                })
                    .status(statusCodes_1.STATUS_CODES.CREATED)
                    .json({
                    success: true,
                    message: "✅ User login successful",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
