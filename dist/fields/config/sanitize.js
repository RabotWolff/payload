"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatLabels_1 = require("../../utilities/formatLabels");
const errors_1 = require("../../errors");
const baseBlockFields_1 = require("../baseFields/baseBlockFields");
const validations_1 = __importDefault(require("../validations"));
const baseIDField_1 = require("../baseFields/baseIDField");
const types_1 = require("./types");
const withCondition_1 = __importDefault(require("../../admin/components/forms/withCondition"));
const sanitizeFields = (fields, validRelationships) => {
    if (!fields)
        return [];
    return fields.map((unsanitizedField) => {
        var _a, _b;
        const field = { ...unsanitizedField };
        if (!field.type)
            throw new errors_1.MissingFieldType(field);
        // Auto-label
        if ('name' in field && field.name && typeof field.label !== 'string' && field.label !== false) {
            field.label = (0, formatLabels_1.toWords)(field.name);
        }
        if (field.type === 'checkbox' && typeof field.defaultValue === 'undefined' && field.required === true) {
            field.defaultValue = false;
        }
        if (field.type === 'relationship' || field.type === 'upload') {
            const relationships = Array.isArray(field.relationTo) ? field.relationTo : [field.relationTo];
            relationships.forEach((relationship) => {
                if (!validRelationships.includes(relationship)) {
                    throw new errors_1.InvalidFieldRelationship(field, relationship);
                }
            });
        }
        if (field.type === 'blocks') {
            field.blocks = field.blocks.map((block) => ({ ...block, fields: block.fields.concat(baseBlockFields_1.baseBlockFields) }));
        }
        if (field.type === 'array') {
            field.fields.push(baseIDField_1.baseIDField);
        }
        if ((field.type === 'blocks' || field.type === 'array') && field.label !== false) {
            field.labels = field.labels || (0, formatLabels_1.formatLabels)(field.name);
        }
        if ((0, types_1.fieldAffectsData)(field)) {
            if (typeof field.validate === 'undefined') {
                const defaultValidate = validations_1.default[field.type];
                if (defaultValidate) {
                    field.validate = (val, options) => defaultValidate(val, { ...field, ...options });
                }
                else {
                    field.validate = () => true;
                }
            }
            if (!field.hooks)
                field.hooks = {};
            if (!field.access)
                field.access = {};
        }
        if (field.admin) {
            if (field.admin.condition && ((_a = field.admin.components) === null || _a === void 0 ? void 0 : _a.Field)) {
                field.admin.components.Field = (0, withCondition_1.default)((_b = field.admin.components) === null || _b === void 0 ? void 0 : _b.Field);
            }
        }
        else {
            field.admin = {};
        }
        if ('fields' in field && field.fields)
            field.fields = sanitizeFields(field.fields, validRelationships);
        if ('blocks' in field && field.blocks) {
            field.blocks = field.blocks.map((block) => {
                const unsanitizedBlock = { ...block };
                unsanitizedBlock.labels = !unsanitizedBlock.labels ? (0, formatLabels_1.formatLabels)(unsanitizedBlock.slug) : unsanitizedBlock.labels;
                unsanitizedBlock.fields = sanitizeFields(block.fields, validRelationships);
                return unsanitizedBlock;
            });
        }
        return field;
    });
};
exports.default = sanitizeFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmllbGRzL2NvbmZpZy9zYW5pdGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFxRTtBQUNyRSx5Q0FBMEU7QUFDMUUsbUVBQWdFO0FBQ2hFLGlFQUF5QztBQUN6QywyREFBd0Q7QUFDeEQsbUNBQWtEO0FBQ2xELCtGQUF1RTtBQUV2RSxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQWUsRUFBRSxrQkFBNEIsRUFBVyxFQUFFO0lBQ2hGLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFdkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTs7UUFDckMsTUFBTSxLQUFLLEdBQVUsRUFBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQUUsTUFBTSxJQUFJLHlCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELGFBQWE7UUFDYixJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQzdGLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBQSxzQkFBTyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyRyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFR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