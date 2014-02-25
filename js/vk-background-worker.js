// author: kpasech

function downloadFile(request, sender, sendResponse) {
    chrome.downloads.download({ url: request.url, filename: request.filename });
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (!request.action.indexOf("view_") == 0) {
          window[request.action](request, sender, sendResponse);
      }
  });


/* On page event handlers */

function player_shufle(request, sender, sendResponse) {
};

function player_loop(request, sender, sendResponse) {
};

function player_list_search(request, sender, sendResponse) {
};

function player_refresh_view(request, sender, sendResponse) {
    request.action = "view_" + request.action;
    chrome.runtime.sendMessage(request);
};

function player_refresh_list(request, sender, sendResponse) {
};

function player_volume_changed(request, sender, sendResponse) {
    request.action = "view_" + request.action;
    chrome.runtime.sendMessage(request);
};

function player_position_changed(request, sender, sendResponse) {
    request.action = "view_" + request.action;
    chrome.runtime.sendMessage(request);
};

function player_load_changed(request, sender, sendResponse) {
    request.action = "view_" + request.action;
    chrome.runtime.sendMessage(request);
};
/* End of on page event handlers */



/* Browser plugin event handlers */

/* End of browser plugin event handlers */