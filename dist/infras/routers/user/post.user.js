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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRouter = void 0;
const UserCreatorAction_1 = __importDefault(require("@core/actions/user/UserCreatorAction"));
const UserRepository_1 = __importDefault(require("@infras/repositories/user/UserRepository"));
const RepositoryTransaction_1 = __importDefault(require("@infras/repositories/RepositoryTransaction"));
const EncriptionService_1 = __importDefault(require("@infras/services/encription/EncriptionService"));
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validator_1 = require("@infras/middleware/validator");
const router = express_1.default.Router();
const registerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const action = new UserCreatorAction_1.default({
            userRepo: new UserRepository_1.default(),
            repositoryTransaction: new RepositoryTransaction_1.default(),
        }, {
            encriptionService: new EncriptionService_1.default(),
        });
        const { status, message } = yield action.register({
            name,
            email,
            password,
        });
        if (status === 'SUCCESS') {
            res.status(200).send({
                message,
            });
            return;
        }
        res.status(400).send({ message });
    }
    catch (err) {
        next(err);
    }
});
exports.registerUserRouter = router.post('/register', express_validator_1.body('email').isEmail(), validator_1.checkValidationResult, registerUserController);
//# sourceMappingURL=post.user.js.map