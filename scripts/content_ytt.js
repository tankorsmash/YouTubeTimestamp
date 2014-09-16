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
        $("#watch-header").prepend("<a style='color:#222;' class='    yt-card yt-card-has-padding' id='submit-link'>submit</a> ")
        $("#watch-header").prepend("<a style='color:#222;' class='    yt-card yt-card-has-padding' id='copy-link'>Copy timestamp</a> ")
        $("#copy-link").click(send_selection);
        $("#submit-link").click(submit_link);
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

function submit_link(e) {
    var url = get_player_time();
    var final_url = "http://reddit.com/submit?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(document.title);
    window.open(final_url,'_blank');
};

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
