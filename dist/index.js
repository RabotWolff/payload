"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payload = void 0;
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = __importDefault(require("./utilities/logger"));
const load_1 = __importDefault(require("./config/load"));
const authenticate_1 = __importDefault(require("./express/middleware/authenticate"));
const connect_1 = __importDefault(require("./mongoose/connect"));
const middleware_1 = __importDefault(require("./express/middleware"));
const admin_1 = __importDefault(require("./express/admin"));
const init_1 = __importDefault(require("./auth/init"));
const access_1 = __importDefault(require("./auth/requestHandlers/access"));
const init_2 = __importDefault(require("./collections/init"));
const init_3 = __importDefault(require("./preferences/init"));
const init_4 = __importDefault(require("./globals/init"));
const initPlayground_1 = __importDefault(require("./graphql/initPlayground"));
const static_1 = __importDefault(require("./express/static"));
const graphql_1 = __importDefault(require("./graphql"));
const build_1 = __importDefault(require("./email/build"));
const identifyAPI_1 = __importDefault(require("./express/middleware/identifyAPI"));
const errorHandler_1 = __importDefault(require("./express/middleware/errorHandler"));
const local_1 = __importDefault(require("./collections/operations/local"));
const local_2 = __importDefault(require("./globals/operations/local"));
const crypto_2 = require("./auth/crypto");
const sendEmail_1 = __importDefault(require("./email/sendEmail"));
const serverInit_1 = require("./utilities/telemetry/events/serverInit");
require('isomorphic-fetch');
/**
 * @description Payload
 */
