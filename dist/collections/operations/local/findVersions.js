"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersions_1 = __importDefault(require("../findVersions"));
async function findVersionsLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, sort, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, findVersions_1.default)({
        where,
        page,
        limit,
        depth,
        collection,
        sort,
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
exports.default = findVersionsLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZmluZFZlcnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsbUVBQTJDO0FBZ0I1QixLQUFLLFVBQVUsaUJBQWlCLENBQXFDLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3BILE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixFQUNoQixJQUFJLEdBQ0wsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE9BQU8sSUFBQSxzQkFBWSxFQUFDO1FBQ2xCLEtBQUs7UUFDTCxJQUFJO1FBQ0osS0FBSztRQUNMLEtBQUs7UUFDTCxVQUFVO1FBQ1YsSUFBSTtRQUNKLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsR0FBRyxFQUFFO1lBQ0gsSUFBSTtZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU07WUFDTixjQUFjO1lBQ2QsT0FBTztTQUNVO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQ0Qsb0NBa0NDIn0=