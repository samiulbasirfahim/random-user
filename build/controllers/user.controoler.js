"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_json_1 = __importDefault(require("../data/users.json"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/* funciton for genarate random number */
var randomNumber = function (limit) {
    var randomNumb = Math.floor(Math.random() * limit);
    if (limit > randomNumb) {
        return randomNumb;
    }
    else {
        return randomNumber(limit);
    }
};
/* for get a random user */
var random = function (req, res) {
    try {
        res.header({ "Content-type": "application/json" });
        res.status(200);
        res.json(users_json_1.default[randomNumber(users_json_1.default.length)]);
    }
    catch (error) {
        res.status(500);
        res.json({ message: "Something went wrong", status: false });
    }
};
/* for get all users */
var all = function (req, res) {
    try {
        var limit = parseInt(req.query.limit);
        if (limit) {
            var newUserData = users_json_1.default.slice(0, limit);
            res.header({ "Content-type": "application/json" });
            return res.json(newUserData).status(200);
        }
        res.header({ "Content-type": "application/json" });
        res.json(users_json_1.default).status(200);
    }
    catch (error) {
        res.json({ message: "Something went wrong", status: false }).status(500);
    }
};
/* for add a user */
var save = function (req, res) {
    try {
        var userDetails = req.body;
        var id = users_json_1.default.length + 1;
        userDetails = __assign({ id: id }, userDetails);
        res.header({ "Content-type": "application/json" });
        if (!userDetails.name) {
            res
                .json({
                message: "User name is required",
                status: false,
            })
                .status(204);
        }
        else if (!userDetails.gender) {
            res
                .json({
                message: "User gender is required",
                status: false,
            })
                .status(204);
        }
        else if (!userDetails.contact) {
            res
                .json({
                message: "User contact is required",
                status: false,
            })
                .status(204);
        }
        else if (!userDetails.photoUrl) {
            res
                .json({
                message: "User photo url is required",
                status: false,
            })
                .status(204);
        }
        else if (!userDetails.address) {
            res
                .json({
                message: "User address is required",
                status: false,
            })
                .status(204);
        }
        else {
            var pathName = path_1.default.join(__dirname, "../data/users.json");
            users_json_1.default.push(userDetails);
            fs_1.default.writeFile(pathName, JSON.stringify(users_json_1.default), function (err) {
                if (err) {
                    res.status(500).json({
                        message: "Something went wrong",
                        status: false,
                    });
                }
                else {
                    res.status(200).json({
                        message: "data added succesfully",
                        status: true,
                    });
                }
            });
        }
    }
    catch (error) {
        res.header({ "Content-type": "application/json" });
        res.json({ message: "Something went wrong", status: false }).status(500);
    }
};
/* for update a user */
var update = function (req, res) {
    try {
        var userFromClient = req.body;
        if (!userFromClient) {
            res.header({ "Content-type": "application/json" });
            return res
                .json({ message: "body is required", status: false })
                .status(500);
        }
        var userId_1 = req.params.id;
        var targetUser = users_json_1.default.find(function (u) { return u.id === Number(userId_1); });
        var restUser = users_json_1.default.filter(function (u) { return u.id !== Number(userId_1); });
        var updatedUser = __assign(__assign({}, targetUser), userFromClient);
        var updatedUserList = __spreadArray(__spreadArray([], restUser, true), [updatedUser], false);
        if (!targetUser) {
            res
                .json({
                message: "User not found",
                status: false,
            })
                .status(404);
        }
        else {
            var pathName = path_1.default.join(__dirname, "../data/users.json");
            fs_1.default.writeFile(pathName, JSON.stringify(updatedUserList), function (err) {
                if (err) {
                    res.header({ "Content-type": "application/json" });
                    res
                        .json({ message: "Something went wrong", status: false })
                        .status(500);
                }
                else {
                    res
                        .json({
                        message: "Updated succesfully",
                        status: true,
                    })
                        .status(200);
                }
            });
        }
    }
    catch (error) {
        res.header({ "Content-type": "application/json" });
        res.json({ message: "Something went wrong", status: false }).status(500);
    }
};
var getOne = function (req, res) {
    try {
        var id_1 = req.params.id;
        if (!id_1) {
            res.header({ "Content-type": "application/json" });
            return res
                .json({ message: "You should provide user id", status: false })
                .status(500);
        }
        var user = users_json_1.default.find(function (user) { return user.id.toString() === id_1; });
        if (user) {
            res.header({ "Content-type": "application/json" });
            res.json(user).status(200);
        }
        else {
            res.header({ "Content-type": "application/json" });
            res.json({ message: "user not found", status: false }).status(404);
        }
    }
    catch (error) {
        res.header({ "Content-type": "application/json" });
        res.json({ message: "Something went wrong", status: false }).status(500);
    }
};
var deleteUser = function (req, res) {
    try {
        var id_2 = req.params.id;
        if (!id_2) {
            res.header({ "Content-type": "application/json" });
            return res
                .json({ message: "You should provide user id", status: false })
                .status(500);
        }
        var user = users_json_1.default.find(function (user) { return user.id.toString() === id_2; });
        if (!user) {
            res.header({ "Content-type": "application/json" });
            return res.json({ message: "user not found", status: false }).status(404);
        }
        var availableUsers = users_json_1.default.filter(function (user) { return user.id.toString() !== id_2; });
        var pathName = path_1.default.join(__dirname, "../data/users.json");
        fs_1.default.writeFile(pathName, JSON.stringify(availableUsers), function (err) {
            if (err) {
                res.header({ "Content-type": "application/json" });
                res.json({ message: "Something went wrong", status: false }).status(500);
            }
            else {
                res
                    .json({
                    message: "Deleted succesfully",
                    status: true,
                })
                    .status(200);
            }
        });
    }
    catch (error) {
        res.header({ "Content-type": "application/json" });
        res.json({ message: "Something went wrong", status: false }).status(500);
    }
};
exports.default = {
    random: random,
    all: all,
    save: save,
    update: update,
    getOne: getOne,
    deleteUser: deleteUser,
};
