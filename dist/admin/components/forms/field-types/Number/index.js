import React, { useCallback } from 'react';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import withCondition from '../../withCondition';
import { number } from '../../../../../fields/validations';
import './index.scss';
const NumberField = (props) => {
    const { name, path: pathFromProps, required, validate = number, label, max, min, admin: { readOnly, style, className, width, step, placeholder, description, condition, } = {}, } = props;
    const path = pathFromProps || name;
    const memoizedValidate = useCallback((value, options) => {
        return validate(value, { ...options, min, max, required });
    }, [validate, min, max, required]);
    const { value, showError, setValue, errorMessage, } = useField({
        path,
        validate: memoizedValidate,
        enableDebouncedValue: true,
        condition,
    });
    const handleChange = useCallback((e) => {
        const val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            setValue('');
        }
        else {
            setValue(val);
        }
    }, [setValue]);
    const classes = [
        'field-type',
        'number',
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes, style: {
            ...style,
            width,
        } },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement(Label, { htmlFor: path, label: label, required: required }),
        React.createElement("input", { value: typeof value === 'number' ? value : '', onChange: handleChange, disabled: readOnly, placeholder: placeholder, type: "number", id: path, name: path, step: step }),
        React.createElement(FieldDescription, { value: value, description: description })));
};
export default withCondition(NumberField);
