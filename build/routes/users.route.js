"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controoler_1 = __importDefault(require("../controllers/user.controoler"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// @route get random user /user/random *method=get
router.get("/random", user_controoler_1.default.random);
// @route get all user /user/all *method=get
// also you can use query string limit for limit return data
router.get("/all", user_controoler_1.default.all);
// @route add user /user/save *method=post
router.post("/save", user_controoler_1.default.save);
// @route update user by id /user/(id of user) *method=patch
router.patch("/:id", user_controoler_1.default.update);
// @route get user by id /user/(id of user) *method=get
router.get("/:id", user_controoler_1.default.getOne);
// @route delete user by id /user/(id of user) *method=delete
router.delete("/:id", user_controoler_1.default.deleteUser);
exports.default = router;
