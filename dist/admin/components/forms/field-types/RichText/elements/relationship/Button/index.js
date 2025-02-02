import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Modal, useModal } from '@faceless-ui/modal';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { useConfig } from '../../../../../../utilities/Config';
import ElementButton from '../../Button';
import RelationshipIcon from '../../../../../../icons/Relationship';
import Form from '../../../../../Form';
import MinimalTemplate from '../../../../../../templates/Minimal';
import Button from '../../../../../../elements/Button';
import Submit from '../../../../../Submit';
import X from '../../../../../../icons/X';
import Fields from './Fields';
import { requests } from '../../../../../../../api';
import { injectVoidElement } from '../../injectVoid';
import './index.scss';
const initialFormData = {};
const baseClass = 'relationship-rich-text-button';
const insertRelationship = (editor, { value, relationTo }) => {
    const text = { text: ' ' };
    const relationship = {
        type: 'relationship',
        value,
        relationTo,
        children: [
            text,
        ],
    };
    if (editor.blurSelection) {
        Transforms.select(editor, editor.blurSelection);
    }
    injectVoidElement(editor, relationship);
    ReactEditor.focus(editor);
};
const RelationshipButton = ({ path }) => {
    const { open, closeAll } = useModal();
    const editor = useSlate();
    const { serverURL, routes: { api }, collections } = useConfig();
    const [renderModal, setRenderModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasEnabledCollections] = useState(() => collections.find(({ admin: { enableRichTextRelationship } }) => enableRichTextRelationship));
    const modalSlug = `${path}-add-relationship`;
    const handleAddRelationship = useCallback(async (_, { relationTo, value }) => {
        setLoading(true);
        const res = await requests.get(`${serverURL}${api}/${relationTo}/${value}?depth=0`);
        const json = await res.json();
        insertRelationship(editor, { value: { id: json.id }, relationTo });
        closeAll();
        setRenderModal(false);
        setLoading(false);
    }, [editor, closeAll, api, serverURL]);
    useEffect(() => {
        if (renderModal) {
            open(modalSlug);
        }
    }, [renderModal, open, modalSlug]);
    if (!hasEnabledCollections)
        return null;
    return (React.createElement(Fragment, null,
        React.createElement(ElementButton, { className: baseClass, format: "relationship", onClick: () => setRenderModal(true) },
            React.createElement(RelationshipIcon, null)),
        renderModal && (React.createElement(Modal, { slug: modalSlug, className: `${baseClass}__modal` },
            React.createElement(MinimalTemplate, null,
                React.createElement("header", { className: `${baseClass}__header` },
                    React.createElement("h3", null, "Add Relationship"),
                    React.createElement(Button, { buttonStyle: "none", onClick: () => {
                            closeAll();
                            setRenderModal(false);
                        } },
                        React.createElement(X, null))),
                React.createElement(Form, { onSubmit: handleAddRelationship, initialData: initialFormData, disabled: loading },
                    React.createElement(Fields, null),
                    React.createElement(Submit, null, "Add relationship")))))));
};
export default RelationshipButton;
