/**
 * this script is only for mobile browser
 */
(function() {
    let outline = "1px dashed #" + (~~(Math.random() * (1 << 24))).toString(16);

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: ${outline}; }
    </style>`);

    let extendTarget = function(e) {
        if (window.outlinedTarget && window.outlinedTarget.length) {
            if (window.outlinedTarget[0].tagName === 'BODY') {
                return;
            }
            window.outlinedTarget = window.outlinedTarget.parent();
        } else {
            window.outlinedTarget = document.$(e.target);
        }

        document.$('.target-outline').removeClass('target-outline');
        window.outlinedTarget.addClass('target-outline');
    };

    let doubleTapped = false;
    let tapHandler = function(event) {
        if (!doubleTapped) {
            doubleTapped = true;
            setTimeout(function() { doubleTapped = false; }, 300);
            return false;
        } else {
            extendTarget(event);
            doubleTapped =false;
        }
    }

    document.addEventListener('touchstart', tapHandler);
})();
