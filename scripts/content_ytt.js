get_selection = function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};

$(function() {

    if ($("#player").length) {
        $("#player").prepend("<a id='copylink'>Copy timestamp</a>")
        $("#copylink").click(send_selection);
    }
    else {
        console.log("no player found");
    }
});

function get_player_time()  {
    var time_sec =  $(".html5-progress-bar.red").attr("aria-valuenow");
    var url = document.location.href;
    var parsed = purl(url);
    if (parsed.fparam("t") !== undefined)
    {
        url = url.replace("#t="+parsed.fparam("t"), "");
    };
    var final_url = url + "#t=" + time_sec;
    return final_url;
}

function send_selection(e)  {

    data = {
        selection: get_player_time()
    };
    console.log("sending: "+get_player_time());
    chrome.runtime.sendMessage( data,
        function(response) {
            console.log("Got a response!");
            console.log(response);
        });
}
