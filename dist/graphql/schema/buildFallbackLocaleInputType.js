"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const buildFallbackLocaleInputType = (localization) => new graphql_1.GraphQLEnumType({
    name: 'FallbackLocaleInputType',
    values: [...localization.locales, 'none'].reduce((values, locale) => ({
        ...values,
        [locale]: {
            value: locale,
        },
    }), {}),
});
exports.default = buildFallbackLocaleInputType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRGYWxsYmFja0xvY2FsZUlucHV0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3NjaGVtYS9idWlsZEZhbGxiYWNrTG9jYWxlSW5wdXRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQTBDO0FBRzFDLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxZQUFnQyxFQUFtQixFQUFFLENBQUMsSUFBSSx5QkFBZSxDQUFDO0lBQzlHLElBQUksRUFBRSx5QkFBeUI7SUFDL0IsTUFBTSxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsR0FBRyxNQUFNO1FBQ1QsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNSLEtBQUssRUFBRSxNQUFNO1NBQ2Q7S0FDRixDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQ1IsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsNEJBQTRCLENBQUMifQ==