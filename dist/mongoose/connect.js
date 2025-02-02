"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testCredentials_1 = require("./testCredentials");
const connectMongoose = async (url, options, local, logger) => {
    let urlToConnect = url;
    let successfulConnectionMessage = 'Connected to Mongo server successfully!';
    const connectionOptions = {
        ...options,
        useNewUrlParser: true,
        autoIndex: true,
    };
    if (process.env.NODE_ENV === 'test' || process.env.MEMORY_SERVER) {
        if (local) {
            urlToConnect = `${testCredentials_1.connection.url}:${testCredentials_1.connection.port}/${testCredentials_1.connection.name}`;
        }
        else {
            connectionOptions.dbName = 'payloadmemory';
            // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongo = await MongoMemoryServer.create({
                instance: {
                    dbName: testCredentials_1.connection.name,
                    port: testCredentials_1.connection.port,
                },
            });
            urlToConnect = mongo.getUri();
            successfulConnectionMessage = 'Connected to in-memory Mongo server successfully!';
        }
    }
    try {
        await mongoose_1.default.connect(urlToConnect, connectionOptions);
        logger.info(successfulConnectionMessage);
    }
    catch (err) {
        logger.error(`Error: cannot connect to MongoDB. Details: ${err.message}`, err);
        process.exit(1);
    }
};
exports.default = connectMongoose;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25nb29zZS9jb25uZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQW9EO0FBRXBELHVEQUErQztBQUUvQyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQzNCLEdBQVcsRUFDWCxPQUF1QixFQUN2QixLQUFjLEVBQ2QsTUFBbUIsRUFDSixFQUFFO0lBQ2pCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztJQUN2QixJQUFJLDJCQUEyQixHQUFHLHlDQUF5QyxDQUFDO0lBQzVFLE1BQU0saUJBQWlCLEdBQUc7UUFDeEIsR0FBRyxPQUFPO1FBQ1YsZUFBZSxFQUFFLElBQUk7UUFDckIsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQztJQUVGLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1FBQ2hFLElBQUksS0FBSyxFQUFFO1lBQ1QsWUFBWSxHQUFHLEdBQUcsNEJBQVUsQ0FBQyxHQUFHLElBQUksNEJBQVUsQ0FBQyxJQUFJLElBQUksNEJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxRTthQUFNO1lBQ0wsaUJBQWlCLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztZQUMzQyw4RUFBOEU7WUFDOUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDL0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsNEJBQVUsQ0FBQyxJQUFJO29CQUN2QixJQUFJLEVBQUUsNEJBQVUsQ0FBQyxJQUFJO2lCQUN0QjthQUNGLENBQUMsQ0FBQztZQUVILFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUIsMkJBQTJCLEdBQUcsbURBQW1ELENBQUM7U0FDbkY7S0FDRjtJQUdELElBQUk7UUFDRixNQUFNLGtCQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUMxQztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDLENBQUM7QUFFRixrQkFBZSxlQUFlLENBQUMifQ==