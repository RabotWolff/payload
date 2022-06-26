"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeValidate = void 0;
const traverseFields_1 = require("./traverseFields");
const deepCopyObject_1 = __importDefault(require("../../../utilities/deepCopyObject"));
const beforeValidate = async ({ data: incomingData, doc, entityConfig, id, operation, overrideAccess, req, }) => {
    const promises = [];
    const data = (0, deepCopyObject_1.default)(incomingData);
    (0, traverseFields_1.traverseFields)({
        data,
        doc,
        fields: entityConfig.fields,
        id,
        operation,
        overrideAccess,
        promises,
        req,
        siblingData: data,
        siblingDoc: doc,
    });
    await Promise.all(promises);
    return data;
};
exports.beforeValidate = beforeValidate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2JlZm9yZVZhbGlkYXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLHFEQUFrRDtBQUNsRCx1RkFBK0Q7QUFZeEQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQ25DLElBQUksRUFBRSxZQUFZLEVBQ2xCLEdBQUcsRUFDSCxZQUFZLEVBQ1osRUFBRSxFQUNGLFNBQVMsRUFDVCxjQUFjLEVBQ2QsR0FBRyxHQUNFLEVBQW9DLEVBQUU7SUFDM0MsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUEsd0JBQWMsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUUxQyxJQUFBLCtCQUFjLEVBQUM7UUFDYixJQUFJO1FBQ0osR0FBRztRQUNILE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtRQUMzQixFQUFFO1FBQ0YsU0FBUztRQUNULGNBQWM7UUFDZCxRQUFRO1FBQ1IsR0FBRztRQUNILFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFVBQVUsRUFBRSxHQUFHO0tBQ2hCLENBQUMsQ0FBQztJQUVILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1QixPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQTVCVyxRQUFBLGNBQWMsa0JBNEJ6QiJ9