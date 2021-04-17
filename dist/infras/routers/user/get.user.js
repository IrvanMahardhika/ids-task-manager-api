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
exports.getUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserFinderAction_1 = __importDefault(require("@core/actions/user/UserFinderAction"));
const UserRepository_1 = __importDefault(require("@infras/repositories/user/UserRepository"));
const JwtService_1 = __importDefault(require("@infras/services/jwt/JwtService"));
const EncriptionService_1 = __importDefault(require("@infras/services/encription/EncriptionService"));
const router = express_1.default.Router();
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.query;
        const action = new UserFinderAction_1.default({
            userRepo: new UserRepository_1.default(),
        }, {
            jwtService: new JwtService_1.default(),
            encriptionService: new EncriptionService_1.default(),
        });
        const { status, message, data } = yield action.login({
            email: String(email),
            encriptedPassword: String(password),
        });
        if (status === 'SUCCESS') {
            res.status(200).send({
                message,
                data,
            });
            return;
        }
        res.status(400).send({ message });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserRouter = router.get('/login', getUserController);
//# sourceMappingURL=get.user.js.map