class Payload {
    constructor() {
        this.collections = {};
        this.versions = {};
        this.encrypt = crypto_2.encrypt;
        this.decrypt = crypto_2.decrypt;
        this.Query = { name: 'Query', fields: {} };
        this.Mutation = { name: 'Mutation', fields: {} };
        this.errorResponses = [];
        this.getAdminURL = () => `${this.config.serverURL}${this.config.routes.admin}`;
        this.getAPIURL = () => `${this.config.serverURL}${this.config.routes.api}`;
        /**
         * @description Performs create operation
         * @param options
         * @returns created document
         */
        this.create = async (options) => {
            const { create } = local_1.default;
            return create(this, options);
        };
        /**
         * @description Find documents with criteria
         * @param options
         * @returns documents satisfying query
         */
        this.find = async (options) => {
            const { find } = local_1.default;
            return find(this, options);
        };
        this.findGlobal = async (options) => {
            const { findOne } = local_2.default;
            return findOne(this, options);
        };
        this.updateGlobal = async (options) => {
            const { update } = local_2.default;
            return update(this, options);
        };
        /**
         * @description Find global versions with criteria
         * @param options
         * @returns versions satisfying query
         */
        this.findGlobalVersions = async (options) => {
            const { findVersions } = local_2.default;
            return findVersions(this, options);
        };
        /**
         * @description Find global version by ID
         * @param options
         * @returns global version with specified ID
         */
        this.findGlobalVersionByID = async (options) => {
            const { findVersionByID } = local_2.default;
            return findVersionByID(this, options);
        };
        /**
         * @description Restore global version by ID
         * @param options
         * @returns version with specified ID
         */
        this.restoreGlobalVersion = async (options) => {
            const { restoreVersion } = local_2.default;
            return restoreVersion(this, options);
        };
        /**
         * @description Find document by ID
         * @param options
         * @returns document with specified ID
         */
        this.findByID = async (options) => {
            const { findByID } = local_1.default;
            return findByID(this, options);
        };
        /**
         * @description Update document
         * @param options
         * @returns Updated document
         */
        this.update = async (options) => {
            const { update } = local_1.default;
            return update(this, options);
        };
        this.delete = async (options) => {
            const { localDelete } = local_1.default;
            return localDelete(this, options);
        };
        /**
         * @description Find versions with criteria
         * @param options
         * @returns versions satisfying query
         */
        this.findVersions = async (options) => {
            const { findVersions } = local_1.default;
            return findVersions(this, options);
        };
        /**
         * @description Find version by ID
         * @param options
         * @returns version with specified ID
         */
        this.findVersionByID = async (options) => {
            const { findVersionByID } = local_1.default;
            return findVersionByID(this, options);
        };
        /**
         * @description Restore version by ID
         * @param options
         * @returns version with specified ID
         */
        this.restoreVersion = async (options) => {
            const { restoreVersion } = local_1.default;
            return restoreVersion(this, options);
        };
        this.login = async (options) => {
            const { login } = local_1.default.auth;
            return login(this, options);
        };
        this.forgotPassword = async (options) => {
            const { forgotPassword } = local_1.default.auth;
            return forgotPassword(this, options);
        };
        this.resetPassword = async (options) => {
            const { resetPassword } = local_1.default.auth;
            return resetPassword(this, options);
        };
        this.unlock = async (options) => {
            const { unlock } = local_1.default.auth;
            return unlock(this, options);
        };
        this.verifyEmail = async (options) => {
            const { verifyEmail } = local_1.default.auth;
            return verifyEmail(this, options);
        };
    }
    /**
     * @description Initializes Payload
     * @param options
     */
    init(options) {
        this.logger = (0, logger_1.default)('payload', options.loggerOptions);
        this.logger.info('Starting Payload...');
        if (!options.secret) {
            throw new Error('Error: missing secret key. A secret key is needed to secure Payload.');
        }
        if (!options.mongoURL) {
            throw new Error('Error: missing MongoDB connection URL.');
        }
        this.emailOptions = { ...(options.email) };
        this.secret = crypto_1.default
            .createHash('sha256')
            .update(options.secret)
            .digest('hex')
            .slice(0, 32);
        this.mongoURL = options.mongoURL;
        this.local = options.local;
        this.config = (0, load_1.default)(this.logger);
        // If not initializing locally, scaffold router
        if (!this.local) {
            this.router = express_1.default.Router();
            this.router.use(...(0, middleware_1.default)(this));
            (0, init_1.default)(this);
        }
        // Configure email service
        this.email = (0, build_1.default)(this.emailOptions, this.logger);
        this.sendEmail = sendEmail_1.default.bind(this);
        // Initialize collections & globals
        (0, init_2.default)(this);
        (0, init_4.default)(this);
        // Connect to database
        (0, connect_1.default)(this.mongoURL, options.mongoOptions, options.local, this.logger);
        // If not initializing locally, set up HTTP routing
        if (!this.local) {
            options.express.use((req, res, next) => {
                req.payload = this;
                next();
            });
            this.express = options.express;
            if (this.config.rateLimit.trustProxy) {
                this.express.set('trust proxy', 1);
            }
            (0, admin_1.default)(this);
            (0, init_3.default)(this);
            this.router.get('/access', access_1.default);
            if (!this.config.graphQL.disable) {
                this.router.use(this.config.routes.graphQL, (0, identifyAPI_1.default)('GraphQL'), (req, res) => (0, graphql_1.default)(req, res)(req, res));
                (0, initPlayground_1.default)(this);
            }
            // Bind router to API
            this.express.use(this.config.routes.api, this.router);
            // Enable static routes for all collections permitting upload
            (0, static_1.default)(this);
            this.errorHandler = (0, errorHandler_1.default)(this.config, this.logger);
            this.router.use(this.errorHandler);
            this.authenticate = (0, authenticate_1.default)(this.config);
        }
        if (typeof options.onInit === 'function')
            options.onInit(this);
        (0, serverInit_1.serverInit)(this);
    }
}
exports.Payload = Payload;
const payload = new Payload();
exports.default = payload;
module.exports = payload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQW1EO0FBRW5ELG9EQUE0QjtBQWU1QixnRUFBd0M7QUFDeEMseURBQXVDO0FBQ3ZDLHFGQUFzRjtBQUN0RixpRUFBaUQ7QUFDakQsc0VBQXFEO0FBQ3JELDREQUF3QztBQUN4Qyx1REFBbUM7QUFDbkMsMkVBQW1EO0FBQ25ELDhEQUFpRDtBQUNqRCw4REFBaUQ7QUFDakQsMERBQXlDO0FBRXpDLDhFQUE2RDtBQUM3RCw4REFBMEM7QUFDMUMsd0RBQTBDO0FBQzFDLDBEQUF1QztBQUN2QyxtRkFBMkQ7QUFDM0QscUZBQStFO0FBQy9FLDJFQUE2RDtBQUM3RCx1RUFBK0Q7QUFDL0QsMENBQWlEO0FBR2pELGtFQUEwQztBQXdCMUMsd0VBQTRGO0FBRTVGLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCOztHQUVHO0FBQ0gsTUFBYSxPQUFPO0lBQXBCO1FBR0UsZ0JBQVcsR0FFUCxFQUFFLENBQUE7UUFFTixhQUFRLEdBRUosRUFBRSxDQUFBO1FBd0JOLFlBQU8sR0FBRyxnQkFBTyxDQUFDO1FBRWxCLFlBQU8sR0FBRyxnQkFBTyxDQUFDO1FBYWxCLFVBQUssR0FBcUQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUV4RixhQUFRLEdBQXFELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFVOUYsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBK0Y3QyxnQkFBVyxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbEYsY0FBUyxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcs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