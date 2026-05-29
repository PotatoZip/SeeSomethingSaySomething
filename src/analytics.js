import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-HYTP4LMG39';

export const initializeAnalytics = () => {
    if (!MEASUREMENT_ID) {
        return;
    }

    ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
    if (!MEASUREMENT_ID) {
        return;
    }

    ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: document.title,
    });
};

export const trackInteraction = (eventName, params = {}) => {
    ReactGA.gtag('event', eventName, {
        ...params,
        debug_mode: import.meta.env.DEV,
    });
};
