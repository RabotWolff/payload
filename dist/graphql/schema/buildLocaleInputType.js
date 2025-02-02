"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const buildLocaleInputType = (localization) => new graphql_1.GraphQLEnumType({
    name: 'LocaleInputType',
    values: localization.locales.reduce((values, locale) => ({
        ...values,
        [locale]: {
            value: locale,
        },
    }), {}),
});
exports.default = buildLocaleInputType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRMb2NhbGVJbnB1dFR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9zY2hlbWEvYnVpbGRMb2NhbGVJbnB1dFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBMEM7QUFHMUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFlBQWdDLEVBQW1CLEVBQUUsQ0FBQyxJQUFJLHlCQUFlLENBQUM7SUFDdEcsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixNQUFNLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELEdBQUcsTUFBTTtRQUNULENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDUixLQUFLLEVBQUUsTUFBTTtTQUNkO0tBQ0YsQ0FBQyxFQUFFLEVBQUUsQ0FBQztDQUNSLENBQUMsQ0FBQztBQUVILGtCQUFlLG9CQUFvQixDQUFDIn0=