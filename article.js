(function() {

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: 1px dashed rgba(128, 128, 128, .5); }
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
            target && target.removeClass('target-outline');
            document.$(parents.pop() || target).tee().readable();
        } else {
            document.$('article').tee().readable();
        }
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.which);
        stack.match(/^\d*dd$/, render);
        stack.match('xx', function () {
            target && target.remove();
        });
    });

})();

