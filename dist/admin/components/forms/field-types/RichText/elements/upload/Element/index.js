import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from '@faceless-ui/modal';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic, useFocused, useSelected } from 'slate-react';
import { useConfig } from '../../../../../../utilities/Config';
import usePayloadAPI from '../../../../../../../hooks/usePayloadAPI';
import FileGraphic from '../../../../../../graphics/File';
import useThumbnail from '../../../../../../../hooks/useThumbnail';
import Button from '../../../../../../elements/Button';
import { SwapUploadModal } from './SwapUploadModal';
import { EditModal } from './EditModal';
import './index.scss';
const baseClass = 'rich-text-upload';
const initialParams = {
    depth: 0,
};
const Element = ({ attributes, children, element, path, fieldProps }) => {
    var _a, _b, _c, _d;
    const { relationTo, value } = element;
    const { closeAll, open } = useModal();
    const { collections, serverURL, routes: { api } } = useConfig();
    const [modalToRender, setModalToRender] = useState(undefined);
    const [relatedCollection, setRelatedCollection] = useState(() => collections.find((coll) => coll.slug === relationTo));
    const editor = useSlateStatic();
    const selected = useSelected();
    const focused = useFocused();
    const modalSlug = `${path}-edit-upload-${modalToRender}`;
    // Get the referenced document
    const [{ data: upload }] = usePayloadAPI(`${serverURL}${api}/${relatedCollection.slug}/${value === null || value === void 0 ? void 0 : value.id}`, { initialParams });
    const thumbnailSRC = useThumbnail(relatedCollection, upload);
    const removeUpload = useCallback(() => {
        const elementPath = ReactEditor.findPath(editor, element);
        Transforms.removeNodes(editor, { at: elementPath });
    }, [editor, element]);
    const closeModal = useCallback(() => {
        closeAll();
        setModalToRender(null);
    }, [closeAll]);
    useEffect(() => {
        if (modalToRender && modalSlug) {
            open(`${modalSlug}`);
        }
    }, [modalToRender, open, modalSlug]);
    const fieldSchema = (_d = (_c = (_b = (_a = fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.admin) === null || _a === void 0 ? void 0 : _a.upload) === null || _b === void 0 ? void 0 : _b.collections) === null || _c === void 0 ? void 0 : _c[relatedCollection.slug]) === null || _d === void 0 ? void 0 : _d.fields;
    return (React.createElement("div", { className: [
            baseClass,
            (selected && focused) && `${baseClass}--selected`,
        ].filter(Boolean).join(' '), contentEditable: false, ...attributes },
        React.createElement("div", { className: `${baseClass}__card` },
            React.createElement("div", { className: `${baseClass}__topRow` },
                React.createElement("div", { className: `${baseClass}__thumbnail` }, thumbnailSRC ? (React.createElement("img", { src: thumbnailSRC, alt: upload === null || upload === void 0 ? void 0 : upload.filename })) : (React.createElement(FileGraphic, null))),
                React.createElement("div", { className: `${baseClass}__topRowRightPanel` },
                    React.createElement("div", { className: `${baseClass}__collectionLabel` }, relatedCollection.labels.singular),
                    React.createElement("div", { className: `${baseClass}__actions` },
                        fieldSchema && (React.createElement(Button, { icon: "edit", round: true, buttonStyle: "icon-label", className: `${baseClass}__actionButton`, onClick: (e) => {
                                e.preventDefault();
                                setModalToRender('edit');
                            }, tooltip: "Edit" })),
                        React.createElement(Button, { icon: "swap", round: true, buttonStyle: "icon-label", className: `${baseClass}__actionButton`, onClick: (e) => {
                                e.preventDefault();
                                setModalToRender('swap');
                            }, tooltip: "Swap Upload" }),
                        React.createElement(Button, { icon: "x", round: true, buttonStyle: "icon-label", className: `${baseClass}__actionButton`, onClick: (e) => {
                                e.preventDefault();
                                removeUpload();
                            }, tooltip: "Remove Upload" })))),
            React.createElement("div", { className: `${baseClass}__bottomRow` },
                React.createElement("h5", null, upload === null || upload === void 0 ? void 0 : upload.filename))),
        children,
        modalToRender === 'swap' && (React.createElement(SwapUploadModal, { slug: modalSlug, element: element, closeModal: closeModal, setRelatedCollectionConfig: setRelatedCollection, relatedCollectionConfig: relatedCollection })),
        (modalToRender === 'edit' && fieldSchema) && (React.createElement(EditModal, { slug: modalSlug, closeModal: closeModal, relatedCollectionConfig: relatedCollection, fieldSchema: fieldSchema, element: element }))));
};
export default Element;
