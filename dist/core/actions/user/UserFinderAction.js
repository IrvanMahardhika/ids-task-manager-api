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
Object.defineProperty(exports, "__esModule", { value: true });
const returnValue_1 = require("@core/utils/returnValue");
class TaskCreatorAction {
    constructor(repo, services) {
        const { userRepo } = repo;
        this.userRepo = userRepo;
        const { jwtService, encriptionService } = services;
        this.jwtService = jwtService;
        this.encriptionService = encriptionService;
    }
    login(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, encriptedPassword } = conditions;
                const { decrypt, compareHash } = this.encriptionService;
                const decryptedPassword = decrypt(encriptedPassword);
                const user = yield this.userRepo.findOne({
                    where: { email },
                });
                if (!user) {
                    return {
                        status: 'INVALID',
                        message: 'Email / Password is incorrect',
                    };
                }
                if (!compareHash(decryptedPassword, user.password)) {
                    return {
                        status: 'INVALID',
                        message: 'Email / Password is incorrect',
                    };
                }
                const token = this.jwtService.createJWTToken({
                    userId: user.id,
                    email: user.email,
                });
                const data = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token,
                };
                return {
                    status: 'SUCCESS',
                    message: 'success',
                    data,
                };
            }
            catch (error) {
                if (returnValue_1.instanceOfReturnValue(error)) {
                    return error;
                }
                throw error;
            }
        });
    }
}
exports.default = TaskCreatorAction;
//# sourceMappingURL=UserFinderAction.js.map