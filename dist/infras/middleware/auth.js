"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user = (req, res, next) => {
    if (req.method !== 'OPTIONS') {
        let { authorization } = req.headers;
        console.log(`Auth User || Access attempt at ${new Date()}`);
        jsonwebtoken_1.default.verify(authorization, config_1.default.jwtKey, (error, decodedObject) => {
            const decoded = decodedObject;
            if (error) {
                console.log({ decoded }, 'Auth User || Unauthorized');
                return res.status(401).json({
                    message: 'User not authorized.',
                    error: 'User not authorized.',
                });
            }
            const { userId, email } = decoded;
            console.log('Auth User || Authorized');
            console.log(`User ${email}`);
            res.locals.userId = userId;
            return next();
        });
    }
    else {
        next();
    }
};
exports.user = user;
//# sourceMappingURL=auth.js.map