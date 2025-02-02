import React from 'react';
import './index.scss';
const baseClass = 'table';
const Table = ({ columns, data }) => {
    if (columns && columns.length > 0) {
        return (React.createElement("div", { className: baseClass },
            React.createElement("table", { cellPadding: "0", cellSpacing: "0" },
                React.createElement("thead", null,
                    React.createElement("tr", null, columns.map((col, i) => (React.createElement("th", { key: i }, col.components.Heading))))),
                React.createElement("tbody", null, data && data.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex }, columns.map((col, colIndex) => (React.createElement("td", { key: colIndex }, col.components.renderCell(row, row[col.accessor])))))))))));
    }
    return null;
};
export default Table;
