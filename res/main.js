require('./main.css');
var qrgen = require('../node_modules/jsqrgen');

(function() {
    function $_id(id) {
        return document.getElementById(id);
    }
    function show(dom) {
        dom.style.display = "block";
    }
    function hide(dom) {
        dom.style.display = "none";
    }
    chrome.tabs.getSelected(null, function(tab) {
        var favicon_dom = $_id("favicon");
        var qrcode_dom = $_id("qrcode");
        favicon_dom.onerror = function() {
            favicon_dom.src = "icon_32.png";
            favicon_dom.onerror = null;
        } 
        if (tab.favIconUrl) {
            favicon_dom.src = tab.favIconUrl;
            show(favicon_dom);
        }
        var url = tab.url;
        var options = {
            "cellSize": 8,
            "foreground": [
                {
                    "style": "#4169e1"
                },
                {
                    "row": 0,
                    "rows": 7,
                    "col": 0,
                    "cols": 7,
                    "style": "#cd5c5c"
                },
                {
                    "row": -7,
                    "rows": 7,
                    "col": 0,
                    "cols": 7,
                    "style": "#cd5c5c"
                },
                {
                    "row": 0,
                    "rows": 7,
                    "col": -7,
                    "cols": 7,
                    "style": "#cd5c5c"
                },
                {
                    "row": 2,
                    "rows": 3,
                    "col": 2,
                    "cols": 3,
                    "style": "#191970"
                },
                {
                    "row": -5,
                    "rows": 3,
                    "col": 2,
                    "cols": 3,
                    "style": "#191970"
                },
                {
                    "row": 2,
                    "rows": 3,
                    "col": -5,
                    "cols": 3,
                    "style": "#191970"
                }
            ],
            "background": "#ffffff",
            "data": url,
            "typeNumber": 1,
            "effect": {
                "key": "round",
                "value": 0
            }
        }
        qrcode_dom.src = qrgen.canvas(options).toDataURL();
    });
})();