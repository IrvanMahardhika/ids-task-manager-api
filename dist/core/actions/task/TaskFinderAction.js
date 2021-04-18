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
class TaskFinderAction {
    constructor(repo) {
        const { taskRepo } = repo;
        this.taskRepo = taskRepo;
    }
    getTaskByUserId(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = conditions;
                const taskListPerUser = yield this.taskRepo.findAll({
                    where: { userId },
                    include: [
                        {
                            model: 'Note',
                            as: 'note',
                            required: false,
                        },
                    ],
                });
                return {
                    status: 'SUCCESS',
                    message: 'success',
                    data: taskListPerUser,
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
exports.default = TaskFinderAction;
//# sourceMappingURL=TaskFinderAction.js.map