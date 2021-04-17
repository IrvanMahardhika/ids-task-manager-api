"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../../config"));
const saltRounds = 10;
class EncriptionService {
    decrypt(hash) {
        const { cryptoKey, cryptoIv } = config_1.default;
        const encryptedText = Buffer.from(hash, 'hex');
        const decipher = crypto_1.default.createDecipheriv('aes-256-gcm', cryptoKey, cryptoIv);
        let decrypted = decipher.update(encryptedText);
        return decrypted.toString();
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
//# sourceMappingURL=EncriptionService.js.map