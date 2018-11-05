(function() {

    var stack = new document.$.Stack;

    var outlined = (function*() {
        while (true) {
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

    document.addEventListener('keydown', function(e) {
        if (document.querySelectorAll('input:focus, textarea:focus, select:focus').length) return;

        let k = e.key;
        stack.push(k);

        stack.match(k, 'bb', outlined.next.bind(outlined));

        stack.match(k, 'tt', function() {
            let s = document.$.selection();
            open('https://translate.google.com/#en/zh-CN/' + encode(s)).focus();
        });

        stack.match(k, 'yt', function() {
            let s = document.$.selection();
            open('http://dict.youdao.com/w/' + encode(s)).focus();
        });

        stack.match(k, 'dt', function() {
            let s = document.$.selection();
            open('http://dict.cn/' + encode(s)).focus();
        });

        stack.match(k, 'ev', function() {
            open('https://app.yinxiang.com/Home.action').focus();
        });

    });

})();

