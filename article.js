(function() {

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: 1px dashed rgba(202, 96, 133, .5); }
    </style>`);

    var stack = new document.$.Stack(4, 1000);

    var parents = [],
        target;

    document.addEventListener('dblclick', function(e) {
        target = document.$(e.target);
        parents = target.parents().slice(0, -2);

        if (target.hasClass('target-outline')) {
            target.removeClass('target-outline');
        } else {
            document.$('.target-outline').removeClass('target-outline');
            target.addClass('target-outline');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            target = null;
            document.$('.target-outline').removeClass('target-outline');
        }
    });

    var render = function() {
        let keys = stack.dump();
        if (parents.length) {
            if (/^\d+dd$/.test(keys)) {
                let times = Number.parseInt(keys, 10) - 1;
                for (let i = 0; i < times; i++) {
                    parents.pop();
                }
            }
            if (target) target.removeClass('target-outline');
            NodeList.prototype.readable.apply.(document.$(parents.pop() || target));
        } else {
            document.querySelectorAll('article').readable();
        }
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.which);
        stack.match(/^\d*dd$/, render);
        stack.match('xx', function () {
            window.getSelection().deleteFromDocument();
            if (target) {
                target.remove();
            }
        });
    });

    Object.defineProperty(NodeList.prototype, 'readable', {
        value() {
            if (this.length === 0) return this;

            var parents = document.$(this).parents();

            this.forEach(function(elem) {
                while (elem && elem.tagName.toUpperCase() !== 'BODY') {
                    var $elem = document.$(elem);
                    $elem.css({
                        padding: 0,
                        margin: '0 auto',
                        display: 'block',
                        width: '100%',
                        maxWidth: '1024px',
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
        },
        enumerable: false
    });

})();

