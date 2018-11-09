(function() {

    var stack = new document.$.Stack;

    var outlined = (function*() {
        while (true) {
            document.$("body *").forEach(function(elem) {
                elem.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
            });
            yield;

            document.$("body *").css({outline: ''});
            yield;
        }
    })();

    var encode = function(s = '') {
        return encodeURIComponent(s).toLowerCase();
    };

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            document.$('body *').css({outline: ''});
        }
    });

    document.addEventListener('keydown', function(e) {
        if (document.$.focused()) return;

        let k = e.which;
        stack.push(k);

        stack.match('bb', outlined.next.bind(outlined));

        stack.match('tt', function() {
            let s = document.$.selection();
            open('https://translate.google.com/#en/zh-CN/' + encode(s)).focus();
        });

        stack.match('yt', function() {
            let s = document.$.selection();
            open('http://dict.youdao.com/w/' + encode(s)).focus();
        });

        stack.match('dt', function() {
            let s = document.$.selection();
            open('http://dict.cn/' + encode(s)).focus();
        });

        stack.match('ev', function() {
            open('https://app.yinxiang.com/Home.action').focus();
        });

    });

})();

