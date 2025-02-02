"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const getCookieExpiration_1 = __importDefault(require("../../utilities/getCookieExpiration"));
const isLocked_1 = __importDefault(require("../isLocked"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const types_1 = require("../../fields/config/types");
const afterRead_1 = require("../../fields/hooks/afterRead");
const unlock_1 = __importDefault(require("./unlock"));
async function login(incomingArgs) {
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'login',
        })) || args;
    }, Promise.resolve());
    const { collection: { Model, config: collectionConfig, }, data, req: { payload: { secret, config, }, }, req, depth, overrideAccess, showHiddenFields, } = args;
    // /////////////////////////////////////
    // Login
    // /////////////////////////////////////
    const { email: unsanitizedEmail, password } = data;
    const email = unsanitizedEmail ? unsanitizedEmail.toLowerCase() : null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Improper typing in library, additional args should be optional
    const userDoc = await Model.findByUsername(email);
    if (!userDoc || (args.collection.config.auth.verify && userDoc._verified === false)) {
        throw new errors_1.AuthenticationError();
    }
    if (userDoc && (0, isLocked_1.default)(userDoc.lockUntil)) {
        throw new errors_1.LockedAuth();
    }
    const authResult = await userDoc.authenticate(password);
    const maxLoginAttemptsEnabled = args.collection.config.auth.maxLoginAttempts > 0;
    if (!authResult.user) {
        if (maxLoginAttemptsEnabled)
            await userDoc.incLoginAttempts();
        throw new errors_1.AuthenticationError();
    }
    if (maxLoginAttemptsEnabled) {
        await (0, unlock_1.default)({
            collection: {
                Model,
                config: collectionConfig,
            },
            req,
            data,
            overrideAccess: true,
        });
    }
    let user = userDoc.toJSON({ virtuals: true });
    user = JSON.parse(JSON.stringify(user));
    user = (0, sanitizeInternalFields_1.default)(user);
    const fieldsToSign = collectionConfig.fields.reduce((signedFields, field) => {
        const result = {
            ...signedFields,
        };
        if (!(0, types_1.fieldAffectsData)(field) && (0, types_1.fieldHasSubFields)(field)) {
            field.fields.forEach((subField) => {
                if ((0, types_1.fieldAffectsData)(subField) && subField.saveToJWT) {
                    result[subField.name] = user[subField.name];
                }
            });
        }
        if ((0, types_1.fieldAffectsData)(field) && field.saveToJWT) {
            result[field.name] = user[field.name];
        }
        return result;
    }, {
        email,
        id: user.id,
        collection: collectionConfig.slug,
    });
    const token = jsonwebtoken_1.default.sign(fieldsToSign, secret, {
        expiresIn: collectionConfig.auth.tokenExpiration,
    });
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
        args.res.cookie(`${config.cookiePrefix}-token`, token, cookieOptions);
    }
    req.user = user;
    // /////////////////////////////////////
    // afterLogin - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterLogin.reduce(async (priorHook, hook) => {
        await priorHook;
        user = await hook({
            doc: user,
            req: args.req,
            token,
        }) || user;
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    user = await (0, afterRead_1.afterRead)({
        depth,
        doc: user,
        entityConfig: collectionConfig,
        overrideAccess,
        req,
        showHiddenFields,
    });
    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
        await priorHook;
        user = await hook({
            req,
            doc: user,
        }) || user;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return {
        token,
        user,
        exp: jsonwebtoken_1.default.decode(token).exp,
    };
}
exports.default = login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQStCO0FBRS9CLHlDQUErRDtBQUUvRCw4RkFBc0U7QUFDdEUsMkRBQW1DO0FBQ25DLG9HQUE0RTtBQUM1RSxxREFBdUY7QUFHdkYsNERBQXlEO0FBQ3pELHNEQUE4QjtBQXFCOUIsS0FBSyxVQUFVLEtBQUssQ0FBSSxZQUF1QjtJQUM3QyxJQUFJLElBQUksR0FBRyxZQUFZLENBQUM7SUFFeEIsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUMvQix3Q0FBd0M7SUFFeEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xGLE1BQU0sU0FBUyxDQUFDO1FBRWhCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ2pCLElBQUk7WUFDSixTQUFTLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDZCxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFdEIsTUFBTSxFQUNKLFVBQVUsRUFBRSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsSUFBSSxFQUNKLEdBQUcsRUFBRSxFQUNILE9BQU8sRUFBRSxFQUNQLE1BQU0sRUFDTixNQUFNLEdBQ1AsR0FDRixFQUNELEdBQUcsRUFDSCxLQUFLLEVBQ0wsY0FBYyxFQUNkLGdCQUFnQixHQUNqQixHQUFHLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxRQUFRO0lBQ1Isd0NBQXdDO0lBRXhDLE1BQU0sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lB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