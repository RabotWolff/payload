import React, { useState, useEffect } from 'react';
import { useConfig } from '../../../../../../utilities/Config';
const RelationshipCell = (props) => {
    const { field, data: cellData } = props;
    const { relationTo } = field;
    const { collections } = useConfig();
    const [data, setData] = useState();
    useEffect(() => {
        const hasManyRelations = Array.isArray(relationTo);
        if (cellData) {
            if (Array.isArray(cellData)) {
                setData(cellData.reduce((newData, value) => {
                    const relation = hasManyRelations ? value === null || value === void 0 ? void 0 : value.relationTo : relationTo;
                    const doc = hasManyRelations ? value.value : value;
                    const collection = collections.find((coll) => coll.slug === relation);
                    if (collection) {
                        const useAsTitle = collection.admin.useAsTitle ? collection.admin.useAsTitle : 'id';
                        return newData ? `${newData}, ${doc === null || doc === void 0 ? void 0 : doc[useAsTitle]}` : doc === null || doc === void 0 ? void 0 : doc[useAsTitle];
                    }
                    return newData;
                }, ''));
            }
            else {
                const relation = hasManyRelations ? cellData === null || cellData === void 0 ? void 0 : cellData.relationTo : relationTo;
                const doc = hasManyRelations ? cellData.value : cellData;
                const collection = collections.find((coll) => coll.slug === relation);
                if (collection && doc) {
                    const useAsTitle = collection.admin.useAsTitle ? collection.admin.useAsTitle : 'id';
                    setData(doc[useAsTitle]);
                }
            }
        }
    }, [cellData, relationTo, field, collections]);
    return (React.createElement(React.Fragment, null, data));
};
export default RelationshipCell;
