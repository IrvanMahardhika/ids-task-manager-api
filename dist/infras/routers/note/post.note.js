"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createNoteRouter = void 0;
const NoteCreatorAction_1 = __importDefault(require("@core/actions/note/NoteCreatorAction"));
const NoteRepository_1 = __importDefault(require("@infras/repositories/note/NoteRepository"));
const RepositoryTransaction_1 = __importDefault(require("@infras/repositories/RepositoryTransaction"));
const express_1 = __importDefault(require("express"));
const auth = __importStar(require("@infras/middleware/auth"));
const router = express_1.default.Router();
const createNoteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, text } = req.body;
        const action = new NoteCreatorAction_1.default({
            noteRepo: new NoteRepository_1.default(),
            repositoryTransaction: new RepositoryTransaction_1.default(),
        });
        const { status, message } = yield action.create({ taskId, text });
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
exports.createNoteRouter = router.post('/', auth.user, createNoteController);
//# sourceMappingURL=post.note.js.map