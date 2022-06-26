"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findByID_1 = __importDefault(require("../findByID"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findByIDLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, currentDepth, id, locale, fallbackLocale, user, overrideAccess = true, disableErrors = false, showHiddenFields, req, draft = false, } = options;
    const collection = payload.collections[collectionSlug];
    const reqToUse = {
        user: undefined,
        ...req || {},
        payloadAPI: 'local',
        locale: locale || (req === null || req === void 0 ? void 0 : req.locale) || (((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.localization) ? (_c = (_b = payload === null || payload === void 0 ? void 0 : payload.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale : null),
        fallbackLocale: fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null,
        payload,
    };
    if (typeof user !== 'undefined')
        reqToUse.user = user;
    return (0, findByID_1.default)({
        depth,
        currentDepth,
        id,
        collection,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        req: reqToUse,
        draft,
    });
}
exports.default = findByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEJ5SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9sb2NhbC9maW5kQnlJRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDJEQUFtQztBQWtCbkMsOERBQThEO0FBQy9DLEtBQUssVUFBVSxhQUFhLENBQTZCLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3hHLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsWUFBWSxFQUNaLEVBQUUsRUFDRixNQUFNLEVBQ04sY0FBYyxFQUNkLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixhQUFhLEdBQUcsS0FBSyxFQUNyQixnQkFBZ0IsRUFDaEIsR0FBRyxFQUNILEtBQUssR0FBRyxLQUFLLEdBQ2QsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLFNBQVM7UUFDZixHQUFHLEdBQUcsSUFBSSxFQUFFO1FBQ1osVUFBVSxFQUFFLE9BQU87UUFDbkIsTUFBTSxFQUFFLE1BQU0sS0FBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsTUFBTSxDQUFBLElBQUksQ0FBQyxDQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sMENBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQyxNQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sMENBQUUsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0SCxjQUFjLEVBQUUsY0FBYyxLQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxjQUFjLENBQUEsSUFBSSxJQUFJO1FBQzdELE9BQU87S0FDUixDQUFDO0lBRUYsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXO1FBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFdEQsT0FBTyxJQUFBLGtCQUFRLEVBQUM7UUFDZCxLQUFLO1FBQ0wsWUFBWTtRQUNaLEVBQUU7UUFDRixVQUFVO1FBQ1YsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsR0FBRyxFQUFFLFFBQTBCO1FBQy9CLEtBQUs7S0FDTixDQUFDLENBQUM7QUFDTCxDQUFDO0FBeENELGdDQXdDQyJ9