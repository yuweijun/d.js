(function() {

    document.head.insertAdjacentHTML('beforeend', `<style id="tampermonkey-outline-style">
        .target-outline { outline: 2px dashed rgba(128, 128, 128, .5); }
    </style>`);

    var stack = new document.$.Stack(4, 1000);

    var parents = [], target;

    document.addEventListener('dblclick', function(e) {
        target = e.target;
        document.$('.target-outline').removeClass('target-outline');
        parents = document.$(target).addClass('target-outline').parents().slice(0, -2);
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
            document.$(parents.pop() || target).tee().readable();
        } else {
            document.$('article').tee().readable();
        }
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.which);
        stack.match(/^\d*dd$/, render);
    });

})();

