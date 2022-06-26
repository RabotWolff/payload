"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restoreVersion_1 = __importDefault(require("../restoreVersion"));
async function restoreVersionLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, data, id, user, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    const args = {
        payload,
        depth,
        data,
        collection,
        overrideAccess,
        id,
        showHiddenFields,
        req: {
            user,
            payloadAPI: 'local',
            locale,
            fallbackLocale,
            payload,
        },
    };
    return (0, restoreVersion_1.default)(args);
}
exports.default = restoreVersionLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9sb2NhbC9yZXN0b3JlVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLHVFQUErQztBQWNoQyxLQUFLLFVBQVUsbUJBQW1CLENBQXFDLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3RILE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsSUFBSSxFQUNKLEVBQUUsRUFDRixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxNQUFNLElBQUksR0FBRztRQUNYLE9BQU87UUFDUCxLQUFLO1FBQ0wsSUFBSTtRQUNKLFVBQVU7UUFDVixjQUFjO1FBQ2QsRUFBRTtRQUNGLGdCQUFnQjtRQUNoQixHQUFHLEVBQUU7WUFDSCxJQUFJO1lBQ0osVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTTtZQUNOLGNBQWM7WUFDZCxPQUFPO1NBQ1U7S0FDcEIsQ0FBQztJQUVGLE9BQU8sSUFBQSx3QkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFqQ0Qsc0NBaUNDIn0=