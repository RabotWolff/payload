"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const graphql_scalars_1 = require("graphql-scalars");
const graphql_1 = require("graphql");
const formatName_1 = __importDefault(require("../../graphql/utilities/formatName"));
const buildPaginatedListType_1 = __importDefault(require("../../graphql/schema/buildPaginatedListType"));
const buildMutationInputType_1 = __importStar(require("../../graphql/schema/buildMutationInputType"));
const buildCollectionFields_1 = require("../../versions/buildCollectionFields");
const create_1 = __importDefault(require("./resolvers/create"));
const update_1 = __importDefault(require("./resolvers/update"));
const find_1 = __importDefault(require("./resolvers/find"));
const findByID_1 = __importDefault(require("./resolvers/findByID"));
const findVersionByID_1 = __importDefault(require("./resolvers/findVersionByID"));
const findVersions_1 = __importDefault(require("./resolvers/findVersions"));
const restoreVersion_1 = __importDefault(require("./resolvers/restoreVersion"));
const me_1 = __importDefault(require("../../auth/graphql/resolvers/me"));
const init_1 = __importDefault(require("../../auth/graphql/resolvers/init"));
const login_1 = __importDefault(require("../../auth/graphql/resolvers/login"));
const logout_1 = __importDefault(require("../../auth/graphql/resolvers/logout"));
const forgotPassword_1 = __importDefault(require("../../auth/graphql/resolvers/forgotPassword"));
const resetPassword_1 = __importDefault(require("../../auth/graphql/resolvers/resetPassword"));
const verifyEmail_1 = __importDefault(require("../../auth/graphql/resolvers/verifyEmail"));
const unlock_1 = __importDefault(require("../../auth/graphql/resolvers/unlock"));
const refresh_1 = __importDefault(require("../../auth/graphql/resolvers/refresh"));
const types_1 = require("../../fields/config/types");
const buildObjectType_1 = __importDefault(require("../../graphql/schema/buildObjectType"));
const buildWhereInputType_1 = __importDefault(require("../../graphql/schema/buildWhereInputType"));
const delete_1 = __importDefault(require("./resolvers/delete"));
function initCollectionsGraphQL(payload) {
    Object.keys(payload.collections).forEach((slug) => {
        const collection = payload.collections[slug];
        const { config: { labels: { singular, plural, }, fields, timestamps, }, } = collection;
        const singularLabel = (0, formatName_1.default)(singular);
        let pluralLabel = (0, formatName_1.default)(plural);
        // For collections named 'Media' or similar,
        // there is a possibility that the singular name
        // will equal the plural name. Append `all` to the beginning
        // of potential conflicts
        if (singularLabel === pluralLabel) {
            pluralLabel = `all${singularLabel}`;
        }
        collection.graphQL = {};
        const idField = fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
        const idType = (0, buildMutationInputType_1.getCollectionIDType)(collection.config);
        const baseFields = {};
        const whereInputFields = [
            ...fields,
        ];
        if (!idField) {
            baseFields.id = { type: idType };
            whereInputFields.push({
                name: 'id',
                type: 'text',
            });
        }
        if (timestamps) {
            baseFields.createdAt = {
                type: new graphql_1.GraphQLNonNull(graphql_scalars_1.DateTimeResolver),
            };
            baseFields.updatedAt = {
                type: new graphql_1.GraphQLNonNull(graphql_scalars_1.DateTimeResolver),
            };
            whereInputFields.push({
                name: 'createdAt',
                label: 'Created At',
                type: 'date',
            });
            whereInputFields.push({
                name: 'updatedAt',
                label: 'Updated At',
                type: 'date',
            });
        }
        collection.graphQL.type = (0, buildObjectType_1.default)(payload, singularLabel, fields, singularLabel, baseFields);
        collection.graphQL.whereInputType = (0, buildWhereInputType_1.default)(singularLabel, whereInputFields, singularLabel);
        if (collection.config.auth) {
            fields.push({
                name: 'password',
                label: 'Password',
                type: 'text',
                required: true,
            });
        }
        collection.graphQL.mutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, singularLabel, fields, singularLabel));
        collection.graphQL.updateMutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, `${singularLabel}Update`, fields.filter((field) => (0, types_1.fieldAffectsData)(field) && field.name !== 'id'), `${singularLabel}Update`, true));
        payload.Query.fields[singularLabel] = {
            type: collection.graphQL.type,
            args: {
                id: { type: idType },
                draft: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                    fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                } : {}),
            },
            resolve: (0, findByID_1.default)(collection),
        };
        payload.Query.fields[pluralLabel] = {
            type: (0, buildPaginatedListType_1.default)(pluralLabel, collection.graphQL.type),
            args: {
                where: { type: collection.graphQL.whereInputType },
                draft: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                    fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                } : {}),
                page: { type: graphql_1.GraphQLInt },
                limit: { type: graphql_1.GraphQLInt },
                sort: { type: graphql_1.GraphQLString },
            },
            resolve: (0, find_1.default)(collection),
        };
        payload.Mutation.fields[`create${singularLabel}`] = {
            type: collection.graphQL.type,
            args: {
                data: { type: collection.graphQL.mutationInputType },
                draft: { type: graphql_1.GraphQLBoolean },
            },
            resolve: (0, create_1.default)(collection),
        };
        payload.Mutation.fields[`update${singularLabel}`] = {
            type: collection.graphQL.type,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(idType) },
                data: { type: collection.graphQL.updateMutationInputType },
                draft: { type: graphql_1.GraphQLBoolean },
                autosave: { type: graphql_1.GraphQLBoolean },
            },
            resolve: (0, update_1.default)(collection),
        };
        payload.Mutation.fields[`delete${singularLabel}`] = {
            type: collection.graphQL.type,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(idType) },
            },
            resolve: (0, delete_1.default)(collection),
        };
        if (collection.config.versions) {
            const versionCollectionFields = [
                ...(0, buildCollectionFields_1.buildVersionCollectionFields)(collection.config),
                {
                    name: 'id',
                    type: 'text',
                },
                {
                    name: 'createdAt',
                    label: 'Created At',
                    type: 'date',
                },
                {
                    name: 'updatedAt',
                    label: 'Updated At',
                    type: 'date',
                },
            ];
            collection.graphQL.versionType = (0, buildObjectType_1.default)(payload, `${singularLabel}Version`, versionCollectionFields, `${singularLabel}Version`, {});
            payload.Query.fields[`version${(0, formatName_1.default)(singularLabel)}`] = {
                type: collection.graphQL.versionType,
                args: {
                    id: { type: graphql_1.GraphQLString },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                },
                resolve: (0, findVersionByID_1.default)(collection),
            };
            payload.Query.fields[`versions${pluralLabel}`] = {
                type: (0, buildPaginatedListType_1.default)(`versions${(0, formatName_1.default)(pluralLabel)}`, collection.graphQL.versionType),
                args: {
                    where: {
                        type: (0, buildWhereInputType_1.default)(`versions${singularLabel}`, versionCollectionFields, `versions${singularLabel}`),
                    },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                    page: { type: graphql_1.GraphQLInt },
                    limit: { type: graphql_1.GraphQLInt },
                    sort: { type: graphql_1.GraphQLString },
                },
                resolve: (0, findVersions_1.default)(collection),
            };
            payload.Mutation.fields[`restoreVersion${(0, formatName_1.default)(singularLabel)}`] = {
                type: collection.graphQL.type,
                args: {
                    id: { type: graphql_1.GraphQLString },
                },
                resolve: (0, restoreVersion_1.default)(collection),
            };
        }
        if (collection.config.auth) {
            collection.graphQL.JWT = (0, buildObjectType_1.default)(payload, (0, formatName_1.default)(`${slug}JWT`), collection.config.fields.filter((field) => (0, types_1.fieldAffectsData)(field) && field.saveToJWT).concat([
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'collection',
                    type: 'text',
                    required: true,
                },
            ]), (0, formatName_1.default)(`${slug}JWT`));
            payload.Query.fields[`me${singularLabel}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}Me`),
                    fields: {
                        token: {
                            type: graphql_1.GraphQLString,
                        },
                        user: {
                            type: collection.graphQL.type,
                        },
                        exp: {
                            type: graphql_1.GraphQLInt,
                        },
                        collection: {
                            type: graphql_1.GraphQLString,
                        },
                    },
                }),
                resolve: (0, me_1.default)(collection),
            };
            if (collection.config.auth.maxLoginAttempts > 0) {
                payload.Mutation.fields[`unlock${singularLabel}`] = {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
                    args: {
                        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    },
                    resolve: (0, unlock_1.default)(collection),
                };
            }
            payload.Query.fields[`initialized${singularLabel}`] = {
                type: graphql_1.GraphQLBoolean,
                resolve: (0, init_1.default)(collection),
            };
            payload.Mutation.fields[`login${singularLabel}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}LoginResult`),
                    fields: {
                        token: {
                            type: graphql_1.GraphQLString,
                        },
                        user: {
                            type: collection.graphQL.type,
                        },
                        exp: {
                            type: graphql_1.GraphQLInt,
                        },
                    },
                }),
                args: {
                    email: { type: graphql_1.GraphQLString },
                    password: { type: graphql_1.GraphQLString },
                },
                resolve: (0, login_1.default)(collection),
            };
            payload.Mutation.fields[`logout${singularLabel}`] = {
                type: graphql_1.GraphQLString,
                resolve: (0, logout_1.default)(collection),
            };
            payload.Mutation.fields[`forgotPassword${singularLabel}`] = {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
                args: {
                    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                    disableEmail: { type: graphql_1.GraphQLBoolean },
                    expiration: { type: graphql_1.GraphQLInt },
                },
                resolve: (0, forgotPassword_1.default)(collection),
            };
            payload.Mutation.fields[`resetPassword${singularLabel}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}ResetPassword`),
                    fields: {
                        token: { type: graphql_1.GraphQLString },
                        user: { type: collection.graphQL.type },
                    },
                }),
                args: {
                    token: { type: graphql_1.GraphQLString },
                    password: { type: graphql_1.GraphQLString },
                },
                resolve: (0, resetPassword_1.default)(collection),
            };
            payload.Mutation.fields[`verifyEmail${singularLabel}`] = {
                type: graphql_1.GraphQLBoolean,
                args: {
                    token: { type: graphql_1.GraphQLString },
                },
                resolve: (0, verifyEmail_1.default)(collection),
            };
            payload.Mutation.fields[`refreshToken${singularLabel}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}Refreshed${singularLabel}`),
                    fields: {
                        user: {
                            type: collection.graphQL.JWT,
                        },
                        refreshedToken: {
                            type: graphql_1.GraphQLString,
                        },
                        exp: {
                            type: graphql_1.GraphQLInt,
                        },
                    },
                }),
                args: {
                    token: { type: graphql_1.GraphQLString },
                },
                resolve: (0, refresh_1.default)(collection),
            };
        }
    });
}
exports.default = initCollectionsGraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9ncmFwaHFsL2luaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxxREFBbUQ7QUFDbkQscUNBTWlCO0FBRWpCLG9GQUE0RDtBQUM1RCx5R0FBaUY7QUFFakYsc0dBQTBHO0FBQzFHLGdGQUFvRjtBQUNwRixnRUFBZ0Q7QUFDaEQsZ0VBQWdEO0FBQ2hELDREQUE0QztBQUM1QyxvRUFBb0Q7QUFDcEQsa0ZBQWtFO0FBQ2xFLDRFQUE0RDtBQUM1RCxnRkFBZ0U7QUFDaEUseUVBQWlEO0FBQ2pELDZFQUFxRDtBQUNyRCwrRUFBdUQ7QUFDdkQsaUZBQXlEO0FBQ3pELGlHQUF5RTtBQUN6RSwrRkFBdUU7QUFDdkUsMkZBQW1FO0FBQ25FLGlGQUF5RDtBQUN6RCxtRkFBMkQ7QUFFM0QscURBQW9FO0FBQ3BFLDJGQUFtRTtBQUNuRSxtR0FBMkU7QUFDM0UsZ0VBQW1EO0FBRW5ELFNBQVMsc0JBQXNCLENBQUMsT0FBZ0I7SUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLEVBQ0osTUFBTSxFQUFFLEVBQ04sTUFBTSxFQUFFLEVBQ04sUUFBUSxFQUNSLE1BQU0sR0FDUCxFQUNELE1BQU0sRUFDTixVQUFVLEdBQ1gsR0FDRixHQUFHLFVBQVUsQ0FBQztRQUVmLE1BQU0sYUFBYSxHQUFHLElBQUEsb0JBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLFdBQVcsR0FBRyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFFckMsNENBQTRDO1FBQzVD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