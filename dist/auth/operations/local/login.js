"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../login"));
async function localLogin(payload, options) {
    const { collection: collectionSlug, req = {}, res, depth, locale, fallbackLocale, data, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    const args = {
        depth,
        collection,
        overrideAccess,
        showHiddenFields,
        data,
        req: {
            ...req,
            payloadAPI: 'local',
            payload,
            locale: undefined,
            fallbackLocale: undefined,
        },
        res,
    };
    if (locale)
        args.req.locale = locale;
    if (fallbackLocale)
        args.req.fallbackLocale = fallbackLocale;
    return (0, login_1.default)(args);
}
exports.default = localLogin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2xvY2FsL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EscURBQXlDO0FBb0J6QyxLQUFLLFVBQVUsVUFBVSxDQUE2QixPQUFnQixFQUFFLE9BQWdCO0lBQ3RGLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixHQUFHLEdBQUcsRUFBRSxFQUNSLEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLGNBQWMsRUFDZCxJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxNQUFNLElBQUksR0FBRztRQUNYLEtBQUs7UUFDTCxVQUFVO1FBQ1YsY0FBYztRQUNkLGdCQUFnQjtRQUNoQixJQUFJO1FBQ0osR0FBRyxFQUFFO1lBQ0gsR0FBRyxHQUFHO1lBQ04sVUFBVSxFQUFFLE9BQU87WUFDbkIsT0FBTztZQUNQLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLGNBQWMsRUFBRSxTQUFTO1NBQ1I7UUFDbkIsR0FBRztLQUNKLENBQUM7SUFFRixJQUFJLE1BQU07UUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDckMsSUFBSSxjQUFjO1FBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBRTdELE9BQU8sSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9