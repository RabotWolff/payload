"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_data_1 = __importDefault(require("form-data"));
const graphql_request_1 = require("graphql-request");
const util_1 = require("util");
const load_1 = __importDefault(require("../../config/load"));
const testCredentials_1 = require("../../mongoose/testCredentials");
const stat = (0, util_1.promisify)(fs_1.default.stat);
require('isomorphic-fetch');
const config = (0, load_1.default)();
const api = `${config.serverURL}${config.routes.api}`;
let client;
let token;
let headers;
describe('Collections - Uploads', () => {
    beforeAll(async (done) => {
        const response = await fetch(`${api}/admins/login`, {
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
        };
        done();
    });
    describe('REST', () => {
        const mediaDir = path_1.default.join(__dirname, '../../../demo', 'media');
        beforeAll(async () => {
            // Clear demo/media directory
            const mediaDirExists = await fileExists(mediaDir);
            if (!mediaDirExists)
                return;
            fs_1.default.readdir(mediaDir, (err, files) => {
                if (err)
                    throw err;
                // eslint-disable-next-line no-restricted-syntax
                for (const file of files) {
                    fs_1.default.unlink(path_1.default.join(mediaDir, file), (unlinkErr) => {
                        if (unlinkErr)
                            throw unlinkErr;
                    });
                }
            });
        });
        describe('create', () => {
            it('creates', async () => {
                const formData = new form_data_1.default();
                formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/image.png')));
                formData.append('alt', 'test media');
                formData.append('locale', 'en');
                const response = await fetch(`${api}/media`, {
                    body: formData,
                    headers,
                    method: 'post',
                });
                const data = await response.json();
                expect(response.status).toBe(201);
                // Check for files
                expect(await fileExists(path_1.default.join(mediaDir, 'image.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'image-16x16.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'image-320x240.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'image-640x480.png'))).toBe(true);
                // Check api response
                expect(data).toMatchObject({
                    doc: {
                        alt: 'test media',
                        filename: 'image.png',
                        mimeType: 'image/png',
                        sizes: {
                            icon: {
                                filename: 'image-16x16.png',
                                width: 16,
                                height: 16,
                            },
                            mobile: {
                                filename: 'image-320x240.png',
                                width: 320,
                                height: 240,
                            },
                            tablet: {
                                filename: 'image-640x480.png',
                                width: 640,
                                height: 480,
                            },
                        },
                        // We have a hook to check if upload sizes
                        // are properly bound to the Payload `req`.
                        // This field should be automatically set
                        // if they are found.
                        foundUploadSizes: true,
                    },
                });
            });
            it('creates media without storing a file', async () => {
                const formData = new form_data_1.default();
                formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/image.png')));
                formData.append('alt', 'test media');
                formData.append('locale', 'en');
                const response = await fetch(`${api}/unstored-media`, {
                    body: formData,
                    headers,
                    method: 'post',
                });
                const data = await response.json();
                expect(response.status).toBe(201);
                // Check for files
                expect(await !fileExists(path_1.default.join(mediaDir, 'image.png'))).toBe(false);
                expect(await !fileExists(path_1.default.join(mediaDir, 'image-640x480.png'))).toBe(false);
                // Check api response
                expect(data).toMatchObject({
                    doc: {
                        alt: 'test media',
                        filename: 'image.png',
                        mimeType: 'image/png',
                        sizes: {
                            tablet: {
                                filename: 'image-640x480.png',
                                width: 640,
                                height: 480,
                            },
                        },
                    },
                });
            });
            it('creates with same name', async () => {
                const formData = new form_data_1.default();
                formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/samename.png')));
                formData.append('alt', 'test media');
                formData.append('locale', 'en');
                const firstResponse = await fetch(`${api}/media`, {
                    body: formData,
                    headers,
                    method: 'post',
                });
                expect(firstResponse.status).toBe(201);
                const sameForm = new form_data_1.default();
                sameForm.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/samename.png')));
                sameForm.append('alt', 'test media');
                sameForm.append('locale', 'en');
                const response = await fetch(`${api}/media`, {
                    body: sameForm,
                    headers,
                    method: 'post',
                });
                expect(response.status).toBe(201);
                const data = await response.json();
                // Check for files
                expect(await fileExists(path_1.default.join(mediaDir, 'samename-1.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'samename-1-16x16.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'samename-1-320x240.png'))).toBe(true);
                expect(await fileExists(path_1.default.join(mediaDir, 'samename-1-640x480.png'))).toBe(true);
                expect(data).toMatchObject({
                    doc: {
                        alt: 'test media',
                        filename: 'samename-1.png',
                        mimeType: 'image/png',
                        sizes: {
                            icon: {
                                filename: 'samename-1-16x16.png',
                                width: 16,
                                height: 16,
                            },
                            mobile: {
                                filename: 'samename-1-320x240.png',
                                width: 320,
                                height: 240,
                            },
                            tablet: {
                                filename: 'samename-1-640x480.png',
                                width: 640,
                                height: 480,
                            },
                        },
                    },
                });
            });
        });
        it('update', async () => {
            const formData = new form_data_1.default();
            formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/update.png')));
            formData.append('alt', 'test media');
            formData.append('locale', 'en');
            const response = await fetch(`${api}/media`, {
                body: formData,
                headers,
                method: 'post',
            });
            const data = await response.json();
            expect(response.status).toBe(201);
            const updateFormData = new form_data_1.default();
            const newAlt = 'my new alt';
            updateFormData.append('filename', data.doc.filename);
            updateFormData.append('alt', newAlt);
            const updateResponse = await fetch(`${api}/media/${data.doc.id}`, {
                body: updateFormData,
                headers,
                method: 'put',
            });
            const updateResponseData = await updateResponse.json();
            expect(updateResponse.status).toBe(200);
            // Check that files weren't affected
            expect(await fileExists(path_1.default.join(mediaDir, 'update.png'))).toBe(true);
            expect(await fileExists(path_1.default.join(mediaDir, 'update-16x16.png'))).toBe(true);
            expect(await fileExists(path_1.default.join(mediaDir, 'update-320x240.png'))).toBe(true);
            expect(await fileExists(path_1.default.join(mediaDir, 'update-640x480.png'))).toBe(true);
            // Check api response
            expect(updateResponseData).toMatchObject({
                doc: {
                    alt: newAlt,
                    filename: 'update.png',
                    mimeType: 'image/png',
                    sizes: {
                        icon: {
                            filename: 'update-16x16.png',
                            width: 16,
                            height: 16,
                        },
                        mobile: {
                            filename: 'update-320x240.png',
                            width: 320,
                            height: 240,
                        },
                        tablet: {
                            filename: 'update-640x480.png',
                            width: 640,
                            height: 480,
                        },
                        maintainedAspectRatio: {},
                    },
                },
            });
        });
        it('delete', async () => {
            const formData = new form_data_1.default();
            formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/delete.png')));
            formData.append('alt', 'test media');
            formData.append('locale', 'en');
            const createResponse = await fetch(`${api}/media`, {
                body: formData,
                headers,
                method: 'post',
            });
            const createData = await createResponse.json();
            expect(createResponse.status).toBe(201);
            const docId = createData.doc.id;
            const response = await fetch(`${api}/media/${docId}`, {
                headers,
                method: 'delete',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.id).toBe(docId);
            const imageExists = await fileExists(path_1.default.join(mediaDir, 'delete.png'));
            expect(imageExists).toBe(false);
        });
    });
    describe('GraphQL', () => {
        // graphql cannot submit formData to create files, we only need to test getting relationship data on upload fields
        let media;
        let image;
        const alt = 'alt text';
        beforeAll(async (done) => {
            client = new graphql_request_1.GraphQLClient(`${api}${config.routes.graphQL}`, {
                headers: { Authorization: `JWT ${token}` },
            });
            // create media using REST
            const formData = new form_data_1.default();
            formData.append('file', fs_1.default.createReadStream(path_1.default.join(__dirname, '../../..', 'tests/api/assets/image.png')));
            formData.append('alt', alt);
            formData.append('locale', 'en');
            const mediaResponse = await fetch(`${api}/media`, {
                body: formData,
                headers,
                method: 'post',
            });
            const mediaData = await mediaResponse.json();
            media = mediaData.doc;
            // create image that relates to media
            headers['Content-Type'] = 'application/json';
            const imageResponse = await fetch(`${api}/images`, {
                body: JSON.stringify({
                    upload: media.id,
                }),
                headers,
                method: 'post',
            });
            const data = await imageResponse.json();
            image = data.doc;
            done();
        });
        it('should query uploads relationship fields', async () => {
            // language=graphQL
            const query = `query {
          Image(id: "${image.id}") {
            id
            upload {
              alt
            }
          }
        }`;
            const response = await client.request(query);
            expect(response.Image.upload.alt).toStrictEqual(alt);
        });
    });
});
async function fileExists(fileName) {
    try {
        await stat(fileName);
        return true;
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2Fkcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL3Rlc3RzL3VwbG9hZHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsMERBQWlDO0FBQ2pDLHFEQUFnRDtBQUNoRCwrQkFBaUM7QUFDakMsNkRBQTBDO0FBQzFDLG9FQUFpRTtBQUVqRSxNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFTLEVBQUMsWUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sTUFBTSxHQUFHLElBQUEsY0FBUyxHQUFFLENBQUM7QUFDM0IsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFdEQsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLEtBQUssQ0FBQztBQUNWLElBQUksT0FBTyxDQUFDO0FBRVosUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtJQUNyQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxlQUFlLEVBQUU7WUFDbEQsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLEtBQUssRUFBTCx1QkFBSztnQkFDTCxRQUFRLEVBQVIsMEJBQVE7YUFDVCxDQUFDO1lBQ0YsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJ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