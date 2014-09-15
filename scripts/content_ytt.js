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
        $("#player").prepend("<a id='copylink'>COPY SELECTION</a>")
        $("#copylink").click(send_selection);
    }
    else {
        console.log("no player found");
    }
});

function get_player_time()  {
    return $(".html5-progress-bar.red").attr("aria-valuenow");
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
