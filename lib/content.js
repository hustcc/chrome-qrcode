function $_id(id) {
    return document.getElementById(id);
}
function showResult(dom, base64, text) {
    if (base64) {
        dom.innerHTML = '<div style="position:fixed;top:0;right:0;bottom:0;left:0;background:#f1f1f1;background:rgba(0,0,0,0.39);z-index:99999" onclick="this.parentNode.innerHTML=\' \';"></div>' + 
                        '<div style="position:fixed;top:80px;left:50%;margin-left:-121px;padding:10px 20px;width:260px;border:1px solid #d9d9d9;background:#fff;text-align:center;z-index:100000;">' + 
                            '<a href="javascript:;" onclick="this.parentNode.parentNode.innerHTML=\' \';" style="position:absolute;top:5px;right:10px;display:block;width:20px;height:20px;font-size:20px;cursor:pointer">×</a>' + 
                            '<p>' + chrome.i18n.getMessage("showQRcodeImg") + '</p>' + 
                            '<img style="margin: 10px auto;" width="220" height="220" src="' + base64 + '" />' + 
                            '<p><input id="atool_chrome_qrcode_plugin_text" style="width: 100%;padding:5px 0;border:1px solid #E5E5DB;background:#FFF;color:#47433F;" value=\'' + text + '\'></input></p>' + 
                        '</div>';
    }
    else {
        dom.innerHTML = '<div style="position:fixed;top:0;right:0;bottom:0;left:0;background:#f1f1f1;background:rgba(0,0,0,0.39);z-index:99999" onclick="this.parentNode.innerHTML=\' \';"></div>' + 
                        '<div style="position:fixed;top:80px;left:50%;margin-left:-121px;padding:10px 20px;width:260px;border:1px solid #d9d9d9;background:#fff;text-align:center;z-index:100000;">' + 
                            '<a href="javascript:;" onclick="this.parentNode.parentNode.innerHTML=\' \';" style="position:absolute;top:5px;right:10px;display:block;width:20px;height:20px;font-size:20px;cursor:pointer">×</a>' + 
                            '<p>' + chrome.i18n.getMessage("showDecodeText") + '</p>' + 
                            '<p style="margin-top:10px;"><input id="atool_chrome_qrcode_plugin_text" style="width: 100%;padding:5px 0;border:1px solid #E5E5DB;background:#FFF;color:#47433F;" value=\'' + text + '\'></input></p>' + 
                        '</div>';
    }
    dom.style.display = "block"; // show

    //copied
    var plugin_text = $_id("atool_chrome_qrcode_plugin_text");
    plugin_text.onclick = function() {
        plugin_text.select();
        var text = plugin_text.value;
        document.execCommand("Copy");
        plugin_text.value = chrome.i18n.getMessage("copied");
        plugin_text.style.color = "green";
        setTimeout(function() {
            plugin_text.value = text;
            plugin_text.style.color = "black";
        }, 1000);
    }
    return false;
}

function getMaskContainer() {
    var qrcode_div = $_id("atool_chrome_qrcode_plugin");
    if (!qrcode_div) {
        qrcode_div = document.createElement("div");
        qrcode_div.id = "atool_chrome_qrcode_plugin";
        qrcode_div.style.display = "none";
        document.body.appendChild(qrcode_div);
    }
    return qrcode_div;
}

function showQrcode(qrcode_text) {
    var qrcode_dom = getMaskContainer();
    var base64;
    try { 
        base64 = qrgen.canvas(get_qrcode_option(qrcode_text)).toDataURL();
        showResult(qrcode_dom, base64, qrcode_text);
    } catch (e) {
        alert(chrome.i18n.getMessage("textToLong"));
    }
    
}

function showDecodeText(decode_text) {
    var qrcode_dom = getMaskContainer();
    showResult(qrcode_dom, null, decode_text);
}

chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.encodeText && "" != msg.encodeText.trim()) {
        showQrcode(msg.encodeText);
    }
    else {
        if (msg.decodeText) {
            showDecodeText(msg.decodeText);
        }
    }
});