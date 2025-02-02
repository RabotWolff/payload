import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Draggable } from 'react-beautiful-dnd';
import ActionPanel from './ActionPanel';
import SectionTitle from './SectionTitle';
import PositionPanel from './PositionPanel';
import Button from '../../elements/Button';
import { NegativeFieldGutterProvider } from '../FieldTypeGutter/context';
import FieldTypeGutter from '../FieldTypeGutter';
import RenderFields from '../RenderFields';
import HiddenInput from '../field-types/HiddenInput';
import './index.scss';
import { fieldAffectsData } from '../../../../fields/config/types';
const baseClass = 'draggable-section';
const DraggableSection = (props) => {
    const { moveRow, addRow, removeRow, rowIndex, rowCount, parentPath, fieldSchema, label, blockType, fieldTypes, id, setRowCollapse, isCollapsed, permissions, readOnly, hasMaxRows, } = props;
    const [isHovered, setIsHovered] = useState(false);
    const classes = [
        baseClass,
        isCollapsed ? 'is-collapsed' : 'is-open',
        (isHovered && !readOnly) && 'is-hovered',
    ].filter(Boolean).join(' ');
    return (React.createElement(Draggable, { draggableId: id, index: rowIndex, isDragDisabled: readOnly }, (providedDrag) => (React.createElement("div", { ref: providedDrag.innerRef, className: classes, onMouseLeave: () => setIsHovered(false), onMouseOver: () => setIsHovered(true), onFocus: () => setIsHovered(true), ...providedDrag.draggableProps },
        React.createElement("div", { className: `${baseClass}__content-wrapper` },
            React.createElement(FieldTypeGutter, { variant: "left", dragHandleProps: providedDrag.dragHandleProps },
                React.createElement(PositionPanel, { moveRow: moveRow, rowCount: rowCount, positionIndex: rowIndex, readOnly: readOnly })),
            React.createElement("div", { className: `${baseClass}__render-fields-wrapper` },
                blockType === 'blocks' && (React.createElement("div", { className: `${baseClass}__section-header` },
                    React.createElement(HiddenInput, { name: `${parentPath}.${rowIndex}.id`, value: id }),
                    React.createElement(SectionTitle, { label: label, path: `${parentPath}.${rowIndex}.blockName`, readOnly: readOnly }),
                    React.createElement(Button, { icon: "chevron", onClick: () => setRowCollapse(id, !isCollapsed), buttonStyle: "icon-label", className: `toggle-collapse toggle-collapse--is-${isCollapsed ? 'collapsed' : 'open'}`, round: true }))),
                React.createElement(AnimateHeight, { height: isCollapsed ? 0 : 'auto', duration: 200 },
                    React.createElement(NegativeFieldGutterProvider, { allow: false },
                        React.createElement(RenderFields, { readOnly: readOnly, fieldTypes: fieldTypes, key: rowIndex, permissions: permissions === null || permissions === void 0 ? void 0 : permissions.fields, fieldSchema: fieldSchema.map((field) => ({
                                ...field,
                                path: `${parentPath}.${rowIndex}${fieldAffectsData(field) ? `.${field.name}` : ''}`,
                            })) })))),
            React.createElement(FieldTypeGutter, { variant: "right", className: "actions", dragHandleProps: providedDrag.dragHandleProps }, !readOnly && (React.createElement(ActionPanel, { addRow: addRow, removeRow: removeRow, rowIndex: rowIndex, label: label, isHovered: isHovered, hasMaxRows: hasMaxRows, ...props }))))))));
};
export default DraggableSection;
