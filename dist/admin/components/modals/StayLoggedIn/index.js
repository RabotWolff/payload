import React from 'react';
import { useHistory } from 'react-router-dom';
import { useModal, Modal } from '@faceless-ui/modal';
import { useConfig } from '../../utilities/Config';
import MinimalTemplate from '../../templates/Minimal';
import Button from '../../elements/Button';
import './index.scss';
const baseClass = 'stay-logged-in';
const StayLoggedInModal = (props) => {
    const { refreshCookie } = props;
    const history = useHistory();
    const { routes: { admin } } = useConfig();
    const { closeAll: closeAllModals } = useModal();
    return (React.createElement(Modal, { className: baseClass, slug: "stay-logged-in" },
        React.createElement(MinimalTemplate, null,
            React.createElement("h1", null, "Stay logged in"),
            React.createElement("p", null, "You haven't been active in a little while and will shortly be automatically logged out for your own security. Would you like to stay logged in?"),
            React.createElement("div", { className: `${baseClass}__actions` },
                React.createElement(Button, { buttonStyle: "secondary", onClick: () => {
                        closeAllModals();
                        history.push(`${admin}/logout`);
                    } }, "Log out"),
                React.createElement(Button, { onClick: () => {
                        refreshCookie();
                        closeAllModals();
                    } }, "Stay logged in")))));
};
export default StayLoggedInModal;
