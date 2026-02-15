"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJsonFile = loadJsonFile;
exports.saveJsonFile = saveJsonFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadJsonFile(relativePath, defaultValue) {
    const filePath = path_1.default.join(__dirname, '..', '..', relativePath);
    try {
        if (!fs_1.default.existsSync(filePath)) {
            return defaultValue;
        }
        const content = fs_1.default.readFileSync(filePath, 'utf8');
        if (!content.trim()) {
            return defaultValue;
        }
        return JSON.parse(content);
    }
    catch {
        return defaultValue;
    }
}
function saveJsonFile(relativePath, data) {
    const filePath = path_1.default.join(__dirname, '..', '..', relativePath);
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
