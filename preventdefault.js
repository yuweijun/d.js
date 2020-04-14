// ==UserScript==
// @name         click.prevent.default
// @namespace    http://tampermonkey.net/
// @version      2020.04.18
// @author       test.yu
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    document.$.Stack.register('cc', function() {
        document.$('a').click(function(e){
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    });
})();