"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
class EncriptionService {
    decrypt(hash) {
        const decipher = crypto_1.default.createDecipheriv('aes-192-ccm', process.env.APP_KEY || 'lisaann', null);
        let decrypted = decipher.update(hash, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
    generateHash(data) {
        const result = bcryptjs_1.default.hashSync(data, saltRounds);
        return result;
    }
    compareHash(val1, val2) {
        const result = bcryptjs_1.default.compareSync(val1, val2);
        return result;
    }
}
exports.default = EncriptionService;
//# sourceMappingURL=CryptoService.js.map