"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const load_1 = __importDefault(require("../../config/load"));
const testCredentials_1 = require("../../mongoose/testCredentials");
require('isomorphic-fetch');
const { serverURL: url } = (0, load_1.default)();
let token = null;
let headers = null;
let localizedPostID;
let relationshipBID;
const localizedPostTitle = 'title';
const englishPostDesc = 'english description';
const spanishPostDesc = 'spanish description';
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
    describe('Create', () => {
        let response;
        let data;
        beforeAll(async () => {
            response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: localizedPostTitle,
                    description: englishPostDesc,
                    priority: 1,
                    nonLocalizedGroup: {
                        text: 'english',
                    },
                    localizedGroup: {
                        text: 'english',
                    },
                    nonLocalizedArray: [
                        {
                            localizedEmbeddedText: 'english',
                        },
                    ],
                    richTextBlocks: [
                        {
                            blockType: 'richTextBlock',
                            blockName: 'Test Block Name',
                            content: [
                                {
                                    children: [{ text: 'english' }],
                                },
                            ],
                        },
                    ],
                }),
                headers,
                method: 'post',
            });
            data = await response.json();
        });
        it('should allow a localized post to be created', async () => {
            expect(response.status).toBe(201);
            expect(data.doc.title).toBeDefined();
            expect(data.doc.id).toBeDefined();
            expect(data.doc.nonLocalizedGroup.text).toStrictEqual('english');
            expect(data.doc.localizedGroup.text).toStrictEqual('english');
            expect(data.doc.nonLocalizedArray[0].localizedEmbeddedText).toStrictEqual('english');
            expect(data.doc.richTextBlocks[0].content[0].children[0].text).toStrictEqual('english');
            const timestampRegex = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
            expect(data.doc.createdAt).toStrictEqual(expect.stringMatching(timestampRegex));
            expect(data.doc.updatedAt).toStrictEqual(expect.stringMatching(timestampRegex));
            localizedPostID = data.doc.id;
        });
        it('should add id to array items', async () => {
            expect(data.doc.nonLocalizedArray[0].id).toBeDefined();
        });
        it('should add id to block items', async () => {
            expect(data.doc.richTextBlocks[0].id).toBeDefined();
        });
    });
    describe('Update', () => {
        it('should allow updating an existing post', async () => {
            const createResponse = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'newTitle',
                    description: 'original description',
                    richText: [
                        {
                            children: [{ text: 'english' }],
                        },
                    ],
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            expect(createResponse.status).toBe(201);
            const createData = await createResponse.json();
            const { id } = createData.doc;
            const updatedDesc = 'updated description';
            const updatedRichText = [
                {
                    children: [{ text: 'english update' }],
                },
            ];
            const updatedNonLocalizedArray = [
                {
                    localizedEmbeddedText: 'english',
                },
                {
                    localizedEmbeddedText: 'english update',
                },
            ];
            const response = await fetch(`${url}/api/localized-posts/${id}`, {
                body: JSON.stringify({
                    title: 'newTitle',
                    description: updatedDesc,
                    richText: updatedRichText,
                    nonLocalizedArray: updatedNonLocalizedArray,
                    priority: '',
                }),
                headers,
                method: 'put',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.doc.description).toBe(updatedDesc);
            expect(data.doc.priority).not.toStrictEqual(1);
            expect(data.doc.nonLocalizedArray).toHaveLength(2);
            expect(data.doc.richText[0].children[0].text).toBe('english update');
            // make certain the stored object is exactly the same as the returned object
            const stored = await (await fetch(`${url}/api/localized-posts/${id}`, {
                method: 'get',
                headers,
            })).json();
            expect(data.doc).toMatchObject(stored);
        });
        it('should allow a Spanish locale to be added to an existing post', async () => {
            const response = await fetch(`${url}/api/localized-posts/${localizedPostID}?locale=es`, {
                body: JSON.stringify({
                    title: 'title in spanish',
                    description: spanishPostDesc,
                    priority: 1,
                    nonLocalizedGroup: {
                        text: 'spanish',
                    },
                    localizedGroup: {
                        text: 'spanish',
                    },
                    nonLocalizedArray: [
                        {
                            localizedEmbeddedText: 'spanish',
                        },
                    ],
                    richTextBlocks: [
                        {
                            blockType: 'richTextBlock',
                            blockName: 'Test Block Name',
                            content: [
                                {
                                    children: [{ text: 'spanish' }],
                                },
                            ],
                        },
                    ],
                }),
                headers,
                method: 'put',
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data.doc.description).toBe(spanishPostDesc);
            expect(data.doc.nonLocalizedGroup.text).toStrictEqual('spanish');
            expect(data.doc.localizedGroup.text).toStrictEqual('spanish');
            expect(data.doc.nonLocalizedArray[0].localizedEmbeddedText).toStrictEqual('spanish');
            expect(data.doc.richTextBlocks[0].content[0].children[0].text).toStrictEqual('spanish');
        });
    });
    describe('Read', () => {
        describe('Localized', () => {
            it('should allow a localized post to be retrieved in unspecified locale, defaulting to English', async () => {
                const response = await fetch(`${url}/api/localized-posts/${localizedPostID}`);
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data.description).toBe(englishPostDesc);
                expect(data.nonLocalizedGroup.text).toStrictEqual('english');
                expect(data.localizedGroup.text).toStrictEqual('english');
                expect(data.nonLocalizedArray[0].localizedEmbeddedText).toStrictEqual('english');
                expect(data.richTextBlocks[0].content[0].children[0].text).toStrictEqual('english');
            });
            it('should allow a localized post to be retrieved in specified English locale', async () => {
                const response = await fetch(`${url}/api/localized-posts/${localizedPostID}?locale=en`);
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data.description).toBe(englishPostDesc);
                expect(data.nonLocalizedGroup.text).toStrictEqual('english');
                expect(data.localizedGroup.text).toStrictEqual('english');
                expect(data.nonLocalizedArray[0].localizedEmbeddedText).toStrictEqual('english');
                expect(data.richTextBlocks[0].content[0].children[0].text).toStrictEqual('english');
            });
            it('should allow a localized post to be retrieved in Spanish', async () => {
                const response = await fetch(`${url}/api/localized-posts/${localizedPostID}?locale=es`);
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data.description).toBe(spanishPostDesc);
                expect(data.nonLocalizedGroup.text).toStrictEqual('spanish');
                expect(data.localizedGroup.text).toStrictEqual('spanish');
                expect(data.nonLocalizedArray[0].localizedEmbeddedText).toStrictEqual('spanish');
                expect(data.richTextBlocks[0].content[0].children[0].text).toStrictEqual('spanish');
            });
            it('should allow a localized post to be retrieved in all locales', async () => {
                const response = await fetch(`${url}/api/localized-posts/${localizedPostID}?locale=all`);
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data.description.es).toBe(spanishPostDesc);
                expect(data.description.en).toBe(englishPostDesc);
            });
        });
        it('should allow querying by id', async () => {
            const response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'another title',
                    description: 'description',
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            expect(response.status).toBe(201);
            const data = await response.json();
            const getResponse = await fetch(`${url}/api/localized-posts/${data.doc.id}`);
            expect(getResponse.status).toBe(200);
            const getData = await getResponse.json();
            expect(getData.id).toBeDefined();
        });
        it('should allow querying on a field', async () => {
            const desc = 'query test';
            const response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'unique title here',
                    description: desc,
                    priority: 1,
                    nonLocalizedGroup: {
                        text: 'sample content',
                    },
                }),
                headers,
                method: 'post',
            });
            expect(response.status).toBe(201);
            const getResponse = await fetch(`${url}/api/localized-posts?where[description][equals]=${desc}`);
            const data = await getResponse.json();
            expect(getResponse.status).toBe(200);
            expect(data.docs[0].description).toBe(desc);
            expect(data.docs).toHaveLength(1);
            const getResponse2 = await fetch(`${url}/api/localized-posts?where[nonLocalizedGroup.text][equals]=sample content`);
            const data2 = await getResponse2.json();
            expect(getResponse2.status).toBe(200);
            expect(data2.docs[0].description).toBe(desc);
            expect(data2.docs).toHaveLength(1);
        });
        it('should allow querying with OR', async () => {
            const title1 = 'Or1';
            const title2 = 'Or2';
            const response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: title1,
                    description: 'desc',
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            const response2 = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: title2,
                    description: 'desc',
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            expect(response.status).toBe(201);
            expect(response2.status).toBe(201);
            const queryResponse = await fetch(`${url}/api/localized-posts?where[or][0][title][equals]=${title1}&where[or][1][title][equals]=${title2}`);
            const data = await queryResponse.json();
            expect(queryResponse.status).toBe(200);
            expect(data.docs).toHaveLength(2);
            expect(data.docs).toContainEqual(expect.objectContaining({ title: title1 }));
            expect(data.docs).toContainEqual(expect.objectContaining({ title: title2 }));
        });
        it('should allow querying with OR, 1 result', async () => {
            const title1 = 'OrNegative1';
            const title2 = 'OrNegative2';
            const response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: title1,
                    description: 'desc',
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            const response2 = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: title2,
                    description: 'desc',
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            expect(response.status).toBe(201);
            expect(response2.status).toBe(201);
            const queryResponse = await fetch(`${url}/api/localized-posts?where[or][0][title][equals]=${title1}&where[or][1][title][equals]=nonexistent`);
            const data = await queryResponse.json();
            expect(queryResponse.status).toBe(200);
            expect(data.docs).toHaveLength(1);
            expect(data.docs[0].title).toBe(title1);
        });
        it('should allow querying by a non-localized nested relationship property', async () => {
            const relationshipBTitle = 'test';
            const relationshipBRes = await fetch(`${url}/api/relationship-b?depth=0`, {
                body: JSON.stringify({
                    title: relationshipBTitle,
                }),
                headers,
                method: 'post',
            });
            const relationshipBData = await relationshipBRes.json();
            const res = await fetch(`${url}/api/relationship-a?depth=0`, {
                body: JSON.stringify({
                    post: relationshipBData.doc.id,
                }),
                headers,
                method: 'post',
            });
            const additionalRelationshipARes = await fetch(`${url}/api/relationship-a?depth=0`, {
                body: JSON.stringify({
                    postLocalizedMultiple: [
                        {
                            relationTo: 'localized-posts',
                            value: localizedPostID,
                        },
                    ],
                }),
                headers,
                method: 'post',
            });
            const relationshipAData = await res.json();
            expect(res.status).toBe(201);
            expect(additionalRelationshipARes.status).toBe(201);
            expect(relationshipAData.doc.post).toBe(relationshipBData.doc.id);
            const queryRes = await fetch(`${url}/api/relationship-a?where[post.title][equals]=${relationshipBTitle}`);
            const data = await queryRes.json();
            expect(data.docs).toHaveLength(1);
        });
        it('should allow querying by a localized nested relationship property', async () => {
            const res = await fetch(`${url}/api/relationship-a`, {
                body: JSON.stringify({
                    LocalizedPost: [localizedPostID],
                }),
                headers,
                method: 'post',
            });
            expect(res.status).toBe(201);
            const queryRes1 = await fetch(`${url}/api/relationship-a?where[LocalizedPost.title][in]=${localizedPostTitle}`);
            const data1 = await queryRes1.json();
            expect(data1.docs).toHaveLength(1);
        });
        it('should allow querying by a localized nested relationship with many relationTos', async () => {
            const relationshipBTitle = 'lawleifjawelifjew';
            const relationshipB = await fetch(`${url}/api/relationship-b?depth=0`, {
                body: JSON.stringify({
                    title: relationshipBTitle,
                }),
                headers,
                method: 'post',
            }).then((res) => res.json());
            expect(relationshipB.doc.id).toBeDefined();
            const res = await fetch(`${url}/api/relationship-a`, {
                body: JSON.stringify({
                    postManyRelationships: {
                        value: relationshipB.doc.id,
                        relationTo: 'relationship-b',
                    },
                }),
                headers,
                method: 'post',
            });
            expect(res.status).toBe(201);
            const queryRes = await fetch(`${url}/api/relationship-a?where[postManyRelationships.value][equals]=${relationshipB.doc.id}`);
            const data = await queryRes.json();
            expect(data.docs).toHaveLength(1);
        });
        it('should allow querying by a non-localized relationship with many relationTos', async () => {
            const relationshipB = await fetch(`${url}/api/relationship-b?depth=0`, {
                body: JSON.stringify({
                    title: 'awefjlaiwejfalweiijfaew',
                    nonLocalizedRelationToMany: {
                        relationTo: 'localized-posts',
                        value: localizedPostID,
                    },
                }),
                headers,
                method: 'post',
            }).then((res) => res.json());
            expect(relationshipB.doc.id).toBeDefined();
            relationshipBID = relationshipB.doc.id;
            const queryRes = await fetch(`${url}/api/relationship-b?where[nonLocalizedRelationToMany.value][equals]=${localizedPostID}`);
            const data = await queryRes.json();
            expect(data.docs).toHaveLength(1);
        });
        it('should propagate locale through populated documents', async () => {
            const relationshipB = await fetch(`${url}/api/relationship-b/${relationshipBID}?locale=es`, {
                headers,
            });
            const data = await relationshipB.json();
            expect(data.nonLocalizedRelationToMany.value.description).toBe(spanishPostDesc);
        });
        it('should allow querying by a numeric custom ID', async () => {
            const customID = 1988;
            const customIDResult = await fetch(`${url}/api/custom-id?depth=0`, {
                body: JSON.stringify({
                    id: customID,
                    name: 'woohoo',
                }),
                headers,
                method: 'post',
            }).then((res) => res.json());
            expect(customIDResult.doc.id).toStrictEqual(customID);
            await fetch(`${url}/api/custom-id?depth=0`, {
                body: JSON.stringify({
                    id: 2343452,
                    name: 'another post',
                }),
                headers,
                method: 'post',
            }).then((res) => res.json());
            const queryRes1 = await fetch(`${url}/api/custom-id?where[id][equals]=${customID}`, {
                headers,
            });
            const data1 = await queryRes1.json();
            expect(data1.docs).toHaveLength(1);
            const queryByIDRes = await fetch(`${url}/api/custom-id/${customID}`, {
                headers,
            });
            const queryByIDData = await queryByIDRes.json();
            expect(queryByIDData.id).toStrictEqual(customID);
        });
        it('should allow querying by a field within a group', async () => {
            const text = 'laiwjefliajwe';
            await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'super great title',
                    description: 'desc',
                    priority: 1,
                    nonLocalizedGroup: {
                        text,
                    },
                    localizedGroup: {
                        text,
                    },
                }),
                headers,
                method: 'post',
            });
            const queryRes1 = await fetch(`${url}/api/localized-posts?where[nonLocalizedGroup.text][equals]=${text}`);
            const data1 = await queryRes1.json();
            expect(data1.docs).toHaveLength(1);
            const queryRes2 = await fetch(`${url}/api/localized-posts?where[localizedGroup.text][equals]=${text}`);
            const data2 = await queryRes2.json();
            expect(queryRes2.status).toBe(200);
            expect(data2.docs).toHaveLength(1);
        });
    });
    describe('Delete', () => {
        it('should allow a post to be deleted', async () => {
            const response = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'title to be deleted',
                    description: englishPostDesc,
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            const data = await response.json();
            const docId = data.doc.id;
            expect(response.status).toBe(201);
            expect(docId).toBeDefined();
            const deleteResponse = await fetch(`${url}/api/localized-posts/${docId}`, {
                headers,
                method: 'delete',
            });
            const deleteData = await deleteResponse.json();
            expect(deleteResponse.status).toBe(200);
            expect(deleteData.id).toBe(docId);
        });
    });
    describe('Metadata', () => {
        async function createPost(title, description) {
            await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: title || (0, uuid_1.v4)(),
                    description,
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
        }
        it('should include metadata', async () => {
            const desc = 'metadataDesc';
            for (let i = 0; i < 12; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                await createPost(null, desc);
            }
            const getResponse = await fetch(`${url}/api/localized-posts?where[description][equals]=${desc}`);
            const data = await getResponse.json();
            expect(getResponse.status).toBe(200);
            // TODO: Assert exact length once query bug is fixed
            expect(data.docs.length).toBeGreaterThan(0);
            expect(data.totalDocs).toBeGreaterThan(0);
            expect(data.limit).toBe(10);
            expect(data.page).toBe(1);
            expect(data.pagingCounter).toBe(1);
            expect(data.hasPrevPage).toBe(false);
            expect(data.hasNextPage).toBe(true);
            expect(data.prevPage).toBeNull();
            expect(data.nextPage).toBe(2);
        });
        it('should sort the results', async () => {
            const desc = 'sort';
            // Create 2 posts with different titles, same desc
            const req1 = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'aaa',
                    description: desc,
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            const req2 = await fetch(`${url}/api/localized-posts`, {
                body: JSON.stringify({
                    title: 'zzz',
                    description: desc,
                    priority: 1,
                }),
                headers,
                method: 'post',
            });
            const req1data = await req1.json();
            const req2data = await req2.json();
            const id1 = req1data.doc.id;
            const id2 = req2data.doc.id;
            // Query on shared desc and sort ascending
            const getResponse = await fetch(`${url}/api/localized-posts?where[description][equals]=${desc}&sort=title`);
            const data = await getResponse.json();
            expect(getResponse.status).toBe(200);
            expect(data.docs).toHaveLength(2);
            expect(data.docs[0].id).toStrictEqual(id1);
            expect(data.docs[1].id).toStrictEqual(id2);
            // Query on shared desc and sort descending
            const getResponseSorted = await fetch(`${url}/api/localized-posts?where[description][equals]=${desc}&sort=-title`);
            const sortedData = await getResponseSorted.json();
            expect(getResponse.status).toBe(200);
            expect(sortedData.docs).toHaveLength(2);
            // Opposite order from first request
            expect(sortedData.docs[0].id).toStrictEqual(id2);
            expect(sortedData.docs[1].id).toStrictEqual(id1);
        });
    });
    describe('Field Access', () => {
        it('should properly prevent / allow public users from reading a restricted field', async () => {
            const firstArrayText1 = 'test 1';
            const firstArrayText2 = 'test 2';
            const response = await fetch(`${url}/api/localized-arrays`, {
                body: JSON.stringify({
                    array: [
                        {
                            arrayText1: firstArrayText1,
                            arrayText2: 'test 2',
                            arrayText3: 'test 3',
                            allowPublicReadability: true,
                        },
                        {
                            arrayText1: firstArrayText2,
                            arrayText2: 'test 2',
                            arrayText3: 'test 3',
                            allowPublicReadability: false,
                        },
                    ],
                }),
                headers,
                method: 'post',
            });
            const data = await response.json();
            const docId = data.doc.id;
            expect(response.status).toBe(201);
            expect(data.doc.array[1].arrayText1).toStrictEqual(firstArrayText2);
            const unauthenticatedResponse = await fetch(`${url}/api/localized-arrays/${docId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            expect(unauthenticatedResponse.status).toBe(200);
            const unauthenticatedData = await unauthenticatedResponse.json();
            // This string should be allowed to come back
            expect(unauthenticatedData.array[0].arrayText1).toBe(firstArrayText1);
            // This string should be prevented from coming back
            expect(unauthenticatedData.array[1].arrayText1).toBeUndefined();
            const authenticatedResponse = await fetch(`${url}/api/localized-arrays/${docId}`, {
                headers,
            });
            const authenticatedData = await authenticatedResponse.json();
            // If logged in, we should get this field back
            expect(authenticatedData.array[1].arrayText1).toStrictEqual(firstArrayText2);
        });
    });
    describe('Unique', () => {
        it('should prevent unique fields from duplicating data', async () => {
            const nonUniqueTitle = 'title';
            const response = await fetch(`${url}/api/uniques`, {
                body: JSON.stringify({
                    title: nonUniqueTitle,
                }),
                headers,
                method: 'post',
            });
            const data = await response.json();
            expect(response.status).toBe(201);
            expect(data.doc.title).toStrictEqual(nonUniqueTitle);
            const failedResponse = await fetch(`${url}/api/uniques`, {
                body: JSON.stringify({
                    title: nonUniqueTitle,
                }),
                headers,
                method: 'post',
            });
            expect(failedResponse.status).toStrictEqual(500);
        });
    });
    describe('Custom ID', () => {
        const document = {
            id: 1,
            name: 'name',
        };
        let data;
        beforeAll(async (done) => {
            // create document
            const create = await fetch(`${url}/api/custom-id`, {
                body: JSON.stringify(document),
                headers,
                method: 'post',
            });
            data = await create.json();
            done();
        });
        it('should create collections with custom ID', async () => {
            expect(data.doc.id).toBe(document.id);
        });
        it('should read collections by custom ID', async () => {
            const response = await fetch(`${url}/api/custom-id/${document.id}`, {
                headers,
                method: 'get',
            });
            const result = await response.json();
            expect(result.id).toStrictEqual(document.id);
            expect(result.name).toStrictEqual(document.name);
        });
        it('should update collection by custom ID', async () => {
            const updatedDoc = { id: 'cannot-update-id', name: 'updated' };
            const response = await fetch(`${url}/api/custom-id/${document.id}`, {
                headers,
                body: JSON.stringify(updatedDoc),
                method: 'put',
            });
            const result = await response.json();
            expect(result.doc.id).not.toStrictEqual(updatedDoc.id);
            expect(result.doc.name).not.toStrictEqual(document.name);
            expect(result.doc.name).toStrictEqual(updatedDoc.name);
        });
        it('should delete collection by custom ID', async () => {
            const doc = {
                id: 2,
                name: 'delete me',
            };
            const createResponse = await fetch(`${url}/api/custom-id`, {
                body: JSON.stringify(doc),
                headers,
                method: 'post',
            });
            const result = await createResponse.json();
            const response = await fetch(`${url}/api/custom-id/${result.doc.id}`, {
                headers,
                method: 'delete',
            });
            expect(response.status).toBe(200);
            const deleteData = await response.json();
            expect(deleteData.id).toBe(doc.id);
        });
        it('should allow querying by custom ID', async () => {
            const response = await fetch(`${url}/api/custom-id?where[id][equals]=${document.id}`, {
                headers,
                method: 'get',
            });
            const emptyResponse = await fetch(`${url}/api/custom-id?where[id][equals]=900`, {
                headers,
                method: 'get',
            });
            const result = await response.json();
            const emptyResult = await emptyResponse.json();
            expect(result.docs).toHaveLength(1);
            expect(emptyResult.docs).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbnMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy90ZXN0cy9jb2xsZWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0JBQWtDO0FBQ2xDLDZEQUEwQztBQUMxQyxvRUFBaUU7QUFFakUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFNUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxDQUFDO0FBRXZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFFbkIsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxlQUFlLENBQUM7QUFDcEIsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUM7QUFDbkMsTUFBTSxlQUFlLEdBQUcscUJBQXFCLENBQUM7QUFDOUMsTUFBTSxlQUFlLEdBQUcscUJBQXFCLENBQUM7QUFFOUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxtQkFBbUIsRUFBRTtZQUN0RCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsS0FBSyxFQUFMLHVCQUFLO2dCQUNMLFFBQVEsRUFBUiwwQkFBUTthQUNULENBQUM7WUFDRixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbkMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ25CLE9BQU8s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