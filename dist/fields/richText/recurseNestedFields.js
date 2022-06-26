"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurseNestedFields = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
const types_1 = require("../config/types");
const populate_1 = require("./populate");
const relationshipPromise_1 = require("./relationshipPromise");
const recurseNestedFields = ({ promises, data, fields, req, overrideAccess = false, depth, currentDepth = 0, showHiddenFields, }) => {
    fields.forEach((field) => {
        var _a, _b;
        if (field.type === 'relationship' || field.type === 'upload') {
            if (field.type === 'relationship') {
                if (field.hasMany && Array.isArray(data[field.name])) {
                    if (Array.isArray(field.relationTo)) {
                        data[field.name].forEach(({ relationTo, value }, i) => {
                            const collection = req.payload.collections[relationTo];
                            if (collection) {
                                promises.push((0, populate_1.populate)({
                                    id: value,
                                    field,
                                    collection,
                                    data: data[field.name],
                                    key: i,
                                    overrideAccess,
                                    depth,
                                    currentDepth,
                                    req,
                                    showHiddenFields,
                                }));
                            }
                        });
                    }
                    else {
                        data[field.name].forEach((id, i) => {
                            const collection = req.payload.collections[field.relationTo];
                            if (collection) {
                                promises.push((0, populate_1.populate)({
                                    id,
                                    field,
                                    collection,
                                    data: data[field.name],
                                    key: i,
                                    overrideAccess,
                                    depth,
                                    currentDepth,
                                    req,
                                    showHiddenFields,
                                }));
                            }
                        });
                    }
                }
                else if (Array.isArray(field.relationTo) && ((_a = data[field.name]) === null || _a === void 0 ? void 0 : _a.value) && ((_b = data[field.name]) === null || _b === void 0 ? void 0 : _b.relationTo)) {
                    const collection = req.payload.collections[data[field.name].relationTo];
                    promises.push((0, populate_1.populate)({
                        id: data[field.name].value,
                        field,
                        collection,
                        data: data[field.name],
                        key: 'value',
                        overrideAccess,
                        depth,
                        currentDepth,
                        req,
                        showHiddenFields,
                    }));
                }
            }
            if (typeof data[field.name] !== 'undefined' && typeof field.relationTo === 'string') {
                const collection = req.payload.collections[field.relationTo];
                promises.push((0, populate_1.populate)({
                    id: data[field.name],
                    field,
                    collection,
                    data,
                    key: field.name,
                    overrideAccess,
                    depth,
                    currentDepth,
                    req,
                    showHiddenFields,
                }));
            }
        }
        else if ((0, types_1.fieldHasSubFields)(field) && !(0, types_1.fieldIsArrayType)(field)) {
            if ((0, types_1.fieldAffectsData)(field) && typeof data[field.name] === 'object') {
                (0, exports.recurseNestedFields)({
                    promises,
                    data: data[field.name],
                    fields: field.fields,
                    req,
                    overrideAccess,
                    depth,
                    currentDepth,
                    showHiddenFields,
                });
            }
            else {
                (0, exports.recurseNestedFields)({
                    promises,
                    data,
                    fields: field.fields,
                    req,
                    overrideAccess,
                    depth,
                    currentDepth,
                    showHiddenFields,
                });
            }
        }
        else if (Array.isArray(data[field.name])) {
            if (field.type === 'blocks') {
                data[field.name].forEach((row, i) => {
                    const block = field.blocks.find(({ slug }) => slug === (row === null || row === void 0 ? void 0 : row.blockType));
                    if (block) {
                        (0, exports.recurseNestedFields)({
                            promises,
                            data: data[field.name][i],
                            fields: block.fields,
                            req,
                            overrideAccess,
                            depth,
                            currentDepth,
                            showHiddenFields,
                        });
                    }
                });
            }
            if (field.type === 'array') {
                data[field.name].forEach((_, i) => {
                    (0, exports.recurseNestedFields)({
                        promises,
                        data: data[field.name][i],
                        fields: field.fields,
                        req,
                        overrideAccess,
                        depth,
                        currentDepth,
                        showHiddenFields,
                    });
                });
            }
        }
        if (field.type === 'richText' && Array.isArray(data[field.name])) {
            data[field.name].forEach((node) => {
                if (Array.isArray(node.children)) {
                    (0, relationshipPromise_1.recurseRichText)({
                        req,
                        children: node.children,
                        overrideAccess,
                        depth,
                        currentDepth,
                        field,
                        promises,
                        showHiddenFields,
                    });
                }
            });
        }
    });
};
exports.recurseNestedFields = recurseNestedFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdXJzZU5lc3RlZEZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9maWVsZHMvcmljaFRleHQvcmVjdXJzZU5lc3RlZEZpZWxkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBNEQ7QUFDNUQsMkNBQStGO0FBRS9GLHlDQUFzQztBQUN0QywrREFBd0Q7QUFhakQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQ2xDLFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLEdBQUcsRUFDSCxjQUFjLEdBQUcsS0FBSyxFQUN0QixLQUFLLEVBQ0wsWUFBWSxHQUFHLENBQUMsRUFDaEIsZ0JBQWdCLEdBQ1MsRUFBUSxFQUFFO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7UUFDdkIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1RCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO2dCQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3BELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3BELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN2RCxJQUFJLFVBQVUsRUFBRTtnQ0FDZCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVEsRUFBQztvQ0FDckIs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