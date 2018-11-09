(function() {

    var stack = new document.$.Stack(3, 1000);

    var parents = [], target;

    document.addEventListener('dblclick', function(e) {
        target = e.target;
        parents = document.$(target).parents().slice(0, -2);
    });

    var render = function() {
        let keys = stack.dump();
        if (parents.length) {
            if (/^\ddd$/.test(keys)) {
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
        stack.match(/^\d?dd$/, render);
    });

})();


