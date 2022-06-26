"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const types_1 = require("../../auth/types");
const flattenWhereConstraints_1 = __importDefault(require("../../utilities/flattenWhereConstraints"));
const buildSortParam_1 = require("../../mongoose/buildSortParam");
const replaceWithDraftIfAvailable_1 = __importDefault(require("../../versions/drafts/replaceWithDraftIfAvailable"));
const afterRead_1 = require("../../fields/hooks/afterRead");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function find(incomingArgs) {
    var _a;
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'read',
        })) || args;
    }, Promise.resolve());
    const { where, page, limit, depth, draft: draftsEnabled, collection: { Model, config: collectionConfig, }, req, req: { locale, payload, }, overrideAccess, showHiddenFields, pagination = true, } = args;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const queryToBuild = {
        where: {
            and: [],
        },
    };
    let useEstimatedCount = false;
    if (where) {
        queryToBuild.where = {
            and: [],
            ...where,
        };
        if (Array.isArray(where.AND)) {
            queryToBuild.where.and = [
                ...queryToBuild.where.and,
                ...where.AND,
            ];
        }
        const constraints = (0, flattenWhereConstraints_1.default)(queryToBuild);
        useEstimatedCount = constraints.some((prop) => Object.keys(prop).some((key) => key === 'near'));
    }
    let accessResult;
    if (!overrideAccess) {
        accessResult = await (0, executeAccess_1.default)({ req }, collectionConfig.access.read);
        if ((0, types_1.hasWhereAccessResult)(accessResult)) {
            queryToBuild.where.and.push(accessResult);
        }
    }
    const query = await Model.buildQuery(queryToBuild, locale);
    // /////////////////////////////////////
    // Find
    // /////////////////////////////////////
    const [sortProperty, sortOrder] = (0, buildSortParam_1.buildSortParam)(args.sort, collectionConfig.timestamps);
    const optionsToExecute = {
        page: page || 1,
        limit: limit || 10,
        sort: {
            [sortProperty]: sortOrder,
        },
        lean: true,
        leanWithId: true,
        useEstimatedCount,
        pagination,
        useCustomCountFn: pagination ? undefined : () => Promise.resolve(1),
    };
    const paginatedDocs = await Model.paginate(query, optionsToExecute);
    let result = {
        ...paginatedDocs,
    };
    // /////////////////////////////////////
    // Replace documents with drafts if available
    // /////////////////////////////////////
    if (((_a = collectionConfig.versions) === null || _a === void 0 ? void 0 : _a.drafts) && draftsEnabled) {
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc) => (0, replaceWithDraftIfAvailable_1.default)({
                accessResult,
                payload,
                entity: collectionConfig,
                doc,
                locale,
            }))),
        };
    }
    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            const docString = JSON.stringify(doc);
            let docRef = JSON.parse(docString);
            await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef = await hook({ req, query, doc: docRef }) || docRef;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => (0, afterRead_1.afterRead)({
            depth,
            doc,
            entityConfig: collectionConfig,
            overrideAccess,
            req,
            showHiddenFields,
            findMany: true,
        }))),
    };
    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            let docRef = doc;
            await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef = await hook({ req, query, doc, findMany: true }) || doc;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    result = {
        ...result,
        docs: result.docs.map((doc) => (0, sanitizeInternalFields_1.default)(doc)),
    };
    return result;
}
exports.default = find;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9vcGVyYXRpb25zL2ZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSw2RUFBcUQ7QUFDckQsb0dBQTRFO0FBRzVFLDRDQUF3RDtBQUN4RCxzR0FBOEU7QUFDOUUsa0VBQStEO0FBQy9ELG9IQUE0RjtBQUU1Riw0REFBeUQ7QUFnQnpELDhEQUE4RDtBQUM5RCxLQUFLLFVBQVUsSUFBSSxDQUE2QixZQUF1Qjs7SUFDckUsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDO0lBRXhCLHdDQUF3QztJQUN4QywrQkFBK0I7SUFDL0Isd0NBQXdDO0lBRXhDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNsRixNQUFNLFNBQVMsQ0FBQztRQUVoQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixJQUFJO1lBQ0osU0FBUyxFQUFFLE1BQU07U0FDbEIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUFFLGFBQWEsRUFDcEIsVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxnQkFBZ0IsR0FDekIsRUFDRCxHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsTUFBTSxFQUNOLE9BQU8sR0FDUixFQUNELGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsVUFBVSxHQUFHLElBQUksR0FDbEIsR0FBRyxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMsU0FBUztJQUNULHdDQUF3QztJQUV4QyxNQUFNLFlBQVks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