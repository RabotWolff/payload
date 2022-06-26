"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const sendVerificationEmail_1 = __importDefault(require("../../auth/sendVerificationEmail"));
const types_1 = require("../../fields/config/types");
const uploadFile_1 = __importDefault(require("../../uploads/uploadFile"));
const beforeChange_1 = require("../../fields/hooks/beforeChange");
const beforeValidate_1 = require("../../fields/hooks/beforeValidate");
const afterChange_1 = require("../../fields/hooks/afterChange");
const afterRead_1 = require("../../fields/hooks/afterRead");
async function create(incomingArgs) {
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'create',
        })) || args;
    }, Promise.resolve());
    const { collection, collection: { Model, config: collectionConfig, }, req, req: { payload, payload: { config, emailOptions, }, }, disableVerificationEmail, depth, overrideAccess, showHiddenFields, overwriteExistingFiles = false, draft = false, } = args;
    let { data } = args;
    const shouldSaveDraft = Boolean(draft && collectionConfig.versions.drafts);
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    if (!overrideAccess) {
        await (0, executeAccess_1.default)({ req, data }, collectionConfig.access.create);
    }
    // /////////////////////////////////////
    // Custom id
    // /////////////////////////////////////
    const hasIdField = collectionConfig.fields.findIndex((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id') > -1;
    if (hasIdField) {
        data = {
            _id: data.id,
            ...data,
        };
    }
    // /////////////////////////////////////
    // Upload and resize potential files
    // /////////////////////////////////////
    data = await (0, uploadFile_1.default)({
        config,
        collection,
        req,
        data,
        throwOnMissingFile: !shouldSaveDraft,
        overwriteExistingFiles,
    });
    // /////////////////////////////////////
    // beforeValidate - Fields
    // /////////////////////////////////////
    data = await (0, beforeValidate_1.beforeValidate)({
        data,
        doc: {},
        entityConfig: collectionConfig,
        operation: 'create',
        overrideAccess,
        req,
    });
    // /////////////////////////////////////
    // beforeValidate - Collections
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeValidate.reduce(async (priorHook, hook) => {
        await priorHook;
        data = (await hook({
            data,
            req,
            operation: 'create',
        })) || data;
    }, Promise.resolve());
    // /////////////////////////////////////
    // beforeChange - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook) => {
        await priorHook;
        data = (await hook({
            data,
            req,
            operation: 'create',
        })) || data;
    }, Promise.resolve());
    // /////////////////////////////////////
    // beforeChange - Fields
    // /////////////////////////////////////
    const resultWithLocales = await (0, beforeChange_1.beforeChange)({
        data,
        doc: {},
        docWithLocales: {},
        entityConfig: collectionConfig,
        operation: 'create',
        req,
        skipValidation: shouldSaveDraft,
    });
    // /////////////////////////////////////
    // Create
    // /////////////////////////////////////
    let doc;
    if (collectionConfig.auth) {
        if (data.email) {
            resultWithLocales.email = data.email.toLowerCase();
        }
        if (collectionConfig.auth.verify) {
            resultWithLocales._verified = false;
            resultWithLocales._verificationToken = crypto_1.default.randomBytes(20).toString('hex');
        }
        try {
            doc = await Model.register(resultWithLocales, data.password);
        }
        catch (error) {
            // Handle user already exists from passport-local-mongoose
            if (error.name === 'UserExistsError') {
                throw new errors_1.ValidationError([{ message: error.message, field: 'email' }]);
            }
            throw error;
        }
    }
    else {
        try {
            doc = await Model.create(resultWithLocales);
        }
        catch (error) {
            // Handle uniqueness error from MongoDB
            throw error.code === 11000
                ? new errors_1.ValidationError([{ message: 'Value must be unique', field: Object.keys(error.keyValue)[0] }])
                : error;
        }
    }
    let result = doc.toJSON({ virtuals: true });
    const verificationToken = result._verificationToken;
    // custom id type reset
    result.id = result._id;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // Send verification email if applicable
    // /////////////////////////////////////
    if (collectionConfig.auth && collectionConfig.auth.verify) {
        (0, sendVerificationEmail_1.default)({
            emailOptions,
            config: payload.config,
            sendEmail: payload.sendEmail,
            collection: { config: collectionConfig, Model },
            user: result,
            token: verificationToken,
            req,
            disableEmail: disableVerificationEmail,
        });
    }
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = await (0, afterRead_1.afterRead)({
        depth,
        doc: result,
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
        result = await hook({
            req,
            doc: result,
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterChange - Fields
    // /////////////////////////////////////
    result = await (0, afterChange_1.afterChange)({
        data,
        doc: result,
        entityConfig: collectionConfig,
        operation: 'create',
        req,
    });
    // /////////////////////////////////////
    // afterChange - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({
            doc: result,
            req: args.req,
            operation: 'create',
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return result;
}
exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLDZFQUFxRDtBQUNyRCxvR0FBNEU7QUFFNUUseUNBQStDO0FBRS9DLDZGQUFxRTtBQUlyRSxxREFBNkQ7QUFDN0QsMEVBQWtEO0FBQ2xELGtFQUErRDtBQUMvRCxzRUFBbUU7QUFDbkUsZ0VBQTZEO0FBQzdELDREQUF5RDtBQWN6RCxLQUFLLFVBQVUsTUFBTSxDQUFDLFlBQXVCO0lBQzNDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQztJQUV4Qix3Q0FBd0M7SUFDeEMsK0JBQStCO0lBQy9CLHdDQUF3QztJQUV4QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUE4QyxFQUFFLElBQXlCLEVBQUUsRUFBRTtRQUM1SSxNQUFNLFNBQVMsQ0FBQztRQUVoQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixJQUFJO1lBQ0osU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sRUFDSixVQUFVLEVBQ1YsVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxnQkFBZ0IsR0FDekIsRUFDRCxHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsT0FBTyxFQUNQLE9BQU8sRUFBRSxFQUNQLE1BQU0sRUFDTixZQUFZLEdBQ2IsR0FDRixFQUNELHdCQUF3QixFQUN4QixLQUFLLEVBQ0wsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixzQkFBc0IsR0FBRyxLQUFLLEVBQzlCLEtBQUssR0FBRyxLQUFLLEdBQ2Qs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