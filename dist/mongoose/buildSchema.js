"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
const mongoose_1 = require("mongoose");
const types_1 = require("../fields/config/types");
const sortableFieldTypes_1 = __importDefault(require("../fields/sortableFieldTypes"));
const setBlockDiscriminators = (fields, schema, config, buildSchemaOptions) => {
    fields.forEach((field) => {
        const blockFieldType = field;
        if (blockFieldType.type === 'blocks' && blockFieldType.blocks && blockFieldType.blocks.length > 0) {
            blockFieldType.blocks.forEach((blockItem) => {
                let blockSchemaFields = {};
                blockItem.fields.forEach((blockField) => {
                    const fieldSchema = fieldToSchemaMap[blockField.type];
                    if (fieldSchema) {
                        blockSchemaFields = fieldSchema(blockField, blockSchemaFields, config, buildSchemaOptions);
                    }
                });
                const blockSchema = new mongoose_1.Schema(blockSchemaFields, { _id: false, id: false });
                if (blockFieldType.localized && config.localization) {
                    config.localization.locales.forEach((locale) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore Possible incorrect typing in mongoose types, this works
                        schema.path(`${field.name}.${locale}`).discriminator(blockItem.slug, blockSchema);
                        setBlockDiscriminators(blockItem.fields, blockSchema, config, buildSchemaOptions);
                    });
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore Possible incorrect typing in mongoose types, this works
                    schema.path(field.name).discriminator(blockItem.slug, blockSchema);
                    setBlockDiscriminators(blockItem.fields, blockSchema, config, buildSchemaOptions);
                }
            });
        }
    });
};
const formatBaseSchema = (field, buildSchemaOptions) => ({
    sparse: field.unique && field.localized,
    unique: (!buildSchemaOptions.disableUnique && field.unique) || false,
    required: false,
    index: field.index || field.unique || false,
});
const localizeSchema = (field, schema, localization) => {
    if (field.localized && localization && Array.isArray(localization.locales)) {
        return {
            type: localization.locales.reduce((localeSchema, locale) => ({
                ...localeSchema,
                [locale]: schema,
            }), {
                _id: false,
            }),
            localized: true,
            index: schema.index,
        };
    }
    return schema;
};
const buildSchema = (config, configFields, buildSchemaOptions = {}) => {
    var _a;
    const { allowIDField, options } = buildSchemaOptions;
    let fields = {};
    let schemaFields = configFields;
    const indexFields = [];
    if (!allowIDField) {
        const idField = schemaFields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
        if (idField) {
            fields = {
                _id: idField.type === 'number' ? Number : String,
            };
            schemaFields = schemaFields.filter((field) => (0, types_1.fieldAffectsData)(field) && field.name !== 'id');
        }
    }
    schemaFields.forEach((field) => {
        if (!(0, types_1.fieldIsPresentationalOnly)(field)) {
            const fieldSchema = fieldToSchemaMap[field.type];
            if (fieldSchema) {
                fields = fieldSchema(field, fields, config, buildSchemaOptions);
            }
            // geospatial field index must be created after the schema is created
            if (fieldIndexMap[field.type]) {
                indexFields.push(...fieldIndexMap[field.type](field, config));
            }
            if (config.indexSortableFields && !buildSchemaOptions.global && !field.index && !field.hidden && sortableFieldTypes_1.default.indexOf(field.type) > -1 && (0, types_1.fieldAffectsData)(field)) {
                indexFields.push({ [field.name]: 1 });
            }
        }
    });
    if ((_a = buildSchemaOptions === null || buildSchemaOptions === void 0 ? void 0 : buildSchemaOptions.options) === null || _a === void 0 ? void 0 : _a.timestamps) {
        indexFields.push({ createdAt: 1 });
        indexFields.push({ updatedAt: 1 });
    }
    const schema = new mongoose_1.Schema(fields, options);
    indexFields.forEach((index) => {
        schema.index(index);
    });
    setBlockDiscriminators(configFields, schema, config, buildSchemaOptions);
    return schema;
};
const fieldIndexMap = {
    point: (field, config) => {
        let index;
        if (field.index === true || field.index === undefined) {
            index = '2dsphere';
        }
        if (field.localized && config.localization) {
            return config.localization.locales.map((locale) => ({ [`${field.name}.${locale}`]: index }));
        }
        return [{ [field.name]: index }];
    },
};
const fieldToSchemaMap = {
    number: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: Number };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    text: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: String };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    email: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: String };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    textarea: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: String };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    richText: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: mongoose_1.Schema.Types.Mixed };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    code: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: String };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    point: (field, fields, config) => {
        var _a, _b;
        const baseSchema = {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                sparse: field.unique && field.localized,
                unique: field.unique || false,
                required: (field.required && !field.localized && !((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.condition) && !((_b = field === null || field === void 0 ? void 0 : field.access) === null || _b === void 0 ? void 0 : _b.create)) || false,
                default: field.defaultValue || undefined,
            },
        };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    radio: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String,
            enum: field.options.map((option) => {
                if (typeof option === 'object')
                    return option.value;
                return option;
            }),
        };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    checkbox: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: Boolean };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    date: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = { ...formatBaseSchema(field, buildSchemaOptions), type: Date };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    upload: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: mongoose_1.Schema.Types.Mixed,
            ref: field.relationTo,
        };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    relationship: (field, fields, config, buildSchemaOptions) => {
        const hasManyRelations = Array.isArray(field.relationTo);
        let schemaToReturn = {};
        if (field.localized && config.localization) {
            schemaToReturn = {
                type: config.localization.locales.reduce((locales, locale) => {
                    let localeSchema = {};
                    if (hasManyRelations) {
                        localeSchema._id = false;
                        localeSchema.value = {
                            type: mongoose_1.Schema.Types.Mixed,
                            refPath: `${field.name}.${locale}.relationTo`,
                        };
                        localeSchema.relationTo = { type: String, enum: field.relationTo };
                    }
                    else {
                        localeSchema = {
                            ...formatBaseSchema(field, buildSchemaOptions),
                            type: mongoose_1.Schema.Types.Mixed,
                            ref: field.relationTo,
                        };
                    }
                    return {
                        ...locales,
                        [locale]: field.hasMany ? [localeSchema] : localeSchema,
                    };
                }, {}),
                localized: true,
            };
        }
        else if (hasManyRelations) {
            schemaToReturn._id = false;
            schemaToReturn.value = {
                type: mongoose_1.Schema.Types.Mixed,
                refPath: `${field.name}.relationTo`,
            };
            schemaToReturn.relationTo = { type: String, enum: field.relationTo };
            if (field.hasMany)
                schemaToReturn = [schemaToReturn];
        }
        else {
            schemaToReturn = {
                ...formatBaseSchema(field, buildSchemaOptions),
                type: mongoose_1.Schema.Types.Mixed,
                ref: field.relationTo,
            };
            if (field.hasMany)
                schemaToReturn = [schemaToReturn];
        }
        return {
            ...fields,
            [field.name]: schemaToReturn,
        };
    },
    row: (field, fields, config, buildSchemaOptions) => {
        const newFields = { ...fields };
        field.fields.forEach((rowField) => {
            const fieldSchemaMap = fieldToSchemaMap[rowField.type];
            if (fieldSchemaMap && (0, types_1.fieldAffectsData)(rowField)) {
                const fieldSchema = fieldSchemaMap(rowField, fields, config, buildSchemaOptions);
                newFields[rowField.name] = fieldSchema[rowField.name];
            }
        });
        return newFields;
    },
    array: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: [buildSchema(config, field.fields, {
                    options: { _id: false, id: false },
                    allowIDField: true,
                    disableUnique: buildSchemaOptions.disableUnique,
                })],
        };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    group: (field, fields, config, buildSchemaOptions) => {
        var _a, _b;
        let { required } = field;
        if (((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.condition) || (field === null || field === void 0 ? void 0 : field.localized) || ((_b = field === null || field === void 0 ? void 0 : field.access) === null || _b === void 0 ? void 0 : _b.create))
            required = false;
        const formattedBaseSchema = formatBaseSchema(field, buildSchemaOptions);
        const baseSchema = {
            ...formattedBaseSchema,
            required: required && field.fields.some((subField) => { var _a, _b; return (!(0, types_1.fieldIsPresentationalOnly)(subField) && subField.required && !subField.localized && !((_a = subField === null || subField === void 0 ? void 0 : subField.admin) === null || _a === void 0 ? void 0 : _a.condition) && !((_b = subField === null || subField === void 0 ? void 0 : subField.access) === null || _b === void 0 ? void 0 : _b.create)); }),
            type: buildSchema(config, field.fields, {
                options: {
                    _id: false,
                    id: false,
                },
                disableUnique: buildSchemaOptions.disableUnique,
            }),
        };
        return {
            ...fields,
            [field.name]: localizeSchema(field, baseSchema, config.localization),
        };
    },
    select: (field, fields, config, buildSchemaOptions) => {
        const baseSchema = {
            ...formatBaseSchema(field, buildSchemaOptions),
            type: String,
            enum: field.options.map((option) => {
                if (typeof option === 'object')
                    return option.value;
                return option;
            }),
        };
        const schemaToReturn = localizeSchema(field, baseSchema, config.localization);
        return {
            ...fields,
            [field.name]: field.hasMany ? [schemaToReturn] : schemaToReturn,
        };
    },
    blocks: (field, fields, config) => {
        const baseSchema = [new mongoose_1.Schema({}, { _id: false, discriminatorKey: 'blockType' })];
        let schemaToReturn;
        if (field.localized && config.localization) {
            schemaToReturn = config.localization.locales.reduce((localeSchema, locale) => ({
                ...localeSchema,
                [locale]: baseSchema,
            }), {});
        }
        else {
            schemaToReturn = baseSchema;
        }
        return {
            ...fields,
            [field.name]: schemaToReturn,
        };
    },
};
exports.default = buildSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9uZ29vc2UvYnVpbGRTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsMkNBQTJDO0FBQzNDLDREQUE0RDtBQUM1RCx5Q0FBeUM7QUFDekMsdUNBQW1FO0FBRW5FLGtEQUFxVjtBQUNyVixzRkFBOEQ7QUFXOUQsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLE1BQWUsRUFBRSxNQUFjLEVBQUUsTUFBdUIsRUFBRSxrQkFBc0MsRUFBRSxFQUFFO0lBQ2xJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QixNQUFNLGNBQWMsR0FBRyxLQUFtQixDQUFDO1FBQzNDLElBQUksY0FBYyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksY0FBYyxDQUFDLE1BQU0sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFnQixFQUFFLEVBQUU7Z0JBQ2pELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO2dCQUUzQixTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUN0QyxNQUFNLFdBQVcsR0FBeUIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1RSxJQUFJLFdBQVcsRUFBRTt3QkFDZixpQkFBaUIsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3FCQUM1RjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVB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