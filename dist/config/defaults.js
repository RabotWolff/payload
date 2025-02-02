"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
const path_1 = __importDefault(require("path"));
exports.defaults = {
    serverURL: '',
    defaultDepth: 2,
    maxDepth: 10,
    collections: [],
    globals: [],
    cookiePrefix: 'payload',
    csrf: [],
    cors: [],
    admin: {
        meta: {
            titleSuffix: '- Payload',
        },
        disable: false,
        indexHTML: path_1.default.resolve(__dirname, '../admin/index.html'),
        components: {},
        css: path_1.default.resolve(__dirname, '../admin/scss/custom.css'),
        scss: path_1.default.resolve(__dirname, '../admin/scss/overrides.scss'),
        dateFormat: 'MMMM do yyyy, h:mm a',
    },
    typescript: {
        outputFile: `${typeof (process === null || process === void 0 ? void 0 : process.cwd) === 'function' ? process.cwd() : ''}/payload-types.ts`,
    },
    upload: {},
    graphQL: {
        maxComplexity: 1000,
        disablePlaygroundInProduction: true,
    },
    routes: {
        admin: '/admin',
        api: '/api',
        graphQL: '/graphql',
        graphQLPlayground: '/graphql-playground',
    },
    rateLimit: {
        window: 15 * 60 * 100,
        max: 500,
    },
    express: {
        json: {},
        compression: {},
        middleware: [],
    },
    hooks: {},
    localization: false,
    telemetry: true,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RlZmF1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUdYLFFBQUEsUUFBUSxHQUFXO0lBQzlCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsWUFBWSxFQUFFLENBQUM7SUFDZixRQUFRLEVBQUUsRUFBRTtJQUNaLFdBQVcsRUFBRSxFQUFFO0lBQ2YsT0FBTyxFQUFFLEVBQUU7SUFDWCxZQUFZLEVBQUUsU0FBUztJQUN2QixJQUFJLEVBQUUsRUFBRTtJQUNSLElBQUksRUFBRSxFQUFFO0lBQ1IsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLFdBQVc7U0FDekI7UUFDRCxPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQztRQUN6RCxVQUFVLEVBQUUsRUFBRTtRQUNkLEdBQUcsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztRQUN4RCxJQUFJLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUM7UUFDN0QsVUFBVSxFQUFFLHNCQUFzQjtLQUNuQztJQUNELFVBQVUsRUFBRTtRQUNWLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRyxDQUFBLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CO0tBQzFGO0lBQ0QsTUFBTSxFQUFFLEVBQUU7SUFDVixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsSUFBSTtRQUNuQiw2QkFBNkIsRUFBRSxJQUFJO0tBQ3BDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLFFBQVE7UUFDZixHQUFHLEVBQUUsTUFBTTtRQUNYLE9BQU8sRUFBRSxVQUFVO1FBQ25CLGlCQUFpQixFQUFFLHFCQUFxQjtLQUN6QztJQUNELFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUc7UUFDckIsR0FBRyxFQUFFLEdBQUc7S0FDVDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxFQUFFO1FBQ1IsV0FBVyxFQUFFLEVBQUU7UUFDZixVQUFVLEVBQUUsRUFBRTtLQUNmO0lBQ0QsS0FBSyxFQUFFLEVBQUU7SUFDVCxZQUFZLEVBQUUsS0FBSztJQUNuQixTQUFTLEVBQUUsSUFBSTtDQUNoQixDQUFDIn0=