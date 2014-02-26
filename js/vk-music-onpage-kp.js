// author: kpasech

function find_audios() {
    add_dwnl_btns($(".play_btn_wrap"));
}


var observer = new window.WebKitMutationObserver(function (mutations, observer) {
   $.each(mutations, function (i, el) {
       $.each(el.addedNodes, function (i, el2) {
           add_dwnl_btns($(el2));
       });

       if ($("#profile_audios").length > 0) {

           add_dwnl_btns($("#profile_audios"));

           $("#profile_audios")
               .find(".play_new")
               .closest("td")
               .next()
               .width("76%")
               .find(".title_wrap")
               .css("width", "");
       }
       
    });
});

observer.observe(document, {
    subtree: true,
    childList: true
});


function add_dwnl_btns(el2) {
    var btns = el2.find(".play_new:not(.play_new + :has(.download_btn_new))");

    if (btns.length == 0 || $(el2).find(".download_btn_new").length > 0) { return false; }

    btns.css("float", "left");
    btns.after($("<div class='download_btn_new'>"));

    if (btns.closest(".play_btn").length == 0) {
        btns.closest("td").next().width("87%").find(".title_wrap").width("90%");
    }
    else {
        var info = btns.closest(".play_btn").next();
        $(info).width($(info).width() - 18);
        $(info).find(".title_wrap").width($(info).width() - $(info).find(".duration").width() - 23);
    }

    var elms = $(el2).find(".download_btn_new");
    var css_img = "url(" + chrome.extension.getURL("images/download-small.png") + ")";
    elms.css("background-image", css_img);
    elms.on("click", function (e) {
        var finalURL = $(this).closest(".area").find("input").val();
        var filename = ($(this).closest(".area").find('.title_wrap a').html()).replace("<span>", "").replace("</span>") + "-";

        if ($(this).closest(".area").find('.title a').length > 0) {
            filename += ($(this).closest(".area").find('.title a').html()).replace("<span>", "").replace("</span>");
        }
        else {
            filename += ($(this).closest(".area").find('.title').html()).replace("<span>", "").replace("</span>");
        }
        filename += ".mp3";

        chrome.runtime.sendMessage({ action: "downloadFile", url: finalURL, filename: filename });
        e.stopPropagation();
        e.preventDefault();
    });

};


find_audios();
