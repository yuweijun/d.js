(function() {
    let outline = "1px dashed #" + (~~(Math.random() * (1 << 24))).toString(16);

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: ${outline}; }
    </style>`);

    const stack = new document.$.Stack(4, 1000);

    let prevented = false;

    let documentClick = function(e) {
        e.preventDefault();
        return false;
    };

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

    let removeTarget = function() {
        window.getSelection().deleteFromDocument();
        if (window.outlinedTarget) {
            window.outlinedTarget.remove();
            window.outlinedTarget = null;
        }
    };

    document.addEventListener('dblclick', extendTarget);

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            document.body.contentEditable = false;
            document.$('.target-outline').removeClass('target-outline');
            if (prevented) {
                prevented = !prevented;
                document.removeEventListener('click', documentClick, true);
            }
            window.outlinedTarget = null;
        }
    });

    let render = function() {
        if (window.outlinedTarget) {
            if (!prevented) {
                prevented = !prevented;
                document.addEventListener('click', documentClick, true);
            }
            window.outlinedTarget.removeClass('target-outline');
            NodeList.prototype.readable.apply(window.outlinedTarget);
            window.outlinedTarget = null;
        } else {
            document.querySelectorAll('article').readable();
        }
    };

    let editBody = function() {
        document.body.contentEditable = true;
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.which);
        stack.match('dd', render);
        stack.match('ed', editBody);
        stack.match('a', extendTarget);
        stack.match('x', removeTarget);
    });

})();

