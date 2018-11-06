(function() {

    var stack = new document.$.Stack;

    var parents = [];

    document.addEventListener('dblclick', function(e) {
        parents = document.$(e.target).parents().slice(0, -2);
    });

    var render = function() {
        if (parents.length) {
            document.$(parents.pop()).tee().readable();
        } else {
            document.$('article').tee().readable();
        }
    };

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        stack.push(e.key);

        if (stack.match(e.key, 'dd')) {
            render();
        }
    });

})();

