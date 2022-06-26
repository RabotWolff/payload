"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatName_1 = __importDefault(require("../utilities/formatName"));
const buildObjectType_1 = __importDefault(require("./buildObjectType"));
function buildBlockType(payload, block) {
    const { slug, labels: { singular, }, } = block;
    if (!payload.types.blockTypes[slug]) {
        const formattedBlockName = (0, formatName_1.default)(singular);
        payload.types.blockTypes[slug] = (0, buildObjectType_1.default)(payload, formattedBlockName, [
            ...block.fields,
            {
                name: 'blockType',
                type: 'text',
            },
        ], formattedBlockName);
    }
}
exports.default = buildBlockType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRCbG9ja1R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9zY2hlbWEvYnVpbGRCbG9ja1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx5RUFBaUQ7QUFDakQsd0VBQWdEO0FBRWhELFNBQVMsY0FBYyxDQUFDLE9BQWdCLEVBQUUsS0FBWTtJQUNwRCxNQUFNLEVBQ0osSUFBSSxFQUNKLE1BQU0sRUFBRSxFQUNOLFFBQVEsR0FDVCxHQUNGLEdBQUcsS0FBSyxDQUFDO0lBRVYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxvQkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEseUJBQWUsRUFDOUMsT0FBTyxFQUNQLGtCQUFrQixFQUNsQjtZQUNFLEdBQUcsS0FBSyxDQUFDLE1BQU07WUFDZjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLE1BQU07YUFDYjtTQUNGLEVBQ0Qsa0JBQWtCLENBQ25CLENBQUM7S0FDSDtBQUNILENBQUM7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==