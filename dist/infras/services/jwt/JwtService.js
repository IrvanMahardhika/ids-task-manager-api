"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
class JwtService {
    createJWTToken(payload) {
        return jsonwebtoken_1.default.sign(payload, config_1.default.jwtKey, { expiresIn: '7d' });
    }
}
exports.default = JwtService;
//# sourceMappingURL=JwtService.js.map