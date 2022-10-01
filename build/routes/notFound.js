"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.all("*", function (req, res) {
    res
        .json({
        message: "Route not found",
        status: false,
    })
        .status(404);
});
exports.default = router;
