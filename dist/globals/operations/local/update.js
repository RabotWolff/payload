"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = __importDefault(require("../update"));
async function updateLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, data, user, overrideAccess = true, showHiddenFields, draft, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
    return (0, update_1.default)({
        slug: globalSlug,
        data,
        depth,
        globalConfig,
        overrideAccess,
        showHiddenFields,
        draft,
        req: {
            user,
            payloadAPI: 'local',
            locale,
            fallbackLocale,
            payload,
        },
    });
}
exports.default = updateLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC91cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx1REFBK0I7QUFjaEIsS0FBSyxVQUFVLFdBQVcsQ0FBNkIsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDdEcsTUFBTSxFQUNKLElBQUksRUFBRSxVQUFVLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixJQUFJLEVBQ0osSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixFQUNoQixLQUFLLEdBQ04sR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUM7SUFFekYsT0FBTyxJQUFBLGdCQUFNLEVBQUM7UUFDWixJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJO1FBQ0osS0FBSztRQUNMLFlBQVk7UUFDWixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDTCxHQUFHLEVBQUU7WUFDSCxJQUFJO1lBQ0osVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTTtZQUNOLGNBQWM7WUFDZCxPQUFPO1NBQ1U7S0FDcEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9CRCw4QkErQkMifQ==