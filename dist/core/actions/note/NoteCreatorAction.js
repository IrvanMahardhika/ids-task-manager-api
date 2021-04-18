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
    constructor(repo) {
        const { noteRepo, repositoryTransaction } = repo;
        this.noteRepo = noteRepo;
        this.repositoryTransaction = repositoryTransaction;
    }
    startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.repositoryTransaction) {
                yield this.repositoryTransaction.startTransaction([this.noteRepo]);
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
    create(noteData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startTransaction();
            try {
                const newNoteData = yield this.noteRepo.create(noteData);
                yield this.commit();
                return {
                    status: 'SUCCESS',
                    message: 'Success',
                    data: newNoteData,
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
exports.default = TaskCreatorAction;
//# sourceMappingURL=NoteCreatorAction.js.map