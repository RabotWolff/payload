"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = __importDefault(require("../../config/load"));
const testCredentials_1 = require("../../mongoose/testCredentials");
require('isomorphic-fetch');
const { serverURL: url } = (0, load_1.default)();
let token = null;
let headers = null;
describe('Collections - REST', () => {
    beforeAll(async (done) => {
        const response = await fetch(`${url}/api/admins/login`, {
            body: JSON.stringify({
                email: testCredentials_1.email,
                password: testCredentials_1.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
        });
        const data = await response.json();
        ({ token } = data);
        headers = {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
        };
        done();
    });
    describe('Endpoints', () => {
        it('should GET a static endpoint', async () => {
            const response = await fetch(`${url}/api/endpoints/say-hello/joe-bloggs`, {
                headers: {
                    ...headers,
                },
                method: 'get',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.message).toStrictEqual(`Hey Joey! Welcome to ${url}/api`);
        });
        it('should GET an endpoint with a parameter', async () => {
            const response = await fetch(`${url}/api/endpoints/say-hello/George`, {
                headers: {
                    ...headers,
                },
                method: 'get',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.message).toStrictEqual('Hello George!');
        });
        it('should POST an endpoint with data', async () => {
            const params = { name: 'George', age: 29 };
            const response = await fetch(`${url}/api/endpoints/whoami`, {
                body: JSON.stringify(params),
                headers: {
                    ...headers,
                },
                method: 'post',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.name).toStrictEqual(params.name);
            expect(data.age).toStrictEqual(params.age);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvdGVzdHMvZW5kcG9pbnRzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2REFBMEM7QUFDMUMsb0VBQWlFO0FBRWpFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsQ0FBQztBQUV2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBRW5CLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLEVBQUU7WUFDdEQsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLEtBQUssRUFBTCx1QkFBSztnQkFDTCxRQUFRLEVBQVIsMEJBQVE7YUFDVCxDQUFDO1lBQ0YsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuQixPQUFPLEdBQUc7WUFDUixhQUFhLEVBQUUsT0FBTyxLQUFLLEVBQUU7WUFDN0IsY0FBYyxFQUFFLGtCQUFrQjtTQUNuQyxDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1FBQ3pCLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM1QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEdBQUcscUNBQXFDLEVBQUU7Z0JBQ3hFLE9BQU8sRUFBRTtvQkFDUCxHQUFHLE9BQU87aUJBQ1g7Z0JBQ0QsTUFBTSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEdBQUcsaUNBQWlDLEVBQUU7Z0JBQ3BFLE9BQU8sRUFBRTtvQkFDUCxHQUFHLE9BQU87aUJBQ1g7Z0JBQ0QsTUFBTSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNqRCxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyx1QkFBdUIsRUFBRTtnQkFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM1QixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxPQUFPO2lCQUNYO2dCQUNELE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==