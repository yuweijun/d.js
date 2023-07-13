setTimeout(function() {
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);

    let article = document.$('article, .article, .post');
    if (article.lenght > 0) {
        let text = '';
        article.forEach(e => text += e.innerText);
        transfer.value = text;
    } else {
        transfer.value = document.body.innerText;
    }

    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();

    document.body.removeChild(transfer);
}, 1500);
