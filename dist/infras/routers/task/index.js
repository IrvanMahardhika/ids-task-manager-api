"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_task_1 = require("./get.task");
const post_task_1 = require("./post.task");
const router = express_1.default.Router();
router.use(get_task_1.getTaskRouter);
router.use(post_task_1.postTaskRouter);
exports.default = router;
//# sourceMappingURL=index.js.map