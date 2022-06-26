"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
const types_1 = require("../../config/types");
const traverseFields_1 = require("./traverseFields");
// This function is responsible for the following actions, in order:
// - Execute field hooks
const promise = async ({ data, doc, field, operation, promises, req, siblingData, siblingDoc, }) => {
    var _a;
    if ((0, types_1.fieldAffectsData)(field)) {
        // Execute hooks
        if ((_a = field.hooks) === null || _a === void 0 ? void 0 : _a.afterChange) {
            await field.hooks.afterChange.reduce(async (priorHook, currentHook) => {
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
                    siblingDoc[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
    }
    // Traverse subfields
    switch (field.type) {
        case 'group': {
            (0, traverseFields_1.traverseFields)({
                data,
                doc,
                fields: field.fields,
                operation,
                promises,
                req,
                siblingData: siblingData[field.name] || {},
                siblingDoc: siblingDoc[field.name],
            });
            break;
        }
        case 'array': {
            const rows = siblingDoc[field.name];
            if (Array.isArray(rows)) {
                rows.forEach((row, i) => {
                    var _a;
                    (0, traverseFields_1.traverseFields)({
                        data,
                        doc,
                        fields: field.fields,
                        operation,
                        promises,
                        req,
                        siblingData: ((_a = siblingData[field.name]) === null || _a === void 0 ? void 0 : _a[i]) || {},
                        siblingDoc: { ...row } || {},
                    });
                });
            }
            break;
        }
        case 'blocks': {
            const rows = siblingDoc[field.name];
            if (Array.isArray(rows)) {
                rows.forEach((row, i) => {
                    var _a;
                    const block = field.blocks.find((blockType) => blockType.slug === row.blockType);
                    if (block) {
                        (0, traverseFields_1.traverseFields)({
                            data,
                            doc,
                            fields: block.fields,
                            operation,
                            promises,
                            req,
                            siblingData: ((_a = siblingData[field.name]) === null || _a === void 0 ? void 0 : _a[i]) || {},
                            siblingDoc: { ...row } || {},
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
                operation,
                promises,
                req,
                siblingData: siblingData || {},
                siblingDoc: { ...siblingDoc },
            });
            break;
        }
        default: {
            break;
        }
    }
};
exports.promise = promise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9maWVsZHMvaG9va3MvYWZ0ZXJDaGFuZ2UvcHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4Q0FBNkQ7QUFDN0QscURBQWtEO0FBYWxELG9FQUFvRTtBQUNwRSx3QkFBd0I7QUFFakIsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEVBQzVCLElBQUksRUFDSixHQUFHLEVBQ0gsS0FBSyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1IsR0FBRyxFQUNILFdBQVcsRUFDWCxVQUFVLEdBQ0wsRUFBaUIsRUFBRTs7SUFDeEIsSUFBSSxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLGdCQUFnQjtRQUNoQixJQUFJLE1BQUEsS0FBSyxDQUFDLEtBQUssMENBQUUsV0FBVyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BFLE1BQU0sU0FBUyxDQUFDO2dCQUVoQixNQUFNLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQztvQkFDcEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUM5QixXQUFXLEVBQUUsR0FBRztvQkFDaEIsSUFBSTtvQkFDSixXQUFXO29CQUNYLFNBQVM7b0JBQ1QsR0FBRztpQkFDSixDQUFDLENBQUM7Z0JBRUgsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO29CQUM3QixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDdEM7WUFDSCxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdkI7S0FDRjtJQUVELHFCQUFxQjtJQUNyQixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxP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