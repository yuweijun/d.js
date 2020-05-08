(function() {

    var stack = new document.$.Stack;

    document.addEventListener('keydown', function(e) {

        if (document.$.focused()) return;

        if (e.shiftKey) {
            var height = document.documentElement.scrollHeight;

            if (e.which === 71) {
                // console.log('G');
                window.scrollBy({
                    top: height
                });
            } else if (e.which === 72) {
                // console.log('H');
                window.scroll({
                    top: 0
                });
            } else if (e.which === 77) {
                // console.log("m");
                window.scroll({
                    top: height / 2
                });
            } else if (e.which === 74) {
                // console.log('J');
                // chrome default scroll 40px using arrow keys
                window.scrollBy({
                    top: 1
                });
            } else if (e.which === 75) {
                // console.log('K');
                window.scrollBy({
                    top: -1
                });
            }
        } else if (e.ctrlKey) {
            var page = Math.floor(window.innerHeight / 50) * 50;
            if (e.which === 70) {
                // console.log('f');
                // default action is bookmark
                e.preventDefault();
                window.scrollBy({
                    top: page
                });
            } else if (e.which === 85) {
                // console.log('u');
                // default action is source code
                e.preventDefault();
                window.scrollBy({
                    top: -page
                });
            }
        } else if (e.metaKey) {
            // console.log("e.metaKey", e.metaKey);
        } else if (e.altKey) {
            // console.log("e.altKey", e.altKey);
        } else {
            // check combination key shortcuts firstly
            stack.push(e.which);
            stack.match('gg', function() {
                window.scroll({
                    top: 0
                });
                return;
            });

            if (e.which === 27) {
                // console.log('Escape');
                stack.clear();
            } else if (e.which === 74) {
                // console.log('j');
                // chrome default scroll 40px using arrow keys
                window.scrollBy({
                    top: 50
                });
            } else if (e.which === 75) {
                // console.log('k');
                window.scrollBy({
                    top: -50
                });
            }
        }

    });

})();
