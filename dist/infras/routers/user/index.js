"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_user_1 = require("./get.user");
const post_user_1 = require("./post.user");
const router = express_1.default.Router();
router.use(get_user_1.getUserRouter);
router.use(post_user_1.postUserRouter);
exports.default = router;
//# sourceMappingURL=index.js.map