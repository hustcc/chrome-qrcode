var encodeMenu = "atool-qrcode-context-menu-encode";
var decodeMenu = "atool-qrcode-context-menu-decode";
var extensionId = chrome.i18n.getMessage("@@extension_id");
// var imageDatas = {};
chrome.runtime.onInstalled.addListener(function() {
    // qrcode menu
    chrome.contextMenus.create({
        id: encodeMenu,
        title: chrome.i18n.getMessage("generate"),
        contexts: ["page", "frame", "selection", "link", "image", "video", "audio"],
        documentUrlPatterns: ["http://*/*", "https://*/*", "ftp://*/*"]
    });
    //decode menu
    chrome.contextMenus.create({
        id: decodeMenu,
        title: chrome.i18n.getMessage("decode"),
        contexts: ["image"],
        documentUrlPatterns: ["http://*/*", "https://*/*", "ftp://*/*"]
    });
});

chrome.contextMenus.onClicked.addListener(function(menu, evt) {
    //gen qrcode
    if (menu.menuItemId === encodeMenu) {
        if (menu.linkUrl) {
            // link url
            chrome.tabs.sendMessage(evt.id, {
                encodeText: menu.linkUrl,
                type: "link"
            });
        }
        else if (menu.selectionText && "" != menu.selectionText.trim()) {
            // select text
            chrome.tabs.sendMessage(evt.id, {
                encodeText: menu.selectionText,
                type: "text"
            });
        }
        else if (menu.srcUrl) {
            // src url
            chrome.tabs.sendMessage(evt.id, {
                encodeText: menu.srcUrl,
                type: "media"
            });
        }
        else {
            if (menu.pageUrl) {
                chrome.tabs.sendMessage(evt.id, {
                    encodeText: menu.pageUrl,
                    type: "page"
                });
            }
            else {
                // do nothing..."
            }
        }
    }
    //decode qrcode 
    else if (menu.menuItemId == decodeMenu) {
        if (menu.srcUrl) {
            qrcode.callback = function(text) {
                chrome.tabs.sendMessage(evt.id, {
                    decodeText: text
                });
            }
            qrcode.decode(menu.srcUrl);
        }
    }
});