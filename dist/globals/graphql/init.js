"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const graphql_1 = require("graphql");
const formatName_1 = __importDefault(require("../../graphql/utilities/formatName"));
const buildGlobalFields_1 = require("../../versions/buildGlobalFields");
const buildPaginatedListType_1 = __importDefault(require("../../graphql/schema/buildPaginatedListType"));
const findOne_1 = __importDefault(require("./resolvers/findOne"));
const update_1 = __importDefault(require("./resolvers/update"));
const findVersionByID_1 = __importDefault(require("./resolvers/findVersionByID"));
const findVersions_1 = __importDefault(require("./resolvers/findVersions"));
const restoreVersion_1 = __importDefault(require("./resolvers/restoreVersion"));
const buildObjectType_1 = __importDefault(require("../../graphql/schema/buildObjectType"));
const buildMutationInputType_1 = __importDefault(require("../../graphql/schema/buildMutationInputType"));
const buildWhereInputType_1 = __importDefault(require("../../graphql/schema/buildWhereInputType"));
function initGlobalsGraphQL(payload) {
    if (payload.config.globals) {
        Object.keys(payload.globals.config).forEach((slug) => {
            const global = payload.globals.config[slug];
            const { label, fields, } = global;
            const formattedLabel = (0, formatName_1.default)(label);
            global.graphQL = {};
            global.graphQL.type = (0, buildObjectType_1.default)(payload, formattedLabel, fields, formattedLabel);
            global.graphQL.mutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, formattedLabel, fields, formattedLabel));
            payload.Query.fields[formattedLabel] = {
                type: global.graphQL.type,
                args: {
                    draft: { type: graphql_1.GraphQLBoolean },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                },
                resolve: (0, findOne_1.default)(global),
            };
            payload.Mutation.fields[`update${formattedLabel}`] = {
                type: global.graphQL.type,
                args: {
                    data: { type: global.graphQL.mutationInputType },
                    draft: { type: graphql_1.GraphQLBoolean },
                },
                resolve: (0, update_1.default)(global),
            };
            if (global.versions) {
                const versionGlobalFields = [
                    ...(0, buildGlobalFields_1.buildVersionGlobalFields)(global),
                    {
                        name: 'id',
                        type: 'text',
                    },
                    {
                        name: 'createdAt',
                        label: 'Created At',
                        type: 'date',
                    },
                    {
                        name: 'updatedAt',
                        label: 'Updated At',
                        type: 'date',
                    },
                ];
                global.graphQL.versionType = (0, buildObjectType_1.default)(payload, `${formattedLabel}Version`, versionGlobalFields, `${formattedLabel}Version`, {});
                payload.Query.fields[`version${(0, formatName_1.default)(formattedLabel)}`] = {
                    type: global.graphQL.versionType,
                    args: {
                        id: { type: graphql_1.GraphQLString },
                        ...(payload.config.localization ? {
                            locale: { type: payload.types.localeInputType },
                            fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                        } : {}),
                    },
                    resolve: (0, findVersionByID_1.default)(global),
                };
                payload.Query.fields[`versions${formattedLabel}`] = {
                    type: (0, buildPaginatedListType_1.default)(`versions${(0, formatName_1.default)(formattedLabel)}`, global.graphQL.versionType),
                    args: {
                        where: {
                            type: (0, buildWhereInputType_1.default)(`versions${formattedLabel}`, versionGlobalFields, `versions${formattedLabel}`),
                        },
                        ...(payload.config.localization ? {
                            locale: { type: payload.types.localeInputType },
                            fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                        } : {}),
                        page: { type: graphql_1.GraphQLInt },
                        limit: { type: graphql_1.GraphQLInt },
                        sort: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, findVersions_1.default)(global),
                };
                payload.Mutation.fields[`restoreVersion${(0, formatName_1.default)(formattedLabel)}`] = {
                    type: global.graphQL.type,
                    args: {
                        id: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, restoreVersion_1.default)(global),
                };
            }
        });
    }
}
exports.default = initGlobalsGraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWxzL2dyYXBocWwvaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNDQUFzQztBQUN0QyxxQ0FBb0Y7QUFDcEYsb0ZBQTREO0FBQzVELHdFQUE0RTtBQUM1RSx5R0FBaUY7QUFDakYsa0VBQWtEO0FBQ2xELGdFQUFnRDtBQUNoRCxrRkFBa0U7QUFDbEUsNEVBQTREO0FBQzVELGdGQUFnRTtBQUVoRSwyRkFBbUU7QUFDbkUseUdBQWlGO0FBQ2pGLG1HQUEyRTtBQUczRSxTQUFTLGtCQUFrQixDQUFDLE9BQWdCO0lBQzFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25ELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLE1BQU0sRUFDSixLQUFLLEVBQ0wsTUFBTSxHQUNQLEdBQUcsTUFBTSxDQUFDO1lBRVgsTUFBTSxjQUFjLEdBQUcsSUFBQSxvQkFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRXBCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUEseUJBQWUsRUFDbkMsT0FBTyxFQUNQLGNBQWMsRUFDZCxNQUFNLEVBQ04sY0FBYyxDQUNmLENBQUM7WUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksd0JBQWMsQ0FBQyxJQUFBLGdDQUFzQixFQUMxRSxPQUFPLEVBQ1AsY0FBYyxFQUNkLE1BQU0sRUFDTixjQUFjLENBQ2YsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUc7Z0JBQ3JDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3pCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQWMsRUFBRTtvQkFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO3dCQUMvQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRTtxQkFDaEUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUNSO2dCQUNELE9BQU8sRUFBRSxJQUFBLGlCQUFlLEVBQUMsTUFBTSxDQUFDO2FBQ2pDLENBQUM7WUFFRixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLGNBQWMsRUFBRSxDQUFDLEdBQUc7Z0JBQ25ELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3pCLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtvQkFDaEQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFjLEVBQUU7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxJQUFBLGdCQUFjLEVBQUMsTUFBTSxDQUFDO2FBQ2hDLENBQUM7WUFFRixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLE1BQU0sbUJBQW1CLEdBQVk7b0JBQ25DLEdBQUcsSUFBQSw0Q0FBd0IsRUFBQyxNQUFNLENBQUM7b0JBQ25DO3dCQUNFLElBQUksRUFBRSxJQUFJO3dCQUNWLElBQUksRUFBRSxNQUFNO3FCQUNiO29CQUNEO3dCQUNFLElBQUksRUFBRSxXQUFXO3dCQUNqQixLQUFLLEVBQUUsWUFBWTt3QkFDbkIsSUFBSSxFQUFFLE1BQU07cUJBQ2I7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLEtBQUssRUFBRSxZQUFZO3dCQUNuQixJQUFJLEVBQUUsTUFBTTtxQkFDYjtpQkFDRixDQUFDO2dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUEseUJBQWUsRUFDMUMsT0FBTyxFQUNQLEdBQUcsY0FBYyxTQUFTLEVBQzFCLG1CQUFtQixFQUNuQixHQUFHLGNBQWMsU0FBUyxFQUMxQixFQUFFLENBQ0gsQ0FBQztnQkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUEsb0JBQVUsRUFBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEdBQUc7b0JBQzdELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7b0JBQ2hDLElBQUksRUFBRTt3QkFDSixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTt3QkFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs0QkFDaEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFOzRCQUMvQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRTt5QkFDaEUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUNSO29CQUNELE9BQU8sRUFBRSxJQUFBLHlCQUF1QixFQUFDLE1BQU0sQ0FBQztpQkFDekMsQ0FBQztnQkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLGNBQWMsRUFBRSxDQUFDLEdBQUc7b0JBQ2xELElBQUksRUFBRSxJQUFBLGdDQUFzQixFQUFDLFdBQVcsSUFBQSxvQkFBVSxFQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7b0JBQ2pHLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLElBQUEsNkJBQW1CLEVBQ3ZCLFdBQVcsY0FBYyxFQUFFLEVBQzNCLG1CQUFtQixFQUNuQixXQUFXLGNBQWMsRUFBRSxDQUM1Qjt5QkFDRjt3QkFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7NEJBQy9DLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFO3lCQUNoRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ1AsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFVLEVBQUU7d0JBQzFCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBVSxFQUFFO3dCQUMzQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTtxQkFDOUI7b0JBQ0QsT0FBTyxFQUFFLElBQUEsc0JBQW9CLEVBQUMsTUFBTSxDQUFDO2lCQUN0QyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixJQUFBLG9CQUFVLEVBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxHQUFHO29CQUN2RSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7cUJBQzVCO29CQUNELE9BQU8sRUFBRSxJQUFBLHdCQUFzQixFQUFDLE1BQU0sQ0FBQztpQkFDeEMsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQyJ9