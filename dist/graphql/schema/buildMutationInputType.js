"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionIDType = void 0;
/* eslint-disable no-use-before-define */
const graphql_1 = require("graphql");
const graphql_type_json_1 = require("graphql-type-json");
const withNullableType_1 = __importDefault(require("./withNullableType"));
const formatName_1 = __importDefault(require("../utilities/formatName"));
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const types_1 = require("../../fields/config/types");
const formatLabels_1 = require("../../utilities/formatLabels");
const getCollectionIDType = (config) => {
    const idField = config.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
    if (!idField)
        return graphql_1.GraphQLString;
    switch (idField.type) {
        case 'number':
            return graphql_1.GraphQLInt;
        default:
            return graphql_1.GraphQLString;
    }
};
exports.getCollectionIDType = getCollectionIDType;
function buildMutationInputType(payload, name, fields, parentName, forceNullable = false) {
    const fieldToSchemaMap = {
        number: (field) => {
            const type = field.name === 'id' ? graphql_1.GraphQLInt : graphql_1.GraphQLFloat;
            return { type: (0, withNullableType_1.default)(field, type, forceNullable) };
        },
        text: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        email: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        textarea: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        richText: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_type_json_1.GraphQLJSON, forceNullable) }),
        code: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        date: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        upload: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        radio: (field) => ({ type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) }),
        point: (field) => ({ type: (0, withNullableType_1.default)(field, (0, graphql_1.GraphQLList)(graphql_1.GraphQLFloat), forceNullable) }),
        checkbox: () => ({ type: graphql_1.GraphQLBoolean }),
        select: (field) => {
            const formattedName = `${(0, combineParentName_1.default)(parentName, field.name)}_MutationInput`;
            let type = new graphql_1.GraphQLEnumType({
                name: formattedName,
                values: field.options.reduce((values, option) => {
                    if (typeof option === 'object' && option.value) {
                        return {
                            ...values,
                            [(0, formatName_1.default)(option.value)]: {
                                value: option.value,
                            },
                        };
                    }
                    if (typeof option === 'string') {
                        return {
                            ...values,
                            [option]: {
                                value: option,
                            },
                        };
                    }
                    return values;
                }, {}),
            });
            type = field.hasMany ? new graphql_1.GraphQLList(type) : type;
            type = (0, withNullableType_1.default)(field, type, forceNullable);
            return { type };
        },
        relationship: (field) => {
            const { relationTo } = field;
            let type;
            if (Array.isArray(relationTo)) {
                const fullName = `${(0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label)}RelationshipInput`;
                type = new graphql_1.GraphQLInputObjectType({
                    name: fullName,
                    fields: {
                        relationTo: {
                            type: new graphql_1.GraphQLEnumType({
                                name: `${fullName}RelationTo`,
                                values: relationTo.reduce((values, option) => ({
                                    ...values,
                                    [(0, formatName_1.default)(option)]: {
                                        value: option,
                                    },
                                }), {}),
                            }),
                        },
                        value: { type: graphql_type_json_1.GraphQLJSON },
                    },
                });
            }
            else {
                type = (0, exports.getCollectionIDType)(payload.collections[relationTo].config);
            }
            return { type: field.hasMany ? new graphql_1.GraphQLList(type) : type };
        },
        array: (field) => {
            const fullName = (0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label);
            let type = buildMutationInputType(payload, fullName, field.fields, fullName);
            type = new graphql_1.GraphQLList((0, withNullableType_1.default)(field, type, forceNullable));
            return { type };
        },
        group: (field) => {
            const requiresAtLeastOneField = field.fields.some((subField) => (!(0, types_1.fieldIsPresentationalOnly)(subField) && subField.required && !subField.localized));
            const fullName = (0, combineParentName_1.default)(parentName, field.label === false ? (0, formatLabels_1.toWords)(field.name, true) : field.label);
            let type = buildMutationInputType(payload, fullName, field.fields, fullName);
            if (requiresAtLeastOneField)
                type = new graphql_1.GraphQLNonNull(type);
            return { type };
        },
        blocks: () => ({ type: graphql_type_json_1.GraphQLJSON }),
        row: (field) => field.fields.reduce((acc, rowField) => {
            const getFieldSchema = fieldToSchemaMap[rowField.type];
            if (getFieldSchema) {
                const fieldSchema = getFieldSchema(rowField);
                return [
                    ...acc,
                    fieldSchema,
                ];
            }
            return acc;
        }, []),
    };
    const fieldTypes = fields.reduce((schema, field) => {
        if (!(0, types_1.fieldIsPresentationalOnly)(field) && !field.hidden) {
            const getFieldSchema = fieldToSchemaMap[field.type];
            if (getFieldSchema) {
                const fieldSchema = getFieldSchema(field);
                if ((0, types_1.fieldHasSubFields)(field) && Array.isArray(fieldSchema)) {
                    return fieldSchema.reduce((acc, subField, i) => {
                        const currentSubField = field.fields[i];
                        if ((0, types_1.fieldAffectsData)(currentSubField)) {
                            return {
                                ...acc,
                                [currentSubField.name]: subField,
                            };
                        }
                        return {
                            ...acc,
                            ...fieldSchema,
                        };
                    }, schema);
                }
                if ((0, types_1.fieldAffectsData)(field)) {
                    return {
                        ...schema,
                        [field.name]: fieldSchema,
                    };
                }
                return {
                    ...schema,
                    ...fieldSchema,
                };
            }
        }
        return schema;
    }, {});
    const fieldName = (0, formatName_1.default)(name);
    return new graphql_1.GraphQLInputObjectType({
        name: `mutation${fieldName}Input`,
        fields: {
            ...fieldTypes,
        },
    });
}
exports.default = buildMutationInputType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRNdXRhdGlvbklucHV0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3NjaGVtYS9idWlsZE11dGF0aW9uSW5wdXRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUF5QztBQUN6QyxxQ0FXaUI7QUFDakIseURBQWdEO0FBQ2hELDBFQUFrRDtBQUNsRCx5RUFBaUQ7QUFDakQsdUZBQStEO0FBQy9ELHFEQUFpVDtBQUNqVCwrREFBdUQ7QUFJaEQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE1BQWlDLEVBQXFCLEVBQUU7SUFDMUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEsd0JBQWdCLEVBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztJQUM5RixJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sdUJBQWEsQ0FBQztJQUNuQyxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7UUFDcEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxvQkFBVSxDQUFDO1FBQ3BCO1lBQ0UsT0FBTyx1QkFBYSxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQyxDQUFDO0FBVFcsUUFBQSxtQkFBbUIsdUJBUzlCO0FBRUYsU0FBUyxzQkFBc0IsQ0FBQyxPQUFnQixFQUFFLElBQVksRUFBRSxNQUFlLEVBQUUsVUFBa0IsRUFBRSxhQUFhLEdBQUcsS0FBSztJQUN4SCxNQUFNLGdCQUFnQixHQUFHO1FBQ3ZCLE1BQU0sRUFBRSxDQUFDLEtBQWtCLEVBQUUsRUFBRTtZQUM3QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQztZQUM3RCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ2hFLENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUM3RixLQUFLLEVBQUUsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUMvRixRQUFRLEVBQUUsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUNyRyxRQUFRLEVBQUUsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLCtCQUFXLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUNuRyxJQUFJLEVBQUUsQ0FBQyxLQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUM3RixJQUFJLEVBQUUsQ0FBQyxLQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUM3RixNQUFNLEVBQUUsQ0FBQyxLQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUEsMEJBQWdCLEVBQUMsS0FBSyxFQUFFLHVCQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQztR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