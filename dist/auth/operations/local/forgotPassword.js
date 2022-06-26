"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPassword_1 = __importDefault(require("../forgotPassword"));
async function localForgotPassword(payload, options) {
    const { collection: collectionSlug, data, expiration, disableEmail, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, forgotPassword_1.default)({
        data,
        collection,
        disableEmail,
        expiration,
        req: {
            ...req,
            payloadAPI: 'local',
        },
    });
}
exports.default = localForgotPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290UGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2xvY2FsL2ZvcmdvdFBhc3N3b3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsdUVBQTJEO0FBYTNELEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxPQUFnQixFQUFFLE9BQWdCO0lBQ25FLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixJQUFJLEVBQ0osVUFBVSxFQUNWLFlBQVksRUFDWixHQUFHLEdBQUcsRUFBRSxHQUNULEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUEsd0JBQWMsRUFBQztRQUNwQixJQUFJO1FBQ0osVUFBVTtRQUNWLFlBQVk7UUFDWixVQUFVO1FBQ1YsR0FBRyxFQUFFO1lBQ0gsR0FBRyxHQUFHO1lBQ04sVUFBVSxFQUFFLE9BQU87U0FDRjtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsa0JBQWUsbUJBQW1CLENBQUMifQ==