"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findOne_1 = __importDefault(require("../findOne"));
async function findOneLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, draft = false, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
    return (0, findOne_1.default)({
        slug: globalSlug,
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
exports.default = findOneLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZE9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWxzL29wZXJhdGlvbnMvbG9jYWwvZmluZE9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLHlEQUFpQztBQWFsQixLQUFLLFVBQVUsWUFBWSxDQUE2QixPQUFnQixFQUFFLE9BQWdCOztJQUN2RyxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixnQkFBZ0IsRUFDaEIsS0FBSyxHQUFHLEtBQUssR0FDZCxHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztJQUV6RixPQUFPLElBQUEsaUJBQU8sRUFBQztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUs7UUFDTCxZQUFZO1FBQ1osY0FBYztRQUNkLGdCQUFnQjtRQUNoQixLQUFLO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsSUFBSTtZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU07WUFDTixjQUFjO1lBQ2QsT0FBTztTQUNVO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3QkQsK0JBNkJDIn0=