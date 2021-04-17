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
const models_1 = __importDefault(require("@infras/database/sequelize/models"));
const helpers_1 = require("../helpers");
const { User: UserModel } = models_1.default;
class UserRepository {
    setTransaction(transaction) {
        this.transaction = transaction;
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelizeOptions = helpers_1.repositoryOptionConverter(options);
            const onlineCourse = yield UserModel.findOne(Object.assign(Object.assign({}, sequelizeOptions), { transaction: this.transaction }));
            return onlineCourse && onlineCourse.get({ plain: true });
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelizeOptions = helpers_1.repositoryOptionConverter(options);
            const onlineCourses = yield UserModel.findAll(Object.assign(Object.assign({}, sequelizeOptions), { transaction: this.transaction }));
            return (onlineCourses &&
                onlineCourses.map((onlineCourse) => onlineCourse.get({ plain: true })));
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataEntry = yield UserModel.create(entity);
            return dataEntry;
        });
    }
    delete(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedId = yield UserModel.destroy({
                where: options.where,
                transaction: this.transaction,
            });
            return {
                id: deletedId,
            };
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map