"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports 
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
//setup
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
//middleware
app.use(express_1.default.json());
//run the server
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
