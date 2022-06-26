"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = __importDefault(require("../delete"));
async function deleteLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, delete_1.default)({
        depth,
        id,
        collection,
        overrideAccess,
        showHiddenFields,
        req: {
            user,
            payloadAPI: 'local',
            locale,
            fallbackLocale,
            payload,
        },
    });
}
exports.default = deleteLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsdURBQXdDO0FBYXpCLEtBQUssVUFBVSxXQUFXLENBQTZCLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3RHLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsRUFBRSxFQUNGLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixnQkFBZ0IsR0FDakIsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE9BQU8sSUFBQSxnQkFBZSxFQUFDO1FBQ3JCLEtBQUs7UUFDTCxFQUFFO1FBQ0YsVUFBVTtRQUNWLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsR0FBRyxFQUFFO1lBQ0gsSUFBSTtZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU07WUFDTixjQUFjO1lBQ2QsT0FBTztTQUNVO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1QkQsOEJBNEJDIn0=