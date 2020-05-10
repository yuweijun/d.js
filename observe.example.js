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

    document.$(document.documentElement).observe(function() {
            document.$('.Question-sideColumn').remove();
            document.$('.MobileAppHeader-downloadLink, .HotBanner, .HotQuestions-bottomButton').remove();
            document.$('button.ContentItem-action, .Popover > button, .MobileAppHeader-inner').remove();
            document.$('.ContentItem-expandButton').click();
            document.$('iframe[src^="https://pos.baidu.com/"]').remove();
        }
    );

})();