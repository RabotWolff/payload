"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersions_1 = __importDefault(require("../findVersions"));
async function findVersionsLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, sort, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
    return (0, findVersions_1.default)({
        where,
        page,
        limit,
        depth,
        globalConfig,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC9maW5kVmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxtRUFBMkM7QUFnQjVCLEtBQUssVUFBVSxpQkFBaUIsQ0FBcUMsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDcEgsTUFBTSxFQUNKLElBQUksRUFBRSxVQUFVLEVBQ2hCLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEVBQ2hCLElBQUksR0FDTCxHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztJQUV6RixPQUFPLElBQUEsc0JBQVksRUFBQztRQUNsQixLQUFLO1FBQ0wsSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsWUFBWTtRQUNaLElBQUk7UUFDSixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEdBQUcsRUFBRTtZQUNILElBQUk7WUFDSixVQUFVLEVBQUUsT0FBTztZQUNuQixNQUFNO1lBQ04sY0FBYztZQUNkLE9BQU87U0FDVTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbENELG9DQWtDQyJ9