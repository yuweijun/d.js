// ==UserScript==
// @name         prevent.default
// @namespace    http://tampermonkey.net/
// @version      2018.11.06
// @author       test.yu
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    let fn = function(e) {
        e.preventDefault();
        return false;
    };

    let prevent = false;
    let action = function() {
        if (!prevent) {
            prevent = true;
            document.querySelectorAll('a').forEach(function(elem) {
                elem.addEventListener('click', fn, false);
            });
        } else {
            prevent = false;
            document.querySelectorAll('a').forEach(function(elem) {
                elem.removeEventListener('click', fn, false);
            });
        }
    };

    document.$.Stack.register('cc', action);

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) action();
    });
})();
