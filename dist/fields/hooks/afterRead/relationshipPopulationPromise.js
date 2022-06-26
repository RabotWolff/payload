"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../config/types");
const populate = async ({ depth, currentDepth, req, overrideAccess, dataReference, data, field, index, showHiddenFields, }) => {
    const dataToUpdate = dataReference;
    const relation = Array.isArray(field.relationTo) ? data.relationTo : field.relationTo;
    const relatedCollection = req.payload.collections[relation];
    if (relatedCollection) {
        let idString = Array.isArray(field.relationTo) ? data.value : data;
        if (typeof idString !== 'string' && typeof (idString === null || idString === void 0 ? void 0 : idString.toString) === 'function') {
            idString = idString.toString();
        }
        let populatedRelationship;
        if (depth && currentDepth <= depth) {
            populatedRelationship = await req.payload.findByID({
                req,
                collection: relatedCollection.config.slug,
                id: idString,
                currentDepth: currentDepth + 1,
                overrideAccess: typeof overrideAccess === 'undefined' ? false : overrideAccess,
                disableErrors: true,
                depth,
                showHiddenFields,
            });
        }
        // If populatedRelationship comes back, update value
        if (populatedRelationship || populatedRelationship === null) {
            if (typeof index === 'number') {
                if (Array.isArray(field.relationTo)) {
                    dataToUpdate[field.name][index].value = populatedRelationship;
                }
                else {
                    dataToUpdate[field.name][index] = populatedRelationship;
                }
            }
            else if (Array.isArray(field.relationTo)) {
                dataToUpdate[field.name].value = populatedRelationship;
            }
            else {
                dataToUpdate[field.name] = populatedRelationship;
            }
        }
    }
};
const relationshipPopulationPromise = async ({ siblingDoc, field, depth, currentDepth, req, overrideAccess, showHiddenFields, }) => {
    const resultingDoc = siblingDoc;
    const populateDepth = (0, types_1.fieldHasMaxDepth)(field) && field.maxDepth < depth ? field.maxDepth : depth;
    if ((0, types_1.fieldSupportsMany)(field) && field.hasMany && Array.isArray(siblingDoc[field.name])) {
        const rowPromises = [];
        siblingDoc[field.name].forEach((relatedDoc, index) => {
            const rowPromise = async () => {
                if (relatedDoc) {
                    await populate({
                        depth: populateDepth,
                        currentDepth,
                        req,
                        overrideAccess,
                        data: relatedDoc,
                        dataReference: resultingDoc,
                        field,
                        index,
                        showHiddenFields,
                    });
                }
            };
            rowPromises.push(rowPromise());
        });
        await Promise.all(rowPromises);
    }
    else if (siblingDoc[field.name]) {
        await populate({
            depth: populateDepth,
            currentDepth,
            req,
            overrideAccess,
            dataReference: resultingDoc,
            data: siblingDoc[field.name],
            field,
            showHiddenFields,
        });
    }
};
exports.default = relationshipPopulationPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb25zaGlwUG9wdWxhdGlvblByb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2FmdGVyUmVhZC9yZWxhdGlvbnNoaXBQb3B1bGF0aW9uUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUF5RztBQWN6RyxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsRUFDdEIsS0FBSyxFQUNMLFlBQVksRUFDWixHQUFHLEVBQ0gsY0FBYyxFQUNkLGFBQWEsRUFDYixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxnQkFBZ0IsR0FDSCxFQUFFLEVBQUU7SUFDakIsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDO0lBRW5DLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsVUFBcUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNsRyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTVELElBQUksaUJBQWlCLEVBQUU7UUFDckIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVuRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQSxLQUFLLFVBQVUsRUFBRTtZQUM1RSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxxQkFBcUIsQ0FBQztRQUUxQixJQUFJLEtBQUssSUFBSSxZQUFZLElBQUks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