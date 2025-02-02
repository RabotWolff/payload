import React, { Fragment, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, useModal } from '@faceless-ui/modal';
import { useHistory } from 'react-router-dom';
import { useConfig } from '../../../utilities/Config';
import { Button, MinimalTemplate, Pill } from '../../..';
import { requests } from '../../../../api';
import './index.scss';
const baseClass = 'restore-version';
const modalSlug = 'restore-version';
const Restore = ({ collection, global, className, versionID, originalDocID, versionDate }) => {
    const { serverURL, routes: { api, admin } } = useConfig();
    const history = useHistory();
    const { toggle } = useModal();
    const [processing, setProcessing] = useState(false);
    let fetchURL = `${serverURL}${api}`;
    let redirectURL;
    let restoreMessage;
    if (collection) {
        fetchURL = `${fetchURL}/${collection.slug}/versions/${versionID}`;
        redirectURL = `${admin}/collections/${collection.slug}/${originalDocID}`;
        restoreMessage = `You are about to restore this ${collection.labels.singular} document to the state that it was in on ${versionDate}.`;
    }
    if (global) {
        fetchURL = `${fetchURL}/globals/${global.slug}/versions/${versionID}`;
        redirectURL = `${admin}/globals/${global.slug}`;
        restoreMessage = `You are about to restore the global ${global.label} to the state that it was in on ${versionDate}.`;
    }
    const handleRestore = useCallback(async () => {
        setProcessing(true);
        const res = await requests.post(fetchURL);
        if (res.status === 200) {
            const json = await res.json();
            toast.success(json.message);
            history.push(redirectURL);
        }
        else {
            toast.error('There was a problem while restoring this version.');
        }
    }, [history, fetchURL, redirectURL]);
    return (React.createElement(Fragment, null,
        React.createElement(Pill, { onClick: () => toggle(modalSlug), className: [baseClass, className].filter(Boolean).join(' ') }, "Restore this version"),
        React.createElement(Modal, { slug: modalSlug, className: `${baseClass}__modal` },
            React.createElement(MinimalTemplate, null,
                React.createElement("h1", null, "Confirm version restoration"),
                React.createElement("p", null, restoreMessage),
                React.createElement(Button, { buttonStyle: "secondary", type: "button", onClick: processing ? undefined : () => toggle(modalSlug) }, "Cancel"),
                React.createElement(Button, { onClick: processing ? undefined : handleRestore }, processing ? 'Restoring...' : 'Confirm')))));
};
export default Restore;
