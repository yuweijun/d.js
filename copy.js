(function() {

    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            e.preventDefault();
            if (e.which === 67) {
                var s = document.$.selection();
                if (s.length) {
                    s = s.replace(/\u00A0/g, ' ');
                    console.log("copy", s);
                }
                GM_setClipboard(s, {type: 'text', mimetype: 'text/plain'});
            } else if (e.which === 82) {
                // console.log('reload window');
                window.location.reload();
            } else if (e.which == 87) {
                // console.log('close window');
                window.close();
            }
        }
    });

})();

