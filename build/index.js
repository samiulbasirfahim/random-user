"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var notFound_1 = __importDefault(require("./routes/notFound"));
var users_route_1 = __importDefault(require("./routes/users.route"));
var config_1 = __importDefault(require("./utils/config"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.config = config_1.default;
app.use("/user", users_route_1.default);
app.use("*", notFound_1.default);
app.listen(app.config.port, function () {
    return console.log("app listening on port ".concat(app.config.port));
});
