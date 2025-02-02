// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - need to do this because this file doesn't actually exist
import config from 'payload-config';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ScrollInfoProvider } from '@faceless-ui/scroll-info';
import { WindowInfoProvider } from '@faceless-ui/window-info';
import { ModalProvider, ModalContainer } from '@faceless-ui/modal';
import { ToastContainer, Slide } from 'react-toastify';
import { AuthProvider } from './components/utilities/Auth';
import { ConfigProvider } from './components/utilities/Config';
import { PreferencesProvider } from './components/utilities/Preferences';
import { CustomProvider } from './components/utilities/CustomProvider';
import { SearchParamsProvider } from './components/utilities/SearchParams';
import { LocaleProvider } from './components/utilities/Locale';
import Routes from './components/Routes';
import { StepNavProvider } from './components/elements/StepNav';
import './scss/app.scss';
const Index = () => (React.createElement(React.Fragment, null,
    React.createElement(ConfigProvider, { config: config },
        React.createElement(WindowInfoProvider, { breakpoints: {
                xs: '(max-width: 400px)',
                s: '(max-width: 768px)',
                m: '(max-width: 1024px)',
                l: '(max-width: 1440px)',
            } },
            React.createElement(ScrollInfoProvider, null,
                React.createElement(Router, null,
                    React.createElement(ModalProvider, { classPrefix: "payload", zIndex: 50 },
                        React.createElement(AuthProvider, null,
                            React.createElement(PreferencesProvider, null,
                                React.createElement(SearchParamsProvider, null,
                                    React.createElement(LocaleProvider, null,
                                        React.createElement(StepNavProvider, null,
                                            React.createElement(CustomProvider, null,
                                                React.createElement(Routes, null))))),
                                React.createElement(ModalContainer, null)))))))),
    React.createElement(ToastContainer, { position: "bottom-center", transition: Slide, icon: false })));
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(React.createElement(Index, null));
// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
