(function() {

    var Stack = document.$.Stack;

    var outlined = (function*() {
        while (true) {
            document.$("body *").forEach(function(elem) {
                elem.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
            });
            yield;

            document.$("body *").css({
                outline: ''
            });
            yield;
        }
    })();

    let encode = function(s = '') {
        return encodeURIComponent(s);
    };

    let removeLineNumber = function() {
        document.$('[data-line-number]').remove();

        document.$('.gutter').attr({
            'style': 'border-left: 4px solid #903 !important'
        });
        document.$('.gutter .line').remove();

        document.$('.crayon-main').css({borderLeft: "4px solid #903"});
        document.$('.crayon-nums-content, .crayon-toolbar').remove();

        [...document.querySelectorAll('ol[start], pre ol')].forEach(function(e) {
            const styles = window.getComputedStyle(e);
            const fragment = document.createDocumentFragment();
            const ul = document.createElement('ul');

            [...e.children].forEach(function(li) {
                li.style.listStyle = 'none';
                fragment.appendChild(li);
            });
            ul.style.listStyle = 'none';
            ul.style.border = styles.getPropertyValue('border');
            ul.style.borderLeft = '4px solid #903';
            ul.style.padding = '0 0 0 15px';
            ul.style.marginLeft = 0;
            ul.style.background = styles.getPropertyValue('background');
            ul.appendChild(fragment);

            e.parentNode.replaceChild(ul, e);
        });
    };

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            document.$('body *').css({
                outline: ''
            });
        }
    });

    Stack.register('dl', removeLineNumber);

    Stack.register('bb', outlined.next.bind(outlined));

    Stack.register('tt', function() {
        let s = document.$.selection();
        open('https://translate.google.dn/#en/zh-CN/' + encode(s)).focus();
    });

    Stack.register('yt', function() {
        let s = document.$.selection();
        open('http://dict.youdao.com/w/' + encode(s)).focus();
    });

    Stack.register('dt', function() {
        let s = document.$.selection();
        open('http://dict.cn/' + encode(s)).focus();
    });

    // gg has been used by vim action
    Stack.register('gq', function() {
        let s = document.$.selection();
        if (s) {
            open('https://www.google.com/search?q=' + encode(s)).focus();
        } else {
            open('https://www.google.com/').focus();
        }
    });

    Stack.register('gt', function() {
        open('https://github.com/').focus();
    });

    Stack.register('ev', function() {
        open('https://app.yinxiang.com/Home.action').focus();
    });

})();
