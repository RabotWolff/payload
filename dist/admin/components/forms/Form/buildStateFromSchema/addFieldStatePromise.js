/* eslint-disable no-param-reassign */
import ObjectID from 'bson-objectid';
import { fieldAffectsData, fieldHasSubFields } from '../../../../../fields/config/types';
import getValueWithDefault from '../../../../../fields/getDefaultValue';
import { iterateFields } from './iterateFields';
export const addFieldStatePromise = async ({ field, locale, user, state, path, passesCondition, fullData, data, fieldPromises, id, operation, }) => {
    var _a;
    if (fieldAffectsData(field)) {
        const fieldState = {
            valid: true,
            value: undefined,
            initialValue: undefined,
            validate: field.validate,
            condition: (_a = field.admin) === null || _a === void 0 ? void 0 : _a.condition,
            passesCondition,
        };
        const valueWithDefault = await getValueWithDefault({ value: data === null || data === void 0 ? void 0 : data[field.name], defaultValue: field.defaultValue, locale, user });
        if (data === null || data === void 0 ? void 0 : data[field.name]) {
            data[field.name] = valueWithDefault;
        }
        let validationResult = true;
        if (typeof fieldState.validate === 'function') {
            validationResult = await fieldState.validate(data === null || data === void 0 ? void 0 : data[field.name], {
                ...field,
                data: fullData,
                user,
                siblingData: data,
                id,
                operation,
            });
        }
        if (typeof validationResult === 'string') {
            fieldState.errorMessage = validationResult;
            fieldState.valid = false;
        }
        else {
            fieldState.valid = true;
        }
        switch (field.type) {
            case 'array': {
                const arrayValue = Array.isArray(valueWithDefault) ? valueWithDefault : [];
                arrayValue.forEach((row, i) => {
                    const rowPath = `${path}${field.name}.${i}.`;
                    state[`${rowPath}id`] = {
                        value: row.id,
                        initialValue: row.id || new ObjectID().toHexString(),
                        valid: true,
                    };
                    iterateFields({
                        state,
                        fields: field.fields,
                        data: row,
                        parentPassesCondition: passesCondition,
                        path: rowPath,
                        user,
                        fieldPromises,
                        fullData,
                        id,
                        locale,
                        operation,
                    });
                });
                // Add values to field state
                fieldState.value = arrayValue.length;
                fieldState.initialValue = arrayValue.length;
                if (arrayValue.length > 0) {
                    fieldState.disableFormData = true;
                }
                // Add field to state
                state[`${path}${field.name}`] = fieldState;
                break;
            }
            case 'blocks': {
                const blocksValue = Array.isArray(valueWithDefault) ? valueWithDefault : [];
                blocksValue.forEach((row, i) => {
                    const block = field.blocks.find((blockType) => blockType.slug === row.blockType);
                    const rowPath = `${path}${field.name}.${i}.`;
                    if (block) {
                        state[`${rowPath}id`] = {
                            value: row.id,
                            initialValue: row.id || new ObjectID().toHexString(),
                            valid: true,
                        };
                        state[`${rowPath}blockType`] = {
                            value: row.blockType,
                            initialValue: row.blockType,
                            valid: true,
                        };
                        state[`${rowPath}blockName`] = {
                            value: row.blockName,
                            initialValue: row.blockName,
                            valid: true,
                        };
                        iterateFields({
                            state,
                            fields: block.fields,
                            data: row,
                            fullData,
                            parentPassesCondition: passesCondition,
                            path: rowPath,
                            user,
                            locale,
                            operation,
                            fieldPromises,
                            id,
                        });
                    }
                });
                // Add values to field state
                fieldState.value = blocksValue.length;
                fieldState.initialValue = blocksValue.length;
                if (blocksValue.length > 0) {
                    fieldState.disableFormData = true;
                }
                // Add field to state
                state[`${path}${field.name}`] = fieldState;
                break;
            }
            case 'group': {
                iterateFields({
                    state,
                    id,
                    operation,
                    fieldPromises,
                    fields: field.fields,
                    data: data === null || data === void 0 ? void 0 : data[field.name],
                    fullData,
                    parentPassesCondition: passesCondition,
                    path: `${path}${field.name}.`,
                    locale,
                    user,
                });
                break;
            }
            default: {
                fieldState.value = valueWithDefault;
                fieldState.initialValue = valueWithDefault;
                // Add field to state
                state[`${path}${field.name}`] = fieldState;
                break;
            }
        }
    }
    else if (fieldHasSubFields(field)) {
        // Handle field types that do not use names (row, etc)
        iterateFields({
            state,
            fields: field.fields,
            data,
            parentPassesCondition: passesCondition,
            path,
            user,
            fieldPromises,
            fullData,
            id,
            locale,
            operation,
        });
    }
};
