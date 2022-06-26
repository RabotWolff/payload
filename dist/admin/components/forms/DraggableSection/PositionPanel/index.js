import React from 'react';
import Button from '../../../elements/Button';
import './index.scss';
const baseClass = 'position-panel';
const PositionPanel = (props) => {
    const { moveRow, positionIndex, rowCount, readOnly } = props;
    const adjustedIndex = positionIndex + 1;
    const classes = [
        baseClass,
        `${baseClass}__${readOnly ? 'read-only' : ''}`,
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes },
        !readOnly && (React.createElement(Button, { className: `${baseClass}__move-backward ${positionIndex === 0 ? 'first-row' : ''}`, buttonStyle: "none", icon: "chevron", round: true, onClick: () => moveRow(positionIndex, positionIndex - 1) })),
        (adjustedIndex && typeof positionIndex === 'number')
            && (React.createElement("div", { className: `${baseClass}__current-position` }, adjustedIndex >= 10 ? adjustedIndex : `0${adjustedIndex}`)),
        !readOnly && (React.createElement(Button, { className: `${baseClass}__move-forward ${(positionIndex === rowCount - 1) ? 'last-row' : ''}`, buttonStyle: "none", icon: "chevron", round: true, onClick: () => moveRow(positionIndex, positionIndex + 1) }))));
};
export default PositionPanel;
