"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const refresh_1 = __importDefault(require("../../operations/refresh"));
const getExtractJWT_1 = __importDefault(require("../../getExtractJWT"));
function refreshResolver(collection) {
    async function resolver(_, args, context) {
        let token;
        const extractJWT = (0, getExtractJWT_1.default)(context.req.config);
        token = extractJWT(context.req);
        if (args.token) {
            token = args.token;
        }
        const options = {
            collection,
            token,
            req: context.req,
            res: context.res,
        };
        const result = await (0, refresh_1.default)(options);
        return result;
    }
    return resolver;
}
exports.default = refreshResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoL2dyYXBocWwvcmVzb2x2ZXJzL3JlZnJlc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx1RUFBK0M7QUFDL0Msd0VBQWdEO0FBRWhELFNBQVMsZUFBZSxDQUFDLFVBQXNCO0lBQzdDLEtBQUssVUFBVSxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPO1FBQ3RDLElBQUksS0FBSyxDQUFDO1FBRVYsTUFBTSxVQUFVLEdBQUcsSUFBQSx1QkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDcEI7UUFFRCxNQUFNLE9BQU8sR0FBRztZQUNkLFVBQVU7WUFDVixLQUFLO1lBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztTQUNqQixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGlCQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxrQkFBZSxlQUFlLENBQUMifQ==