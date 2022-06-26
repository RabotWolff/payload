"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = __importDefault(require("../find"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, sort, draft = false, pagination = true, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, find_1.default)({
        depth,
        sort,
        page,
        limit,
        where,
        collection,
        overrideAccess,
        showHiddenFields,
        draft,
        pagination,
        req: {
            user,
            payloadAPI: 'local',
            locale,
            fallbackLocale,
            payload,
        },
    });
}
exports.default = findLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9vcGVyYXRpb25zL2xvY2FsL2ZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxtREFBMkI7QUFrQjNCLDhEQUE4RDtBQUMvQyxLQUFLLFVBQVUsU0FBUyxDQUE2QixPQUFnQixFQUFFLE9BQWdCOztJQUNwRyxNQUFNLEVBQ0osVUFBVSxFQUFFLGNBQWMsRUFDMUIsS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixnQkFBZ0IsRUFDaEIsSUFBSSxFQUNKLEtBQUssR0FBRyxLQUFLLEVBQ2IsVUFBVSxHQUFHLElBQUksR0FDbEIsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE9BQU8sSUFBQSxjQUFJLEVBQUM7UUFDVixLQUFLO1FBQ0wsSUFBSTtRQUNKLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLFVBQVU7UUFDVixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDTCxVQUFVO1FBQ1YsR0FBRyxFQUFFO1lBQ0gsSUFBSTtZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU07WUFDTixjQUFjO1lBQ2QsT0FBTztTQUNVO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0Q0QsNEJBc0NDIn0=