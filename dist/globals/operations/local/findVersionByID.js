"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersionByID_1 = __importDefault(require("../findVersionByID"));
async function findVersionByIDLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, disableErrors = false, showHiddenFields, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
    return (0, findVersionByID_1.default)({
        depth,
        id,
        globalConfig,
        overrideAccess,
        disableErrors,
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
exports.default = findVersionByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC9maW5kVmVyc2lvbkJ5SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx5RUFBaUQ7QUFjbEMsS0FBSyxVQUFVLG9CQUFvQixDQUFxQyxPQUFnQixFQUFFLE9BQWdCOztJQUN2SCxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLEVBQUUsRUFDRixNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsYUFBYSxHQUFHLEtBQUssRUFDckIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBRXpGLE9BQU8sSUFBQSx5QkFBZSxFQUFDO1FBQ3JCLEtBQUs7UUFDTCxFQUFFO1FBQ0YsWUFBWTtRQUNaLGNBQWM7UUFDZCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLEdBQUcsRUFBRTtZQUNILElBQUk7WUFDSixVQUFVLEVBQUUsT0FBTztZQUNuQixNQUFNO1lBQ04sY0FBYztZQUNkLE9BQU87U0FDVTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUJELHVDQThCQyJ9