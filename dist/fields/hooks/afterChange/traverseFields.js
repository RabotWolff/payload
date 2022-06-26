"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseFields = void 0;
const promise_1 = require("./promise");
const traverseFields = ({ data, doc, fields, operation, promises, req, siblingData, siblingDoc, }) => {
    fields.forEach((field) => {
        promises.push((0, promise_1.promise)({
            data,
            doc,
            field,
            operation,
            promises,
            req,
            siblingData,
            siblingDoc,
        }));
    });
};
exports.traverseFields = traverseFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2VGaWVsZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2FmdGVyQ2hhbmdlL3RyYXZlcnNlRmllbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFvQztBQWM3QixNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQzdCLElBQUksRUFDSixHQUFHLEVBQ0gsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsR0FBRyxFQUNILFdBQVcsRUFDWCxVQUFVLEdBQ0wsRUFBUSxFQUFFO0lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSxpQkFBTyxFQUFDO1lBQ3BCLElBQUk7WUFDSixHQUFHO1lBQ0gsS0FBSztZQUNMLFNBQVM7WUFDVCxRQUFRO1lBQ1IsR0FBRztZQUNILFdBQVc7WUFDWCxVQUFVO1NBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQXRCVyxRQUFBLGNBQWMsa0JBc0J6QiJ9