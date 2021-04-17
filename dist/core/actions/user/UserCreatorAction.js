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
class UserCreatorAction {
    constructor(repo, services) {
        const { userRepo, repositoryTransaction } = repo;
        this.userRepo = userRepo;
        this.repositoryTransaction = repositoryTransaction;
        const { encriptionService } = services;
        this.encriptionService = encriptionService;
    }
    startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.repositoryTransaction) {
                yield this.repositoryTransaction.startTransaction([this.userRepo]);
            }
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.repositoryTransaction) {
                yield this.repositoryTransaction.commit();
            }
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.repositoryTransaction) {
                yield this.repositoryTransaction.rollback();
            }
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startTransaction();
            try {
                const { name, email, password: encriptedPassword } = userData;
                const { decrypt, generateHash } = this.encriptionService;
                const decryptedPassword = decrypt(encriptedPassword);
                const newUserData = yield this.userRepo.create({
                    name,
                    email,
                    password: generateHash(decryptedPassword),
                });
                yield this.commit();
                return {
                    status: 'SUCCESS',
                    message: 'Success',
                    data: newUserData,
                };
            }
            catch (error) {
                yield this.rollback();
                if (returnValue_1.instanceOfReturnValue(error)) {
                    return error;
                }
                throw error;
            }
        });
    }
}
exports.default = UserCreatorAction;
//# sourceMappingURL=UserCreatorAction.js.map