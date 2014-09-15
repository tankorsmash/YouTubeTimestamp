// Copy provided text to the clipboard.
function copyTextToClipboard(text) {
    if (text !== undefined || text !== "")
    {
        var copyFrom = $('<textarea/>');
        copyFrom.text(text);
        $('body').append(copyFrom);

        copyFrom.select();
        document.execCommand('copy');

        copyFrom.remove();
    };
}

get_selection = function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?  "from a content script:" + sender.tab.url : "from the extension");
        if (request.selection !== undefined)
        {
            console.log("the selection was "+ request.selection);
            copyTextToClipboard(request.selection)
        }
        else {
            console.log("no selection found!");
        };

    });
