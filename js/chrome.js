chrome.browserAction.onClicked.addListener(function(tab) 
{
  if(tab.url.indexOf('.css') != -1) {
    chrome.tabs.executeScript(tab.id, {file: "/js/countRegExp.js"});
  } else {
  	alert('cssを開いて実行して下さい');
    //chrome.tabs.executeScript(tab.id, {file: "/js/countCSSRules.js"});
  }
});
