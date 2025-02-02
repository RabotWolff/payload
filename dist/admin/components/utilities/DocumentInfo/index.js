import React, { createContext, useCallback, useContext, useEffect, useState, } from 'react';
import qs from 'qs';
import { useConfig } from '../Config';
const Context = createContext({});
export const DocumentInfoProvider = ({ children, global, collection, id, }) => {
    const { serverURL, routes: { api } } = useConfig();
    const [publishedDoc, setPublishedDoc] = useState(null);
    const [versions, setVersions] = useState(null);
    const [unpublishedVersions, setUnpublishedVersions] = useState(null);
    const baseURL = `${serverURL}${api}`;
    let slug;
    let type;
    let preferencesKey;
    if (global) {
        slug = global.slug;
        type = 'global';
        preferencesKey = `global-${slug}`;
    }
    if (collection) {
        slug = collection.slug;
        type = 'collection';
        if (id) {
            preferencesKey = `collection-${slug}-${id}`;
        }
    }
    const getVersions = useCallback(async () => {
        var _a;
        let versionFetchURL;
        let publishedFetchURL;
        let shouldFetchVersions = false;
        let unpublishedVersionJSON = null;
        let versionJSON = null;
        let shouldFetch = true;
        const versionParams = {
            where: {
                and: [],
            },
            depth: 0,
        };
        const publishedVersionParams = {
            where: {
                and: [
                    {
                        or: [
                            {
                                _status: {
                                    equals: 'published',
                                },
                            },
                            {
                                _status: {
                                    exists: false,
                                },
                            },
                        ],
                    },
                ],
            },
            depth: 0,
        };
        if (global) {
            shouldFetchVersions = Boolean(global === null || global === void 0 ? void 0 : global.versions);
            versionFetchURL = `${baseURL}/globals/${global.slug}/versions`;
            publishedFetchURL = `${baseURL}/globals/${global.slug}?${qs.stringify(publishedVersionParams)}`;
        }
        if (collection) {
            shouldFetchVersions = Boolean(collection === null || collection === void 0 ? void 0 : collection.versions);
            versionFetchURL = `${baseURL}/${collection.slug}/versions`;
            publishedVersionParams.where.and.push({
                id: {
                    equals: id,
                },
            });
            publishedFetchURL = `${baseURL}/${collection.slug}?${qs.stringify(publishedVersionParams)}`;
            if (!id) {
                shouldFetch = false;
            }
            versionParams.where.and.push({
                parent: {
                    equals: id,
                },
            });
        }
        if (shouldFetch) {
            let publishedJSON = await fetch(publishedFetchURL).then((res) => res.json());
            if (collection) {
                publishedJSON = (_a = publishedJSON === null || publishedJSON === void 0 ? void 0 : publishedJSON.docs) === null || _a === void 0 ? void 0 : _a[0];
            }
            if (shouldFetchVersions) {
                versionJSON = await fetch(`${versionFetchURL}?${qs.stringify(versionParams)}`).then((res) => res.json());
                if (publishedJSON === null || publishedJSON === void 0 ? void 0 : publishedJSON.updatedAt) {
                    const newerVersionParams = {
                        ...versionParams,
                        where: {
                            ...versionParams.where,
                            and: [
                                ...versionParams.where.and,
                                {
                                    updatedAt: {
                                        greater_than: publishedJSON === null || publishedJSON === void 0 ? void 0 : publishedJSON.updatedAt,
                                    },
                                },
                            ],
                        },
                    };
                    // Get any newer versions available
                    const newerVersionRes = await fetch(`${versionFetchURL}?${qs.stringify(newerVersionParams)}`);
                    if (newerVersionRes.status === 200) {
                        unpublishedVersionJSON = await newerVersionRes.json();
                    }
                }
            }
            setPublishedDoc(publishedJSON);
            setVersions(versionJSON);
            setUnpublishedVersions(unpublishedVersionJSON);
        }
    }, [global, collection, id, baseURL]);
    useEffect(() => {
        getVersions();
    }, [getVersions]);
    const value = {
        slug,
        type,
        preferencesKey,
        global,
        collection,
        versions,
        unpublishedVersions,
        getVersions,
        publishedDoc,
        id,
    };
    return (React.createElement(Context.Provider, { value: value }, children));
};
export const useDocumentInfo = () => useContext(Context);
export default Context;
