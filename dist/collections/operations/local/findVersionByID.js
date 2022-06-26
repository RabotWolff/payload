"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersionByID_1 = __importDefault(require("../findVersionByID"));
async function findVersionByIDLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, overrideAccess = true, disableErrors = false, showHiddenFields, req, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, findVersionByID_1.default)({
        depth,
        id,
        collection,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        req: {
            ...req || {},
            payloadAPI: 'local',
            locale: locale || (req === null || req === void 0 ? void 0 : req.locale) || ((_c = (_b = this === null || this === void 0 ? void 0 : this.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale),
            fallbackLocale: fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null,
            payload,
        },
    });
}
exports.default = findVersionByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZmluZFZlcnNpb25CeUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEseUVBQWlEO0FBZWxDLEtBQUssVUFBVSxvQkFBb0IsQ0FBcUMsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDdkgsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEtBQUssRUFDTCxFQUFFLEVBQ0YsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsY0FBYyxHQUFHLElBQUksRUFDckIsYUFBYSxHQUFHLEtBQUssRUFDckIsZ0JBQWdCLEVBQ2hCLEdBQUcsR0FDSixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsT0FBTyxJQUFBLHlCQUFlLEVBQUM7UUFDckIsS0FBSztRQUNMLEVBQUU7UUFDRixVQUFVO1FBQ1YsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsR0FBRyxFQUFFO1lBQ0gsR0FBRyxHQUFHLElBQUksRUFBRTtZQUNaLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU0sRUFBRSxNQUFNLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FBQSxLQUFJLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSwwQ0FBRSxZQUFZLDBDQUFFLGFBQWEsQ0FBQTtZQUMxRSxjQUFjLEVBQUUsY0FBYyxLQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxjQUFjLENBQUEsSUFBSSxJQUFJO1lBQzdELE9BQU87U0FDVTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUJELHVDQThCQyJ9