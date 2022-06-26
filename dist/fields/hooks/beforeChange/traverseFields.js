"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseFields = void 0;
const promise_1 = require("./promise");
const traverseFields = ({ data, doc, docWithLocales, errors, fields, id, mergeLocaleActions, operation, path, promises, req, siblingData, siblingDoc, siblingDocWithLocales, skipValidation, }) => {
    fields.forEach((field) => {
        promises.push((0, promise_1.promise)({
            data,
            doc,
            docWithLocales,
            errors,
            field,
            id,
            mergeLocaleActions,
            operation,
            path,
            promises,
            req,
            siblingData,
            siblingDoc,
            siblingDocWithLocales,
            skipValidation,
        }));
    });
};
exports.traverseFields = traverseFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2VGaWVsZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2JlZm9yZUNoYW5nZS90cmF2ZXJzZUZpZWxkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBb0M7QUFzQjdCLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFDN0IsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEVBQ2QsTUFBTSxFQUNOLE1BQU0sRUFDTixFQUFFLEVBQ0Ysa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxJQUFJLEVBQ0osUUFBUSxFQUNSLEdBQUcsRUFDSCxXQUFXLEVBQ1gsVUFBVSxFQUNWLHFCQUFxQixFQUNyQixjQUFjLEdBQ1QsRUFBUSxFQUFFO0lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSxpQkFBTyxFQUFDO1lBQ3BCLElBQUk7WUFDSixHQUFHO1lBQ0gsY0FBYztZQUNkLE1BQU07WUFDTixLQUFLO1lBQ0wsRUFBRTtZQUNGLGtCQUFrQjtZQUNsQixTQUFTO1lBQ1QsSUFBSTtZQUNKLFFBQVE7WUFDUixHQUFHO1lBQ0gsV0FBVztZQUNYLFVBQVU7WUFDVixxQkFBcUI7WUFDckIsY0FBYztTQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFwQ1csUUFBQSxjQUFjLGtCQW9DekIifQ==