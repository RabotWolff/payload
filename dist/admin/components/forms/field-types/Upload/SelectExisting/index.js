import React, { Fragment, useState, useEffect } from 'react';
import equal from 'deep-equal';
import { Modal, useModal } from '@faceless-ui/modal';
import { useConfig } from '../../../../utilities/Config';
import { useAuth } from '../../../../utilities/Auth';
import MinimalTemplate from '../../../../templates/Minimal';
import Button from '../../../../elements/Button';
import usePayloadAPI from '../../../../../hooks/usePayloadAPI';
import ListControls from '../../../../elements/ListControls';
import Paginator from '../../../../elements/Paginator';
import UploadGallery from '../../../../elements/UploadGallery';
import PerPage from '../../../../elements/PerPage';
import formatFields from '../../../../views/collections/List/formatFields';
import { getFilterOptionsQuery } from '../../getFilterOptionsQuery';
import { useDocumentInfo } from '../../../../utilities/DocumentInfo';
import { useWatchForm } from '../../../Form/context';
import ViewDescription from '../../../../elements/ViewDescription';
import './index.scss';
const baseClass = 'select-existing-upload-modal';
const SelectExistingUploadModal = (props) => {
    var _a, _b;
    const { setValue, collection, collection: { slug: collectionSlug, admin: { description, pagination: { defaultLimit, }, } = {}, } = {}, slug: modalSlug, path, filterOptions, } = props;
    const { serverURL, routes: { api } } = useConfig();
    const { id } = useDocumentInfo();
    const { user } = useAuth();
    const { getData, getSiblingData } = useWatchForm();
    const { closeAll, currentModal } = useModal();
    const [fields] = useState(() => formatFields(collection));
    const [limit, setLimit] = useState(defaultLimit);
    const [sort, setSort] = useState(null);
    const [where, setWhere] = useState(null);
    const [page, setPage] = useState(null);
    const [optionFilters, setOptionFilters] = useState();
    const classes = [
        baseClass,
    ].filter(Boolean).join(' ');
    const isOpen = currentModal === modalSlug;
    const apiURL = isOpen ? `${serverURL}${api}/${collectionSlug}` : null;
    const [{ data }, { setParams }] = usePayloadAPI(apiURL, {});
    useEffect(() => {
        const params = {};
        if (page)
            params.page = page;
        if (where)
            params.where = { and: [where, optionFilters] };
        if (sort)
            params.sort = sort;
        if (limit)
            params.limit = limit;
        setParams(params);
    }, [setParams, page, sort, where, limit, optionFilters]);
    useEffect(() => {
        if (!filterOptions || !isOpen) {
            return;
        }
        const newOptionFilters = getFilterOptionsQuery(filterOptions, {
            id,
            relationTo: collectionSlug,
            data: getData(),
            siblingData: getSiblingData(path),
            user,
        })[collectionSlug];
        if (!equal(newOptionFilters, optionFilters)) {
            setOptionFilters(newOptionFilters);
        }
    }, [collectionSlug, filterOptions, optionFilters, id, getData, getSiblingData, path, user, isOpen]);
    return (React.createElement(Modal, { className: classes, slug: modalSlug }, isOpen && (React.createElement(MinimalTemplate, { width: "wide" },
        React.createElement("header", { className: `${baseClass}__header` },
            React.createElement("div", null,
                React.createElement("h1", null,
                    ' ',
                    "Select existing",
                    ' ',
                    collection.labels.singular),
                React.createElement(Button, { icon: "x", round: true, buttonStyle: "icon-label", iconStyle: "with-border", onClick: closeAll })),
            description && (React.createElement("div", { className: `${baseClass}__sub-header` },
                React.createElement(ViewDescription, { description: description })))),
        React.createElement(ListControls, { collection: {
                ...collection,
                fields,
            }, enableColumns: false, enableSort: true, modifySearchQuery: false, handleSortChange: setSort, handleWhereChange: setWhere }),
        React.createElement(UploadGallery, { docs: data === null || data === void 0 ? void 0 : data.docs, collection: collection, onCardClick: (doc) => {
                setValue(doc);
                closeAll();
            } }),
        React.createElement("div", { className: `${baseClass}__page-controls` },
            React.createElement(Paginator, { limit: data.limit, totalPages: data.totalPages, page: data.page, hasPrevPage: data.hasPrevPage, hasNextPage: data.hasNextPage, prevPage: data.prevPage, nextPage: data.nextPage, numberOfNeighbors: 1, onChange: setPage, disableHistoryChange: true }),
            (data === null || data === void 0 ? void 0 : data.totalDocs) > 0 && (React.createElement(Fragment, null,
                React.createElement("div", { className: `${baseClass}__page-info` },
                    data.page,
                    "-",
                    data.totalPages > 1 ? data.limit : data.totalDocs,
                    ' ',
                    "of",
                    ' ',
                    data.totalDocs),
                React.createElement(PerPage, { limits: (_b = (_a = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _a === void 0 ? void 0 : _a.pagination) === null || _b === void 0 ? void 0 : _b.limits, limit: limit, modifySearchParams: false, handleChange: setLimit }))))))));
};
export default SelectExistingUploadModal;
