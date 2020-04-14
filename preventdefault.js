// ==UserScript==
// @name         click.prevent.default
// @namespace    http://tampermonkey.net/
// @version      2020.04.18
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
    document.$.Stack.register('cc', function() {
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
    });
})();