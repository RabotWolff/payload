"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileByPath_1 = __importDefault(require("../../../uploads/getFileByPath"));
const create_1 = __importDefault(require("../create"));
async function createLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, locale, fallbackLocale, data, user, overrideAccess = true, disableVerificationEmail, showHiddenFields, filePath, overwriteExistingFiles = false, req, draft, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, create_1.default)({
        depth,
        data,
        collection,
        overrideAccess,
        disableVerificationEmail,
        showHiddenFields,
        overwriteExistingFiles,
        draft,
        req: {
            ...req || {},
            user,
            payloadAPI: 'local',
            locale: locale || (req === null || req === void 0 ? void 0 : req.locale) || (((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.localization) ? (_c = (_b = payload === null || payload === void 0 ? void 0 : payload.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale : null),
            fallbackLocale: fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null,
            payload,
            files: {
                file: (0, getFileByPath_1.default)(filePath),
            },
        },
    });
}
exports.default = createLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsbUZBQTJEO0FBQzNELHVEQUErQjtBQWtCaEIsS0FBSyxVQUFVLFdBQVcsQ0FBVSxPQUFnQixFQUFFLE9BQW1COztJQUN0RixNQUFNLEVBQ0osVUFBVSxFQUFFLGNBQWMsRUFDMUIsS0FBSyxFQUNMLE1BQU0sRUFDTixjQUFjLEVBQ2QsSUFBSSxFQUNKLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQix3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixzQkFBc0IsR0FBRyxLQUFLLEVBQzlCLEdBQUcsRUFDSCxLQUFLLEdBQ04sR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE9BQU8sSUFBQSxnQkFBTSxFQUFDO1FBQ1osS0FBSztRQUNMLElBQUk7UUFDSixVQUFVO1FBQ1YsY0FBYztRQUNkLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLEtBQUs7UUFDTCxHQUFHLEVBQUU7WUFDSCxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ1osSUFBSTtZQUNKLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU0sRUFBRSxNQUFNLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FBQSxJQUFJLENBQUMsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksRUFBQyxDQUFDLENBQUMsTUFBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdEgsY0FBYyxFQUFFLGNBQWMsS0FBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsY0FBYyxDQUFBLElBQUksSUFBSTtZQUM3RCxPQUFPO1lBQ1AsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxJQUFBLHVCQUFhLEVBQUMsUUFBUSxDQUFpQjthQUM5QztTQUNnQjtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBeENELDhCQXdDQyJ9