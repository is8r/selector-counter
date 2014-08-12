//original - https://gist.github.com/psebborn/1885511/

function checkSheets(sheets) {
  var results = '';
  for (var i = 0; i < sheets.length; i++) {
    if (i != 0) {
      results += '\n';
    }
    results += checkSheet(sheets[i]);
  }
  return results;
}
function checkSheet(sheet) {
  var count;
  var re = '';
  if (sheet && sheet.cssRules && sheet.href) {
    count = 0;
    for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
      if( !sheet.cssRules[j].selectorText ) {
        continue;
      }
      count += sheet.cssRules[j].selectorText.split(',').length;
    }
    re += '\n' + sheet.href;
    //re += '\n' + 'Rules: ' + sheet.cssRules.length;
    re += '\n' + 'Selectors: ' + count;
  }
  return re;
}

var results = checkSheets(document.styleSheets);
alert(results);