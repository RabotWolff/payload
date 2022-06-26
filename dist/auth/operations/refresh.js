"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const getCookieExpiration_1 = __importDefault(require("../../utilities/getCookieExpiration"));
async function refresh(incomingArgs) {
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'refresh',
        })) || args;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Refresh
    // /////////////////////////////////////
    const { collection: { config: collectionConfig, }, req: { payload: { secret, config, }, }, } = args;
    const opts = {
        expiresIn: args.collection.config.auth.tokenExpiration,
    };
    if (typeof args.token !== 'string')
        throw new errors_1.Forbidden();
    const payload = jsonwebtoken_1.default.verify(args.token, secret, {});
    delete payload.iat;
    delete payload.exp;
    const refreshedToken = jsonwebtoken_1.default.sign(payload, secret, opts);
    if (args.res) {
        const cookieOptions = {
            path: '/',
            httpOnly: true,
            expires: (0, getCookieExpiration_1.default)(collectionConfig.auth.tokenExpiration),
            secure: collectionConfig.auth.cookies.secure,
            sameSite: collectionConfig.auth.cookies.sameSite,
            domain: undefined,
        };
        if (collectionConfig.auth.cookies.domain)
            cookieOptions.domain = collectionConfig.auth.cookies.domain;
        args.res.cookie(`${config.cookiePrefix}-token`, refreshedToken, cookieOptions);
    }
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return {
        refreshedToken,
        exp: jsonwebtoken_1.default.decode(refreshedToken).exp,
        user: payload,
    };
}
exports.default = refresh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL29wZXJhdGlvbnMvcmVmcmVzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdFQUErQjtBQUcvQix5Q0FBeUM7QUFDekMsOEZBQXNFO0FBaUJ0RSxLQUFLLFVBQVUsT0FBTyxDQUFDLFlBQXVCO0lBQzVDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQztJQUV4Qix3Q0FBd0M7SUFDeEMsK0JBQStCO0lBQy9CLHdDQUF3QztJQUV4QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUE4QyxFQUFFLElBQXlCLEVBQUUsRUFBRTtRQUM1SSxNQUFNLFNBQVMsQ0FBQztRQUVoQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixJQUFJO1lBQ0osU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLHdDQUF3QztJQUN4QyxVQUFVO0lBQ1Ysd0NBQXdDO0lBRXhDLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFDVixNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsR0FBRyxFQUFFLEVBQ0gsT0FBTyxFQUFFLEVBQ1AsTUFBTSxFQUNOLE1BQU0sR0FDUCxHQUNGLEdBQ0YsR0FBRyxJQUFJLENBQUM7SUFFVCxNQUFNLElBQUksR0FBRztRQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZTtLQUN2RCxDQUFDO0lBRUYsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUFFLE1BQU0sSUFBSSxrQkFBUyxFQUFFLENBQUM7SUFFMUQsTUFBTSxPQUFPLEdBQUcsc0JBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUE0QixDQUFDO0lBQzlFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNuQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDbkIsTUFBTSxjQUFjLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV2RCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDWixNQUFNLGFBQWEsR0FBRztZQUNwQixJQUFJLEVBQUUsR0FBRztZQUNULFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUEsNkJBQW1CLEVBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNuRSxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzVDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDaEQsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUVGLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQUUsYUFBYSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV0RyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLFFBQVEsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDaEY7SUFFRCx3Q0FBd0M7SUFDeEMsaUJBQWlCO0lBQ2pCLHdDQUF3QztJQUV4QyxPQUFPO1FBQ0wsY0FBYztRQUNkLEdBQUcsRUFBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQTZCLENBQUMsR0FBYTtRQUMxRSxJQUFJLEVBQUUsT0FBTztLQUNkLENBQUM7QUFDSixDQUFDO0FBRUQsa0JBQWUsT0FBTyxDQUFDIn0=