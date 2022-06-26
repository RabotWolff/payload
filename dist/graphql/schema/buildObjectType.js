"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
const graphql_type_json_1 = require("graphql-type-json");
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const types_1 = require("../../fields/config/types");
const formatName_1 = __importDefault(require("../utilities/formatName"));
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const withNullableType_1 = __importDefault(require("./withNullableType"));
const formatLabels_1 = require("../../utilities/formatLabels");
const relationshipPromise_1 = __importDefault(require("../../fields/richText/relationshipPromise"));
const formatOptions_1 = __importDefault(require("../utilities/formatOptions"));
const find_1 = __importDefault(require("../../collections/operations/find"));
const buildWhereInputType_1 = __importDefault(require("./buildWhereInputType"));
const buildBlockType_1 = __importDefault(require("./buildBlockType"));
function buildObjectType(payload, name, fields, parentName, baseFields = {}) {
    const fieldToSchemaMap = {
        number: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLFloat) }),
        text: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString) }),
        email: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_scalars_1.EmailAddressResolver) }),
        textarea: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString) }),
        code: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString) }),
        date: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_scalars_1.DateTimeResolver) }),
        point: (field) => ({ type: (0, withNullableType_1.default)(field, new graphql_1.GraphQLList(graphql_1.GraphQLFloat)) }),
        richText: (field) => ({
            type: (0, withNullableType_1.default)(field, graphql_type_json_1.GraphQLJSON),
            async resolve(parent, args, context) {
                if (args.depth > 0) {
                    await (0, relationshipPromise_1.default)({
                        req: context.req,
                        siblingDoc: parent,
                        depth: args.depth,
                        field,
                        showHiddenFields: false,
                    });
                }
                return parent[field.name];
            },
            args: {
                depth: {
                    type: graphql_1.GraphQLInt,
                },
            },
        }),
        upload: (field) => {
            const { relationTo, label } = field;
            const uploadName = (0, combineParentName_1.default)(parentName, label === false ? (0, formatLabels_1.toWords)(field.name, true) : label);
            // If the relationshipType is undefined at this point,
            // it can be assumed that this blockType can have a relationship
            // to itself. Therefore, we set the relationshipType equal to the blockType
            // that is currently being created.
            const type = payload.collections[relationTo].graphQL.type || newlyCreatedBlockType;
            const uploadArgs = {};
            if (payload.config.localization) {
                uploadArgs.locale = {
                    type: payload.types.localeInputType,
                };
                uploadArgs.fallbackLocale = {
                    type: payload.types.fallbackLocaleInputType,
                };
            }
            const relatedCollectionSlug = field.relationTo;
            const relatedCollection = payload.collections[relatedCollectionSlug];
            const upload = {
                args: uploadArgs,
                type,
                extensions: { complexity: 20 },
                async resolve(parent, args, context) {
                    const value = parent[field.name];
                    const locale = args.locale || context.req.locale;
                    const fallbackLocale = args.fallbackLocale || context.req.fallbackLocale;
                    let id = value;
                    if (id) {
                        id = id.toString();
                        const relatedDocumentQuery = {
                            collection: relatedCollection,
                            where: {
                                ...(args.where || {}),
                                _id: {
                                    equals: id,
                                },
                            },
                            res: context.res,
                            req: {
                                ...context.req,
                                locale,
                                fallbackLocale,
                            },
                            depth: 0,
                            pagination: false,
                        };
                        const relatedDocument = await (0, find_1.default)(relatedDocumentQuery);
                        if (relatedDocument.docs[0])
                            return relatedDocument.docs[0];
                        return null;
                    }
                    return null;
                },
            };
            const whereFields = payload.collections[relationTo].config.fields;
            upload.args.where = {
                type: (0, buildWhereInputType_1.default)(uploadName, whereFields, uploadName),
            };
            return upload;
        },
        radio: (field) => ({
            type: (0, withNullableType_1.default)(field, new graphql_1.GraphQLEnumType({
                name: (0, combineParentName_1.default)(parentName, field.name),
                values: (0, formatOptions_1.default)(field),
            })),
        }),
        checkbox: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLBoolean) }),
        select: (field) => {
            const fullName = (0, combineParentName_1.default)(parentName, field.name);
            let type = new graphql_1.GraphQLEnumType({
                name: fullName,
                values: (0, formatOptions_1.default)(field),
            });
            type = field.hasMany ? new graphql_1.GraphQLList(type) : type;
            type = (0, withNullableType_1.default)(field, type);
            return { type };
        },
        relationship: (field) => {
            const { relationTo, label } = field;
            const isRelatedToManyCollections = Array.isArray(relationTo);
            const hasManyValues = field.hasMany;
            const relationshipName = (0, combineParentName_1.default)(parentName, label === false ? (0, formatLabels_1.toWords)(field.name, true) : label);
            let type;
            let relationToType = null;
            if (Array.isArray(relationTo)) {
                relationToType = new graphql_1.GraphQLEnumType({
                    name: `${relationshipName}_RelationTo`,
                    values: relationTo.reduce((relations, relation) => ({
                        ...relations,
                        [(0, formatName_1.default)(relation)]: {
                            value: relation,
                        },
                    }), {}),
                });
                const types = relationTo.map((relation) => payload.collections[relation].graphQL.type);
                type = new graphql_1.GraphQLObjectType({
                    name: `${relationshipName}_Relationship`,
                    fields: {
                        relationTo: {
                            type: relationToType,
                        },
                        value: {
                            type: new graphql_1.GraphQLUnionType({
                                name: relationshipName,
                                types,
                                async resolveType(data, { req }) {
                                    return payload.collections[data.collection].graphQL.type.name;
                                },
                            }),
                        },
                    },
                });
            }
            else {
                ({ type } = payload.collections[relationTo].graphQL);
            }
            // If the relationshipType is undefined at this point,
            // it can be assumed that this blockType can have a relationship
            // to itself. Therefore, we set the relationshipType equal to the blockType
            // that is currently being created.
            type = type || newlyCreatedBlockType;
            const relationshipArgs = {};
            if (payload.config.localization) {
                relationshipArgs.locale = {
                    type: payload.types.localeInputType,
                };
                relationshipArgs.fallbackLocale = {
                    type: payload.types.fallbackLocaleInputType,
                };
            }
            const { collections, } = payload;
            const relationship = {
                args: relationshipArgs,
                type: hasManyValues ? new graphql_1.GraphQLList(type) : type,
                extensions: { complexity: 10 },
                async resolve(parent, args, context) {
                    const value = parent[field.name];
                    const locale = args.locale || context.req.locale;
                    const fallbackLocale = args.fallbackLocale || context.req.fallbackLocale;
                    let relatedCollectionSlug = field.relationTo;
                    if (hasManyValues) {
                        const results = [];
                        const resultPromises = [];
                        const createPopulationPromise = async (relatedDoc, i) => {
                            let id = relatedDoc;
                            let collectionSlug = field.relationTo;
                            if (isRelatedToManyCollections) {
                                collectionSlug = relatedDoc.relationTo;
                                id = relatedDoc.value;
                            }
                            const result = await (0, find_1.default)({
                                collection: collections[collectionSlug],
                                where: {
                                    ...(args.where || {}),
                                    _id: {
                                        equals: id,
                                    },
                                },
                                req: {
                                    ...context.req,
                                    locale,
                                    fallbackLocale,
                                },
                                depth: 0,
                                pagination: false,
                            });
                            if (result.docs.length === 1) {
                                if (isRelatedToManyCollections) {
                                    results[i] = {
                                        relationTo: collectionSlug,
                                        value: {
                                            ...result.docs[0],
                                            collection: collectionSlug,
                                        },
                                    };
                                }
                                else {
                                    [results[i]] = result.docs;
                                }
                            }
                        };
                        if (value) {
                            value.forEach((relatedDoc, i) => {
                                resultPromises.push(createPopulationPromise(relatedDoc, i));
                            });
                        }
                        await Promise.all(resultPromises);
                        return results;
                    }
                    let id = value;
                    if (isRelatedToManyCollections && value) {
                        id = value.value;
                        relatedCollectionSlug = value.relationTo;
                    }
                    if (id) {
                        id = id.toString();
                        const relatedDocumentQuery = {
                            collection: collections[relatedCollectionSlug],
                            where: {
                                ...(args.where || {}),
                                id: {
                                    equals: id,
                                },
                            },
                            ...context,
                            depth: 0,
                        };
                        if (args.page)
                            relatedDocumentQuery.paginate.page = args.page;
                        if (args.limit)
                            relatedDocumentQuery.paginate.limit = args.limit;
                        const relatedDocument = await (0, find_1.default)(relatedDocumentQuery);
                        if (relatedDocument.docs[0]) {
                            if (isRelatedToManyCollections) {
                                return {
                                    relationTo: relatedCollectionSlug,
                                    value: {
                                        ...relatedDocument.docs[0],
                                        collection: relatedCollectionSlug,
                                    },
                                };
                            }
                            return relatedDocument.docs[0];
                        }
                        return null;
                    }
                    return null;
                },
            };
            if (hasManyValues) {
                relationship.args.page = { type: graphql_1.GraphQLInt };
                relationship.args.limit = { type: graphql_1.GraphQLInt };
            }
            if (Array.isArray(relationTo)) {
                const relatedCollectionFields = relationTo.reduce((allFields, relation) => [
                    ...allFields,
                    ...collections[relation].config.fields,
                ], []);
                relationship.args.where = {
                    type: (0, buildWhereInputType_1.default)(relationshipName, relatedCollectionFields, relationshipName),
                };
            }
            else {
                const whereFields = payload.collections[relationTo].config.fields;
                relationship.args.where = {
                    type: (0, buildWhereInputType_1.default)(relationshipName, whereFields, relationshipName),
                };
            }
            return relationship;
        },
        array: (field) => {
            const fullName = (0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label);
            const type = buildObjectType(payload, fullName, field.fields, fullName);
            const arrayType = new graphql_1.GraphQLList((0, withNullableType_1.default)(field, type));
            return { type: arrayType };
        },
        group: (field) => {
            const fullName = (0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label);
            const type = buildObjectType(payload, fullName, field.fields, fullName);
            return { type };
        },
        blocks: (field) => {
            const blockTypes = field.blocks.map((block) => {
                (0, buildBlockType_1.default)(payload, block);
                return payload.types.blockTypes[block.slug];
            });
            const fullName = (0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label);
            const type = new graphql_1.GraphQLList(new graphql_1.GraphQLUnionType({
                name: fullName,
                types: blockTypes,
                resolveType: (data) => payload.types.blockTypes[data.blockType].name,
            }));
            return { type };
        },
        row: (field) => field.fields.reduce((subFieldSchema, subField) => {
            const buildSchemaType = fieldToSchemaMap[subField.type];
            if (!(0, types_1.fieldIsPresentationalOnly)(subField) && buildSchemaType) {
                return {
                    ...subFieldSchema,
                    [(0, formatName_1.default)(subField.name)]: buildSchemaType(subField),
                };
            }
            return subFieldSchema;
        }, {}),
    };
    const objectSchema = {
        name,
        fields: () => fields.reduce((schema, field) => {
            if (!(0, types_1.fieldIsPresentationalOnly)(field) && !field.hidden) {
                const fieldSchema = fieldToSchemaMap[field.type];
                if (fieldSchema) {
                    if ((0, types_1.fieldAffectsData)(field)) {
                        return {
                            ...schema,
                            [(0, formatName_1.default)(field.name)]: fieldSchema(field),
                        };
                    }
                    return {
                        ...schema,
                        ...fieldSchema(field),
                    };
                }
            }
            return schema;
        }, baseFields),
    };
    const newlyCreatedBlockType = new graphql_1.GraphQLObjectType(objectSchema);
    return newlyCreatedBlockType;
}
exports.default = buildObjectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRPYmplY3RUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dyYXBocWwvc2NoZW1hL2J1aWxkT2JqZWN0VHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUE0RDtBQUM1RCxxQ0FBcUM7QUFDckMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyx5REFBZ0Q7QUFDaEQscUNBU2lCO0FBQ2pCLHFEQUF5RTtBQUN6RSxxREFBeVQ7QUFDelQseUVBQWlEO0FBQ2pELHVGQUErRDtBQUMvRCwwRUFBa0Q7QUFFbEQsK0RBQXVEO0FBQ3ZELG9HQUEwRjtBQUMxRiwrRUFBdUQ7QUFFdkQsNkVBQXFEO0FBQ3JELGdGQUF3RDtBQUN4RCxzRUFBOEM7QUFjOUMsU0FBUyxlQUFlLENBQUMsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsTUFBZSxFQUFFLFVBQWtCLEVBQUUsYUFBeUIsRUFBRTtJQUN2SCxNQUFNLGdCQUFnQixHQUFHO1FBQ3ZCLE1BQU0sRUFBRSxDQUFDLEtBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxFQUFFLENBQUM7UUFDakYsSUFBSSxFQUFFLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFBLDBCQUFnQixFQUFDLEtBQUssRUFBRSx1QkFBYSxDQUFDLEVBQUUsQ0FBQztRQUM5RSxLQUFLLEVBQUUsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHNDQUFvQixDQUFDLEVBQUUsQ0FBQztRQUN2RixRQUFRLEVBQUUsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLENBQUMsRUFBRSxD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