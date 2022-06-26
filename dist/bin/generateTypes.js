"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypes = void 0;
/* eslint-disable no-nested-ternary */
const fs_1 = __importDefault(require("fs"));
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const logger_1 = __importDefault(require("../utilities/logger"));
const types_1 = require("../fields/config/types");
const load_1 = __importDefault(require("../config/load"));
const deepCopyObject_1 = __importDefault(require("../utilities/deepCopyObject"));
function getCollectionIDType(collections, slug) {
    const matchedCollection = collections.find((collection) => collection.slug === slug);
    const customIdField = matchedCollection.fields.find((field) => 'name' in field && field.name === 'id');
    if (customIdField && customIdField.type === 'number') {
        return 'number';
    }
    return 'string';
}
function returnOptionEnums(options) {
    return options.map((option) => {
        if (typeof option === 'object' && 'value' in option) {
            return option.value;
        }
        return option;
    });
}
function generateFieldTypes(config, fields) {
    let topLevelProps = [];
    let requiredTopLevelProps = [];
    return {
        properties: Object.fromEntries(fields.reduce((properties, field) => {
            let fieldSchema;
            switch (field.type) {
                case 'text':
                case 'textarea':
                case 'code':
                case 'email':
                case 'date': {
                    fieldSchema = { type: 'string' };
                    break;
                }
                case 'number': {
                    fieldSchema = { type: 'number' };
                    break;
                }
                case 'checkbox': {
                    fieldSchema = { type: 'boolean' };
                    break;
                }
                case 'richText': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    };
                    break;
                }
                case 'radio': {
                    fieldSchema = {
                        type: 'string',
                        enum: returnOptionEnums(field.options),
                    };
                    break;
                }
                case 'select': {
                    const selectType = {
                        type: 'string',
                        enum: returnOptionEnums(field.options),
                    };
                    if (field.hasMany) {
                        fieldSchema = {
                            type: 'array',
                            items: selectType,
                        };
                    }
                    else {
                        fieldSchema = selectType;
                    }
                    break;
                }
                case 'point': {
                    fieldSchema = {
                        type: 'array',
                        minItems: 2,
                        maxItems: 2,
                        items: [
                            {
                                type: 'number',
                            },
                            {
                                type: 'number',
                            },
                        ],
                    };
                    break;
                }
                case 'relationship': {
                    if (Array.isArray(field.relationTo)) {
                        if (field.hasMany) {
                            fieldSchema = {
                                type: 'array',
                                items: {
                                    oneOf: field.relationTo.map((relation) => {
                                        const idFieldType = getCollectionIDType(config.collections, relation);
                                        return {
                                            type: 'object',
                                            additionalProperties: false,
                                            properties: {
                                                value: {
                                                    oneOf: [
                                                        {
                                                            type: idFieldType,
                                                        },
                                                        {
                                                            $ref: `#/definitions/${relation}`,
                                                        },
                                                    ],
                                                },
                                                relationTo: {
                                                    const: relation,
                                                },
                                            },
                                            required: ['value', 'relationTo'],
                                        };
                                    }),
                                },
                            };
                        }
                        else {
                            fieldSchema = {
                                oneOf: field.relationTo.map((relation) => {
                                    const idFieldType = getCollectionIDType(config.collections, relation);
                                    return {
                                        type: 'object',
                                        additionalProperties: false,
                                        properties: {
                                            value: {
                                                oneOf: [
                                                    {
                                                        type: idFieldType,
                                                    },
                                                    {
                                                        $ref: `#/definitions/${relation}`,
                                                    },
                                                ],
                                            },
                                            relationTo: {
                                                const: relation,
                                            },
                                        },
                                        required: ['value', 'relationTo'],
                                    };
                                }),
                            };
                        }
                    }
                    else {
                        const idFieldType = getCollectionIDType(config.collections, field.relationTo);
                        if (field.hasMany) {
                            fieldSchema = {
                                type: 'array',
                                items: {
                                    oneOf: [
                                        {
                                            type: idFieldType,
                                        },
                                        {
                                            $ref: `#/definitions/${field.relationTo}`,
                                        },
                                    ],
                                },
                            };
                        }
                        else {
                            fieldSchema = {
                                oneOf: [
                                    {
                                        type: idFieldType,
                                    },
                                    {
                                        $ref: `#/definitions/${field.relationTo}`,
                                    },
                                ],
                            };
                        }
                    }
                    break;
                }
                case 'upload': {
                    const idFieldType = getCollectionIDType(config.collections, field.relationTo);
                    fieldSchema = {
                        oneOf: [
                            {
                                type: idFieldType,
                            },
                            {
                                $ref: `#/definitions/${field.relationTo}`,
                            },
                        ],
                    };
                    break;
                }
                case 'blocks': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            oneOf: field.blocks.map((block) => {
                                const blockSchema = generateFieldTypes(config, block.fields);
                                return {
                                    type: 'object',
                                    additionalProperties: false,
                                    properties: {
                                        ...blockSchema.properties,
                                        blockType: {
                                            const: block.slug,
                                        },
                                    },
                                    required: [
                                        'blockType',
                                        ...blockSchema.required,
                                    ],
                                };
                            }),
                        },
                    };
                    break;
                }
                case 'array': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            ...generateFieldTypes(config, field.fields),
                        },
                    };
                    break;
                }
                case 'row': {
                    const topLevelFields = generateFieldTypes(config, field.fields);
                    requiredTopLevelProps = requiredTopLevelProps.concat(topLevelFields.required);
                    topLevelProps = topLevelProps.concat(Object.entries(topLevelFields.properties).map((prop) => prop));
                    break;
                }
                case 'group': {
                    fieldSchema = {
                        type: 'object',
                        additionalProperties: false,
                        ...generateFieldTypes(config, field.fields),
                    };
                    break;
                }
                default: {
                    break;
                }
            }
            if (fieldSchema && (0, types_1.fieldAffectsData)(field)) {
                return [
                    ...properties,
                    [
                        field.name,
                        {
                            ...fieldSchema,
                        },
                    ],
                ];
            }
            return [
                ...properties,
                ...topLevelProps,
            ];
        }, [])),
        required: [
            ...fields
                .filter((field) => (0, types_1.fieldAffectsData)(field) && field.required === true)
                .map((field) => ((0, types_1.fieldAffectsData)(field) ? field.name : '')),
            ...requiredTopLevelProps,
        ],
    };
}
function entityToJsonSchema(config, incomingEntity) {
    const entity = (0, deepCopyObject_1.default)(incomingEntity);
    const title = 'label' in entity ? entity.label : entity.labels.singular;
    const idField = { type: 'text', name: 'id', required: true };
    const customIdField = entity.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
    if (customIdField) {
        customIdField.required = true;
    }
    else {
        entity.fields.unshift(idField);
    }
    if ('timestamps' in entity && entity.timestamps !== false) {
        entity.fields.push({
            type: 'text',
            name: 'createdAt',
            required: true,
        }, {
            type: 'text',
            name: 'updatedAt',
            required: true,
        });
    }
    return {
        title,
        type: 'object',
        additionalProperties: false,
        ...generateFieldTypes(config, entity.fields),
    };
}
function configToJsonSchema(config) {
    return {
        definitions: Object.fromEntries([
            ...config.globals.map((global) => [
                global.slug,
                entityToJsonSchema(config, global),
            ]),
            ...config.collections.map((collection) => [
                collection.slug,
                entityToJsonSchema(config, collection),
            ]),
        ]),
        additionalProperties: false,
    };
}
function generateTypes() {
    const logger = (0, logger_1.default)();
    const config = (0, load_1.default)();
    logger.info('Compiling TS types for Collections and Globals...');
    const jsonSchema = configToJsonSchema(config);
    (0, json_schema_to_typescript_1.compile)(jsonSchema, 'Config', {
        unreachableDefinitions: true,
        bannerComment: '/* tslint:disable */\n/**\n* This file was automatically generated by Payload CMS.\n* DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,\n* and re-run `payload generate:types` to regenerate this file.\n*/',
        style: {
            singleQuote: true,
        },
    }).then((compiled) => {
        fs_1.default.writeFileSync(config.typescript.outputFile, compiled);
        logger.info(`Types written to ${config.typescript.outputFile}`);
    });
}
exports.generateTypes = generateTypes;
// when generateTypes.js is launched directly
if (module.id === require.main.id) {
    generateTypes();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2VuZXJhdGVUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNENBQW9CO0FBRXBCLHlFQUFvRDtBQUNwRCxpRUFBeUM7QUFDekMsa0RBQTZGO0FBRzdGLDBEQUF3QztBQUV4QyxpRkFBeUQ7QUFFekQsU0FBUyxtQkFBbUIsQ0FBQyxXQUF3QyxFQUFFLElBQVk7SUFDakYsTUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztJQUV2RyxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNwRCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLE9BQWlCO0lBQzFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7WUFDbkQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUF1QixFQUFFLE1BQWU7SUFNbEUsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3ZC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