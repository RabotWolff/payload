"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetPassword_1 = __importDefault(require("../resetPassword"));
async function localResetPassword(payload, options) {
    const { collection: collectionSlug, data, overrideAccess, req, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, resetPassword_1.default)({
        collection,
        data,
        overrideAccess,
        req: {
            ...req,
            payload,
            payloadAPI: 'local',
        },
    });
}
exports.default = localResetPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRQYXNzd29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoL29wZXJhdGlvbnMvbG9jYWwvcmVzZXRQYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFFQUF5RDtBQWF6RCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsT0FBZ0IsRUFBRSxPQUFnQjtJQUNsRSxNQUFNLEVBQ0osVUFBVSxFQUFFLGNBQWMsRUFDMUIsSUFBSSxFQUNKLGNBQWMsRUFDZCxHQUFHLEdBQ0osR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE9BQU8sSUFBQSx1QkFBYSxFQUFDO1FBQ25CLFVBQVU7UUFDVixJQUFJO1FBQ0osY0FBYztRQUNkLEdBQUcsRUFBRTtZQUNILEdBQUcsR0FBRztZQUNOLE9BQU87WUFDUCxVQUFVLEVBQUUsT0FBTztTQUNGO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9