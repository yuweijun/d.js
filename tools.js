(function() {

    var stack = new document.$.Stack;

    var outlined = (function* () {
        while(true) {
            document.$("*").forEach(function(elem) {
                elem.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
            });
            yield;

            document.$("*").forEach(elem => (elem.style.outline = "0"));
            yield;
        }
    })();

    var encode = function(s = '') {
        return encodeURIComponent(s).toLowerCase();
    };

    var youdao = function() {
        let s = document.$.selection();
        open('http://dict.youdao.com/w/' + encode(s)).focus();
    };

    var dict = function() {
        let s = document.$.selection();
        open('http://dict.cn/' + encode(s)).focus();
    };

    var translate = function() {
        let s = document.$.selection();
        open('https://translate.google.com/#en/zh-CN/' + encode(s)).focus();
    };

    document.addEventListener('keydown', function(e) {
        if (document.querySelectorAll('input:focus, textarea:focus, select:focus').length) return;

        let k = e.key;
        stack.push(k);
        stack.match(k, 'bb', outlined.next.bind(outlined));
        stack.match(k, 'tt', translate);
        stack.match(k, 'yt', youdao);
        stack.match(k, 'dt', dict);

    });

})();

