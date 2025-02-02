import { formatDistance } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useConfig } from '../../utilities/Config';
import { useWatchForm, useFormModified } from '../../forms/Form/context';
import { useLocale } from '../../utilities/Locale';
import reduceFieldsToValues from '../../forms/Form/reduceFieldsToValues';
import { useDocumentInfo } from '../../utilities/DocumentInfo';
import useDebounce from '../../../hooks/useDebounce';
import './index.scss';
const baseClass = 'autosave';
const Autosave = ({ collection, global, id, publishedDocUpdatedAt }) => {
    var _a, _b, _c, _d;
    const { serverURL, routes: { api, admin } } = useConfig();
    const { versions, getVersions } = useDocumentInfo();
    const { fields, dispatchFields } = useWatchForm();
    const modified = useFormModified();
    const locale = useLocale();
    const { replace } = useHistory();
    let interval = 800;
    if ((collection === null || collection === void 0 ? void 0 : collection.versions.drafts) && ((_b = (_a = collection.versions) === null || _a === void 0 ? void 0 : _a.drafts) === null || _b === void 0 ? void 0 : _b.autosave))
        interval = collection.versions.drafts.autosave.interval;
    if ((global === null || global === void 0 ? void 0 : global.versions.drafts) && ((_d = (_c = global.versions) === null || _c === void 0 ? void 0 : _c.drafts) === null || _d === void 0 ? void 0 : _d.autosave))
        interval = global.versions.drafts.autosave.interval;
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState();
    const debouncedFields = useDebounce(fields, interval);
    const fieldRef = useRef(fields);
    // Store fields in ref so the autosave func
    // can always retrieve the most to date copies
    // after the timeout has executed
    fieldRef.current = fields;
    const createCollectionDoc = useCallback(async () => {
        const res = await fetch(`${serverURL}${api}/${collection.slug}?locale=${locale}&fallback-locale=null&depth=0&draft=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        if (res.status === 201) {
            const json = await res.json();
            replace(`${admin}/collections/${collection.slug}/${json.doc.id}`, {
                state: {
                    data: json.doc,
                },
            });
        }
        else {
            toast.error('There was a problem while autosaving this document.');
        }
    }, [collection, serverURL, api, admin, locale, replace]);
    useEffect(() => {
        // If no ID, but this is used for a collection doc,
        // Immediately save it and set lastSaved
        if (!id && collection) {
            createCollectionDoc();
        }
    }, [id, collection, createCollectionDoc]);
    // When debounced fields change, autosave
    useEffect(() => {
        const autosave = async () => {
            if (modified) {
                setSaving(true);
                let url;
                let method;
                if (collection && id) {
                    url = `${serverURL}${api}/${collection.slug}/${id}?draft=true&autosave=true&locale=${locale}`;
                    method = 'PUT';
                }
                if (global) {
                    url = `${serverURL}${api}/globals/${global.slug}?draft=true&autosave=true&locale=${locale}`;
                    method = 'POST';
                }
                if (url) {
                    const body = {
                        ...reduceFieldsToValues(fieldRef.current),
                        _status: 'draft',
                    };
                    setTimeout(async () => {
                        const res = await fetch(url, {
                            method,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        });
                        setSaving(false);
                        if (res.status === 200) {
                            setLastSaved(new Date().getTime());
                            getVersions();
                        }
                    }, 1000);
                }
            }
        };
        autosave();
    }, [debouncedFields, modified, serverURL, api, collection, global, id, dispatchFields, getVersions, locale]);
    useEffect(() => {
        var _a;
        if ((_a = versions === null || versions === void 0 ? void 0 : versions.docs) === null || _a === void 0 ? void 0 : _a[0]) {
            setLastSaved(new Date(versions.docs[0].updatedAt).getTime());
        }
        else if (publishedDocUpdatedAt) {
            setLastSaved(new Date(publishedDocUpdatedAt).getTime());
        }
    }, [publishedDocUpdatedAt, versions]);
    return (React.createElement("div", { className: baseClass },
        saving && 'Saving...',
        (!saving && lastSaved) && (React.createElement(React.Fragment, null,
            "Last saved\u00A0",
            formatDistance(new Date(), new Date(lastSaved)),
            "\u00A0ago"))));
};
export default Autosave;
