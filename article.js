(function() {

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: 2px solid rgba(8, 8, 4, .4); }
    </style>`);

    const stack = new document.$.Stack(4, 1000);

    let prevented = false,
        target;

    let documentClick = function(e) {
        e.preventDefault();
        return false;
    };

    let extendTarget = function(e) {
        if (target) {
            if (target[0].tagName === 'BODY') {
                return;
            }
            target = target.parent();
        } else {
            target = document.$(e.target);
        }

        document.$('.target-outline').removeClass('target-outline');
        target.addClass('target-outline');
    };

    let removeTarget = function() {
        window.getSelection().deleteFromDocument();
        if (target) {
            target.remove();
            target = null;
        }
    };

    document.addEventListener('dblclick', extendTarget);

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            document.$('.target-outline').removeClass('target-outline');
            if (prevented) {
                prevented = !prevented;
                document.removeEventListener('click', documentClick, true);
            }
            target = null;
        }
    });

    let render = function() {
        let keys = stack.dump();
        if (target) {
            if (!prevented) {
                prevented = !prevented;
                document.addEventListener('click', documentClick, true);
            }
            target.removeClass('target-outline');
            NodeList.prototype.readable.apply(target);
            target = null;
        } else {
            document.querySelectorAll('article').readable();
        }
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.which);
        stack.match('dd', render);
        stack.match('a', extendTarget);
        stack.match('x', removeTarget);
    });

    Object.defineProperty(NodeList.prototype, 'readable', {
        enumerable: false,
        value() {
            if (this.length === 0) return this;

            let parents = document.$(this).parents();

            this.forEach(function(elem) {
                while (elem && elem.tagName.toUpperCase() !== 'BODY') {
                    let $elem = document.$(elem);
                    $elem.css({
                        padding: 0,
                        margin: '0 auto',
                        display: 'block',
                        width: '100%',
                        maxWidth: '1024px',
                        minWidth: 'auto',
                        fontSize: 'medium',
                        position: 'static'
                    });

                    $elem.siblings().filter(function(elem) {
                        if (elem.tagName.toUpperCase() === 'LINK') {
                            return false;
                        }
                        if (parents.indexOf(elem) > -1) {
                            return false;
                        }
                        return true;
                    }).remove();

                    elem = elem.parentNode;
                }
            });

            document.$(this).css({
                padding: '15px',
                boxSizing: 'border-box'
            });

            document.$('head script').remove();
            document.$('head').append(document.body.querySelectorAll('link'));
            document.body.style.height = document.documentElement.scrollHeight + 'px';

            return this;
        }
    });

})();

