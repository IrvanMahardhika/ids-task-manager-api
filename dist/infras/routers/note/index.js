"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_note_1 = require("./post.note");
const router = express_1.default.Router();
router.use(post_note_1.createNoteRouter);
exports.default = router;
//# sourceMappingURL=index.js.map