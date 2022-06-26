"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseFields = void 0;
const promise_1 = require("./promise");
const traverseFields = ({ data, doc, fields, id, operation, overrideAccess, promises, req, siblingData, siblingDoc, }) => {
    fields.forEach((field) => {
        promises.push((0, promise_1.promise)({
            data,
            doc,
            field,
            id,
            operation,
            overrideAccess,
            promises,
            req,
            siblingData,
            siblingDoc,
        }));
    });
};
exports.traverseFields = traverseFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2VGaWVsZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2JlZm9yZVZhbGlkYXRlL3RyYXZlcnNlRmllbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUFvQztBQWU3QixNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQzdCLElBQUksRUFDSixHQUFHLEVBQ0gsTUFBTSxFQUNOLEVBQUUsRUFDRixTQUFTLEVBQ1QsY0FBYyxFQUNkLFFBQVEsRUFDUixHQUFHLEVBQ0gsV0FBVyxFQUNYLFVBQVUsR0FDTCxFQUFRLEVBQUU7SUFDZixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFBLGlCQUFPLEVBQUM7WUFDcEIsSUFBSTtZQUNKLEdBQUc7WUFDSCxLQUFLO1lBQ0wsRUFBRTtZQUNGLFNBQVM7WUFDVCxjQUFjO1lBQ2QsUUFBUTtZQUNSLEdBQUc7WUFDSCxXQUFXO1lBQ1gsVUFBVTtTQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUExQlcsUUFBQSxjQUFjLGtCQTBCekIifQ==