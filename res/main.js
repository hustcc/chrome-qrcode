require("./main.css");
var qrgen = require("../node_modules/jsqrgen");

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

    function convertImgToBase64(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null; 
        };
        img.src = url;
    }

    chrome.tabs.getSelected(null, function(tab) {
        var favicon_dom = $_id("favicon");
        var qrcode_dom = $_id("qrcode");

        favicon_dom.onerror = function() {
            favicon_dom.src = "icon/icon_32.png";
            favicon_dom.onerror = null;
        }
        if (tab.favIconUrl) {
            favicon_dom.src = tab.favIconUrl;
            show(favicon_dom);
        }
        var url = tab.url || "http://www.atool.org";

        var colorIn = "#191970";
        var colorOut = "#cd5c5c";
        var colorFore = "#4169e1";
        var colorBack = "#ffffff";
        var options = {
            cellSize: 8,
            foreground: [
                // foreground color
                {style: colorFore},
                // outer squares of the positioner
                {row: 0, rows: 7, col: 0, cols: 7, style: colorOut},
                {row: -7, rows: 7, col: 0, cols: 7, style: colorOut},
                {row: 0, rows: 7, col: -7, cols: 7, style: colorOut},
                // inner squares of the positioner
                {row: 2, rows: 3, col: 2, cols: 3, style: colorIn},
                {row: -5, rows: 3, col: 2, cols: 3, style: colorIn},
                {row: 2, rows: 3, col: -5, cols: 3, style: colorIn},
            ],
            background: colorBack,
            data: url,
            typeNumber: 1,
            "effect": {
                "key": "round",
                "value": 0
            },
            // "logo": {
            //     "image": favicon_dom,
            //     "size": 0.13
            // }
        };

        try { 
            qrcode_dom.src = qrgen.canvas(options).toDataURL();
        } catch (e) {
        }
        
        // 请求获取短网址
        url = encodeURI(url);
        $.getJSON(
            'http://hust.cc/shorten?url=' + url,
            function (data) {
                if (data.status == 1) {
                    $_id("short_url").value = data.s_url;
                    options.data = data.s_url;
                    try { 
                        qrcode_dom.src = qrgen.canvas(options).toDataURL();
                    } catch (e) {
                        $_id("short_url").value = url;
                    }
                } else {
                    $_id("short_url").value = url;
                }
            }
        );

        //选中文本复制
        $_id("short_url").onclick = function() {
            $_id("short_url").select();
            var short_url = $_id("short_url").value;
            document.execCommand("Copy");
            $_id("short_url").value = "Copied. ^_^!";
            setTimeout(function() {
                $_id("short_url").value = short_url;
            }, 1000);
        }
    });
})();