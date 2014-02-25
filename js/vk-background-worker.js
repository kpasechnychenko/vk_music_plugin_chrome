// author: kpasech

function downloadFile(request, sender, sendResponse) {
    chrome.downloads.download({ url: request.url, filename: request.filename });
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      window[request.action](request, sender, sendResponse);
  });