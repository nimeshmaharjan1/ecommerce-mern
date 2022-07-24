"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (handleAsyncError) => (req, res, next) => {
    Promise.resolve(handleAsyncError(req, res, next)).catch(next);
};
