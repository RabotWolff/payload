"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterChange = void 0;
const traverseFields_1 = require("./traverseFields");
const deepCopyObject_1 = __importDefault(require("../../../utilities/deepCopyObject"));
const afterChange = async ({ data, doc: incomingDoc, entityConfig, operation, req, }) => {
    const promises = [];
    const doc = (0, deepCopyObject_1.default)(incomingDoc);
    (0, traverseFields_1.traverseFields)({
        data,
        doc,
        fields: entityConfig.fields,
        operation,
        promises,
        req,
        siblingDoc: doc,
        siblingData: data,
    });
    await Promise.all(promises);
    return doc;
};
exports.afterChange = afterChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2FmdGVyQ2hhbmdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLHFEQUFrRDtBQUNsRCx1RkFBK0Q7QUFVeEQsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLEVBQ2hDLElBQUksRUFDSixHQUFHLEVBQUUsV0FBVyxFQUNoQixZQUFZLEVBQ1osU0FBUyxFQUNULEdBQUcsR0FDRSxFQUFvQyxFQUFFO0lBQzNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFBLHdCQUFjLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFFeEMsSUFBQSwrQkFBYyxFQUFDO1FBQ2IsSUFBSTtRQUNKLEdBQUc7UUFDSCxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07UUFDM0IsU0FBUztRQUNULFFBQVE7UUFDUixHQUFHO1FBQ0gsVUFBVSxFQUFFLEdBQUc7UUFDZixXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDLENBQUM7SUFFSCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7QUF6QlcsUUFBQSxXQUFXLGVBeUJ0QiJ9