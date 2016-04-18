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
        var options = get_qrcode_option(url);
        
        try { 
            qrcode_dom.src = qrgen.canvas(options).toDataURL();
            $_id("short_url").value = url;
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