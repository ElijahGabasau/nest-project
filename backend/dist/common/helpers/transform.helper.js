"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformHelper = void 0;
class TransformHelper {
    static trim({ value }) {
        return value ? value.toString().trim() : value;
    }
    static toLowerCase({ value }) {
        return value ? value.toString().toLowerCase() : value;
    }
}
exports.TransformHelper = TransformHelper;
//# sourceMappingURL=transform.helper.js.map