(function() {

    Object.defineProperty(NodeList.prototype, 'readable', {
        enumerable: false,
        value() {
            if (this.length === 0) return this;

            let parents = document.$(this).parents();

            this.forEach(function(elem) {
                while (elem && elem.tagName.toUpperCase() !== 'BODY') {
                    let $elem = document.$(elem);
                    $elem.css({
                        padding: 0,
                        margin: '0 auto',
                        display: 'block',
                        width: '100%',
                        maxWidth: '1024px',
                        minWidth: 'auto',
                        fontSize: 'medium',
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
        }
    });

})();
