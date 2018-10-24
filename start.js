// ==UserScript==
// @name         start.js
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       test.yu
// @match        http*://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {

    document.head.insertAdjacentHTML('beforeend', '<style id="tampermonkey-hide-body">body {visibility: hidden; overflow: hidden;} aside {display: none;}</style>');

    var fn = function() {
        document.head.querySelector('#tampermonkey-hide-body').remove();
    };
    var timeId = setTimeout(fn, 3000);

    document.addEventListener('DOMContentLoaded', function(){
        clearTimeout(timeId);
        setTimeout(fn, 50);
    }, false);

})();
