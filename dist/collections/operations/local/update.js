"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileByPath_1 = __importDefault(require("../../../uploads/getFileByPath"));
const update_1 = __importDefault(require("../update"));
async function updateLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, data, id, user, overrideAccess = true, showHiddenFields, filePath, overwriteExistingFiles = false, draft, autosave, } = options;
    const collection = payload.collections[collectionSlug];
    const args = {
        depth,
        data,
        collection,
        overrideAccess,
        id,
        showHiddenFields,
        overwriteExistingFiles,
        draft,
        autosave,
        payload,
        req: {
            user,
            payloadAPI: 'local',
            locale,
            fallbackLocale,
            payload,
            files: {
                file: (0, getFileByPath_1.default)(filePath),
            },
        },
    };
    return (0, update_1.default)(args);
}
exports.default = updateLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvdXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsbUZBQTJEO0FBQzNELHVEQUErQjtBQW1CaEIsS0FBSyxVQUFVLFdBQVcsQ0FBVSxPQUFnQixFQUFFLE9BQW1COztJQUN0RixNQUFNLEVBQ0osVUFBVSxFQUFFLGNBQWMsRUFDMUIsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixFQUFFLEVBQ0YsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixFQUNoQixRQUFRLEVBQ1Isc0JBQXNCLEdBQUcsS0FBSyxFQUM5QixLQUFLLEVBQ0wsUUFBUSxHQUNULEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxNQUFNLElBQUksR0FBRztRQUNYLEtBQUs7UUFDTCxJQUFJO1FBQ0osVUFBVTtRQUNWLGNBQWM7UUFDZCxFQUFFO1FBQ0YsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixLQUFLO1FBQ0wsUUFBUTtRQUNSLE9BQU87UUFDUCxHQUFHLEVBQUU7WUFDSCxJQUFJO1lBQ0osVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTTtZQUNOLGNBQWM7WUFDZCxPQUFPO1lBQ1AsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxJQUFBLHVCQUFhLEVBQUMsUUFBUSxDQUFDO2FBQzlCO1NBQ2dCO0tBQ3BCLENBQUM7SUFFRixPQUFPLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBM0NELDhCQTJDQyJ9