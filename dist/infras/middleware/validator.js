"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationResult = void 0;
const express_validator_1 = require("express-validator");
const checkValidationResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.checkValidationResult = checkValidationResult;
//# sourceMappingURL=validator.js.map