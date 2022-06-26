"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
const types_1 = require("../../config/types");
const traverseFields_1 = require("./traverseFields");
// This function is responsible for the following actions, in order:
// - Sanitize incoming data
// - Execute field hooks
// - Execute field access control
const promise = async ({ data, doc, field, id, operation, overrideAccess, promises, req, siblingData, siblingDoc, }) => {
    var _a, _b;
    if ((0, types_1.fieldAffectsData)(field)) {
        if (field.name === 'id') {
            if (field.type === 'number' && typeof siblingData[field.name] === 'string') {
                const value = siblingData[field.name];
                siblingData[field.name] = parseFloat(value);
            }
            if (field.type === 'text' && typeof ((_a = siblingData[field.name]) === null || _a === void 0 ? void 0 : _a.toString) === 'function' && typeof siblingData[field.name] !== 'string') {
                siblingData[field.name] = siblingData[field.name].toString();
            }
        }
        // Sanitize incoming data
        switch (field.type) {
            case 'number': {
                if (typeof siblingData[field.name] === 'string') {
                    const value = siblingData[field.name];
                    const trimmed = value.trim();
                    siblingData[field.name] = (trimmed.length === 0) ? null : parseFloat(trimmed);
                }
                break;
            }
            case 'checkbox': {
                if (siblingData[field.name] === 'true')
                    siblingData[field.name] = true;
                if (siblingData[field.name] === 'false')
                    siblingData[field.name] = false;
                if (siblingData[field.name] === '')
                    siblingData[field.name] = false;
                break;
            }
            case 'richText': {
                if (typeof siblingData[field.name] === 'string') {
                    try {
                        const richTextJSON = JSON.parse(siblingData[field.name]);
                        siblingData[field.name] = richTextJSON;
                    }
                    catch {
                        // Disregard this data as it is not valid.
                        // Will be reported to user by field validation
                    }
                }
                break;
            }
            case 'relationship':
            case 'upload': {
                if (siblingData[field.name] === '' || siblingData[field.name] === 'none' || siblingData[field.name] === 'null' || siblingData[field.name] === null) {
                    if (field.type === 'relationship' && field.hasMany === true) {
                        siblingData[field.name] = [];
                    }
                    else {
                        siblingData[field.name] = null;
                    }
                }
                const value = siblingData[field.name];
                if (Array.isArray(field.relationTo)) {
                    if (Array.isArray(value)) {
                        value.forEach((relatedDoc, i) => {
                            const relatedCollection = req.payload.config.collections.find((collection) => collection.slug === relatedDoc.relationTo);
                            const relationshipIDField = relatedCollection.fields.find((collectionField) => (0, types_1.fieldAffectsData)(collectionField) && collectionField.name === 'id');
                            if ((relationshipIDField === null || relationshipIDField === void 0 ? void 0 : relationshipIDField.type) === 'number') {
                                siblingData[field.name][i] = { ...relatedDoc, value: parseFloat(relatedDoc.value) };
                            }
                        });
                    }
                    if (field.type === 'relationship' && field.hasMany !== true && (0, types_1.valueIsValueWithRelation)(value)) {
                        const relatedCollection = req.payload.config.collections.find((collection) => collection.slug === value.relationTo);
                        const relationshipIDField = relatedCollection.fields.find((collectionField) => (0, types_1.fieldAffectsData)(collectionField) && collectionField.name === 'id');
                        if ((relationshipIDField === null || relationshipIDField === void 0 ? void 0 : relationshipIDField.type) === 'number') {
                            siblingData[field.name] = { ...value, value: parseFloat(value.value) };
                        }
                    }
                }
                else {
                    if (Array.isArray(value)) {
                        value.forEach((relatedDoc, i) => {
                            const relatedCollection = req.payload.config.collections.find((collection) => collection.slug === field.relationTo);
                            const relationshipIDField = relatedCollection.fields.find((collectionField) => (0, types_1.fieldAffectsData)(collectionField) && collectionField.name === 'id');
                            if ((relationshipIDField === null || relationshipIDField === void 0 ? void 0 : relationshipIDField.type) === 'number') {
                                siblingData[field.name][i] = parseFloat(relatedDoc);
                            }
                        });
                    }
                    if (field.type === 'relationship' && field.hasMany !== true && value) {
                        const relatedCollection = req.payload.config.collections.find((collection) => collection.slug === field.relationTo);
                        const relationshipIDField = relatedCollection.fields.find((collectionField) => (0, types_1.fieldAffectsData)(collectionField) && collectionField.name === 'id');
                        if ((relationshipIDField === null || relationshipIDField === void 0 ? void 0 : relationshipIDField.type) === 'number') {
                            siblingData[field.name] = parseFloat(value);
                        }
                    }
                }
                break;
            }
            case 'array':
            case 'blocks': {
                // Handle cases of arrays being intentionally set to 0
                if (siblingData[field.name] === '0' || siblingData[field.name] === 0 || siblingData[field.name] === null) {
                    siblingData[field.name] = [];
                }
                break;
            }
            default: {
                break;
            }
        }
        // Execute hooks
        if ((_b = field.hooks) === null || _b === void 0 ? void 0 : _b.beforeValidate) {
            await field.hooks.beforeValidate.reduce(async (priorHook, currentHook) => {
                await priorHook;
                const hookedValue = await currentHook({
                    value: siblingData[field.name],
                    originalDoc: doc,
                    data,
                    siblingData,
                    operation,
                    req,
                });
                if (hookedValue !== undefined) {
                    siblingData[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
        // Execute access control
        if (field.access && field.access[operation]) {
            const result = overrideAccess ? true : await field.access[operation]({ req, id, siblingData, data, doc });
            if (!result) {
                delete siblingData[field.name];
            }
        }
    }
    // Traverse subfields
    switch (field.type) {
        case 'group': {
            let groupData = siblingData[field.name];
            let groupDoc = siblingDoc[field.name];
            if (typeof siblingData[field.name] !== 'object')
                groupData = {};
            if (typeof siblingDoc[field.name] !== 'object')
                groupDoc = {};
            (0, traverseFields_1.traverseFields)({
                data,
                doc,
                fields: field.fields,
                id,
                operation,
                overrideAccess,
                promises,
                req,
                siblingData: groupData,
                siblingDoc: groupDoc,
            });
            break;
        }
        case 'array': {
            const rows = siblingData[field.name];
            if (Array.isArray(rows)) {
                rows.forEach((row, i) => {
                    var _a;
                    (0, traverseFields_1.traverseFields)({
                        data,
                        doc,
                        fields: field.fields,
                        id,
                        operation,
                        overrideAccess,
                        promises,
                        req,
                        siblingData: row,
                        siblingDoc: ((_a = siblingDoc[field.name]) === null || _a === void 0 ? void 0 : _a[i]) || {},
                    });
                });
            }
            break;
        }
        case 'blocks': {
            const rows = siblingData[field.name];
            if (Array.isArray(rows)) {
                rows.forEach((row, i) => {
                    var _a;
                    const block = field.blocks.find((blockType) => blockType.slug === row.blockType);
                    if (block) {
                        (0, traverseFields_1.traverseFields)({
                            data,
                            doc,
                            fields: block.fields,
                            id,
                            operation,
                            overrideAccess,
                            promises,
                            req,
                            siblingData: row,
                            siblingDoc: ((_a = siblingDoc[field.name]) === null || _a === void 0 ? void 0 : _a[i]) || {},
                        });
                    }
                });
            }
            break;
        }
        case 'row': {
            (0, traverseFields_1.traverseFields)({
                data,
                doc,
                fields: field.fields,
                id,
                operation,
                overrideAccess,
                promises,
                req,
                siblingData,
                siblingDoc,
            });
            break;
        }
        default: {
            break;
        }
    }
};
exports.promise = promise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9maWVsZHMvaG9va3MvYmVmb3JlVmFsaWRhdGUvcHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4Q0FBdUY7QUFDdkYscURBQWtEO0FBZWxELG9FQUFvRTtBQUNwRSwyQkFBMkI7QUFDM0Isd0JBQXdCO0FBQ3hCLGlDQUFpQztBQUUxQixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsRUFDNUIsSUFBSSxFQUNKLEdBQUcsRUFDSCxLQUFLLEVBQ0wsRUFBRSxFQUNGLFNBQVMsRUFDVCxjQUFjLEVBQ2QsUUFBUSxFQUNSLEdBQUcsRUFDSCxXQUFXLEVBQ1gsVUFBVSxHQUNMLEVBQWlCLEVBQUU7O0lBQ3hCLElBQUksSUFBQSx3QkFBZ0IsRUFBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDMUUsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVcsQ0FBQztnQkFFaEQsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0M7WUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQSxNQUFBLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDBDQUFFLFFBQVEsQ0FBQSxLQUFLLFVBQVUsSUFBSSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNuSSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENB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