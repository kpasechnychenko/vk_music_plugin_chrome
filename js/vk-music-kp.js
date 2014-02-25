// author: kpasech

function show_hide_elm(selector) {
    var el = $(selector);
    if (el.is(":visible")) {
        el.hide(350, function () {
            var b = $("body");
            b.height(b.find("audio").height() + 0);
            $("html").height(b.height() + 0);
        });
    }
    else {
        el.show(350);
    }
}


function bind_events() {
    var ac_vol = $("#ac_vol"),
        ac_pr = $("#ac_pr");

    $("#ac_play").on('click', function () {
        console.log("play");
    });

    $("#ac_next").on('click', function () {
        console.log("next");
    });

    $("#ac_prev").on('click', function () {
        console.log("prev");
    });

    $("#ac_repeat").on('click', function () {
        console.log("repeat");
    });

    $("#ac_shuffle").on('click', function () {
        console.log("shuffle");
    });
    
    $("#ac_rec").on('click', function () {
        console.log("similar songs");
    });

    ac_pr.on('mouseenter', function () {
        console.log("mouseenter");
        $(this).addClass("over");
    });

    ac_pr.on('mouseleave', function () {
        console.log("mouseleave");
        $(this).removeClass("over");
    });

    ac_pr.on('mousedown', function (e) {
        console.log("mousedown");
        $(this).addClass("down");
        $(this).find("#ac_pr_line").width(e.offsetX);
    });

    ac_pr.on('mouseup', function () {
        console.log("mouseup");
        $(this).removeClass("down");
    });

    ac_pr.on('mousemove', function (e) {
        if ($(this).hasClass("down") && e.pageX - e.offsetX == 90) {
            $(this).find("#ac_pr_line").width(e.offsetX);
        }
    });

    ac_vol.on('mouseenter', function () {
        console.log("mouseenter");
        $(this).addClass("over");
    });

    ac_vol.on('mouseleave', function () {
        console.log("mouseleave");
        $(this).removeClass("over");
    });

    ac_vol.on('mousedown', function () {
        console.log("mousedown");
        $(this).addClass("down");
    });

    ac_vol.on('mouseup', function () {
        console.log("mouseup");
        $(this).removeClass("down");
    });

    ac_vol.on('mousemove', function (e) {
        console.log(e.pageX - e.offsetX);
        if ($(this).hasClass("down") && e.pageX - e.offsetX == 456) {
            $(this).find("#ac_vol_line").width(e.offsetX);
        }
    });


    $("#ac_srch").on('click', function (e) {
        show_hide_elm("#audio_search");
    });

    $("#ac_plst").on('click', function (e) {
        show_hide_elm("#audios_list");
    });


    $("#audio_search").on('click', function (e) {
        $(this).find(".input_back_content").hide();
    });

    $("#audio_search").on('focusout', function (e) {
        if ($(this).find("#s_search").val().length == 0)
        $(this).find(".input_back_content").show();
    });
    
};


function vk_player() {

    this.current_link = "";
    this.current_song_id = "";

    this.view_player_refresh_view = function (request) {
        if (request.player_action == "play") {
            $("#ac_play").addClass("playing");
        } else {
            $("#ac_play").removeClass("playing");
        };

        $("#ac_performer").html(request.artist);
        $("#ac_title").html(request.title);
        this.current_link = request.link;
        this.current_song_id = request.song_id;
    };


    this.view_player_volume_changed = function (request) {
        $("#ac_vol_line").width(request.value * $("#ac_vol").width());
    };

    this.view_player_position_changed = function (request) {
        $("#ac_pr_line").width(request.value * $("#ac_pr").width());
    };

    this.view_player_load_changed = function (request) {
        $("#ac_load_line").width(request.value * $("#ac_pr").width());
    };
};


document.addEventListener('DOMContentLoaded', function () {
    bind_events();
    window.v_player = new vk_player();
});


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (typeof (window.v_player) != 'undefined' && request.action.indexOf("view_") == 0) {
          window.v_player[request.action](request);
      }
  });