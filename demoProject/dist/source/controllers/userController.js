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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.deleteUser = exports.updateProfile = exports.getProfile = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//------------------------------------------ Signup API start------------------------------------------ //
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, dreamCompany } = req.body;
        const existingUser = yield userModel_1.default.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exit please login" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield userModel_1.default.create({ username: username, email: email, password: hashedPassword, dreamCompany: dreamCompany });
        res.send({ message: "signup successfull" });
    });
}
exports.signup = signup;
;
//------------------------------------------ Signup API end------------------------------------------ //
//------------------------------------------ Login API start------------------------------------------ //
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const plainTextPassword = req.body.password;
        const user = yield userModel_1.default.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordsMatch = yield bcrypt_1.default.compare(plainTextPassword, user.password);
        if (!passwordsMatch) {
            return res.status(404).send('Incorrect password');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secret');
        res.send({ token });
    });
}
exports.login = login;
;
//------------------------------------------ Login API ends------------------------------------------ //
//------------------------------------------ Get Profile API start------------------------------------------ //
function getProfile(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        try {
            if (!token) {
                return res.status(401).send('Authorization token not found');
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
            console.log(decodedToken);
            const email = decodedToken;
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            console.log("user:", user);
            if (!user) {
                return res.status(404).send('User not found');
            }
            else {
                res.send(user);
            }
        }
        catch (error) {
            console.log;
            return res.status(401).send('Invalid token');
        }
    });
}
exports.getProfile = getProfile;
;
//------------------------------------------ Get Profile API end------------------------------------------ //
//------------------------------------------ Update Profile API start------------------------------------------ //
function updateProfile(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        try {
            if (!token) {
                return res.status(401).send('Authorization token not found');
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
            console.log(decodedToken);
            const email = decodedToken;
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            if (!user) {
                return res.status(404).send('User not found');
            }
            // Update the user's profile with the new data
            const { username, password } = req.body;
            if (username) {
                user.username = username;
            }
            if (password) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 5);
                user.password = hashedPassword;
            }
            yield user.save();
            res.send('Profile updated successfully');
        }
        catch (error) {
            console.log(error);
            return res.status(401).send('Invalid token');
        }
    });
}
exports.updateProfile = updateProfile;
;
//------------------------------------------ Update Profile API end------------------------------------------ //
//------------------------------------------ Delete Profile API start------------------------------------------ //
function deleteUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        try {
            if (!token) {
                return res.status(401).send('Authorization token not found');
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
            console.log(decodedToken);
            const email = decodedToken;
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            console.log("user:", user);
            if (!user) {
                return res.status(404).send('User not found');
            }
            yield user.destroy();
            res.send('User delete successfully........');
        }
        catch (error) {
            console.log;
            return res.status(401).send('Invalid token');
        }
    });
}
exports.deleteUser = deleteUser;
//------------------------------------------ Delete Profile API end------------------------------------------ //
//------------------------------------------ Forget Password API start------------------------------------------ //
function forgetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, dreamCompany, newPassword } = req.body;
        try {
            const user = yield userModel_1.default.findOne({ where: { email: email } });
            if (!user) {
                return res.status(404).json({ message: "user does not exist" });
            }
            if (dreamCompany === user.dreamCompany) {
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 5);
                user.password = hashedPassword;
                yield user.save();
                const token = jsonwebtoken_1.default.sign(user.email, 'secret');
                res.json({ message: "security question passed and password updated successfully and now you are logged in !!", token });
            }
            else {
                return res.status(404).json({ message: "security question failed!!" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" });
        }
    });
}
exports.forgetPassword = forgetPassword;
//------------------------------------------ Forget Password API end------------------------------------------ //
