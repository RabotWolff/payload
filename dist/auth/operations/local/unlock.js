"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unlock_1 = __importDefault(require("../unlock"));
async function localUnlock(payload, options) {
    const { collection: collectionSlug, data, overrideAccess = true, req, } = options;
    const collection = payload.collections[collectionSlug];
    return (0, unlock_1.default)({
        data,
        collection,
        overrideAccess,
        req: {
            ...req,
            payload,
            payloadAPI: 'local',
        },
    });
}
exports.default = localUnlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2F1dGgvb3BlcmF0aW9ucy9sb2NhbC91bmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx1REFBK0I7QUFXL0IsS0FBSyxVQUFVLFdBQVcsQ0FBQyxPQUFnQixFQUFFLE9BQWdCO0lBQzNELE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsR0FBRyxHQUNKLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUEsZ0JBQU0sRUFBQztRQUNaLElBQUk7UUFDSixVQUFVO1FBQ1YsY0FBYztRQUNkLEdBQUcsRUFBRTtZQUNILEdBQUcsR0FBRztZQUNOLE9BQU87WUFDUCxVQUFVLEVBQUUsT0FBTztTQUNGO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBZSxXQUFXLENBQUMifQ==