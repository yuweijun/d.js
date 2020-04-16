(function() {
    const key = window.location.hostname;

    if (window[key]) {
        return;
    };

    window[key] = true;

    Object.defineProperties(window.navigator, {
        'userAgent': {
            enumerable: true,
            value: 'Mozilla/5.0 (Windows Phone 10)'
        },
        'appVersion': {
            enumerable: true,
            value: '5.0 (Windows Phone 10)'
        },
        'platform': {
            enumerable: true,
            value: 'Win32'
        }
    });

    function observe({ targetNode, callback = () => {} }) {
        if (!targetNode) {
            return;
        };

        const config = Object.assign({ attributes: false, childList: true, subtree: true });
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    };

    observe({
        targetNode: document.documentElement,
        callback(mutations, observer) {
            document.$('.MobileAppHeader-downloadLink, .HotBanner, .HotQuestions-bottomButton').remove();
            document.$('button.ContentItem-action, .MobileAppHeader-inner').remove();
            document.$('.ContentItem-expandButton').click();
        }
    });

})();