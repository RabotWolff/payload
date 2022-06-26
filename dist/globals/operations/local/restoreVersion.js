"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restoreVersion_1 = __importDefault(require("../restoreVersion"));
async function restoreVersionLocal(payload, options) {
    const { slug: globalSlug, depth, id, user, overrideAccess = true, showHiddenFields, } = options;
    const globalConfig = payload.globals[globalSlug];
    return (0, restoreVersion_1.default)({
        depth,
        globalConfig,
        overrideAccess,
        id,
        showHiddenFields,
        req: {
            user,
            payloadAPI: 'local',
            payload,
        },
    });
}
exports.default = restoreVersionLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFscy9vcGVyYXRpb25zL2xvY2FsL3Jlc3RvcmVWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsdUVBQStDO0FBV2hDLEtBQUssVUFBVSxtQkFBbUIsQ0FBcUMsT0FBZ0IsRUFBRSxPQUFnQjtJQUN0SCxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLEVBQUUsRUFDRixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVqRCxPQUFPLElBQUEsd0JBQWMsRUFBQztRQUNwQixLQUFLO1FBQ0wsWUFBWTtRQUNaLGNBQWM7UUFDZCxFQUFFO1FBQ0YsZ0JBQWdCO1FBQ2hCLEdBQUcsRUFBRTtZQUNILElBQUk7WUFDSixVQUFVLEVBQUUsT0FBTztZQUNuQixPQUFPO1NBQ1U7S0FDcEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXhCRCxzQ0F3QkMifQ==