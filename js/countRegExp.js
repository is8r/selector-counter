function getSelector(data, url) {
  var re = data;

  //
  re = re.replace(/\r/g, '');//無駄な改行削除
  re = re.replace(/\%n/g, '');//無駄な改行削除
  re = re.replace(/\n/g, '');//無駄な改行削除
  re = re.replace(/(^\n)/g, '');//無駄な改行削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除

  re = re.replace(/\;/g, ';\n');//文末の;を改行
  re = re.replace(/\}/g, '}\n');//文末の}を改行
  re = re.replace(/\{/g, '{\n');//文中の{を改行
  re = re.replace(/\@import.*\;/g, '');//import削除
  re = re.replace(/\@charset.*\;/g, '');//charset削除
  re = re.replace(/\/\*.*\*\//g, '');//コメント削除
  re = re.replace(/\(.*\)/g, '()');//()括弧内削除
  re = re.replace(/(\s){2,}/g, '\n');//無駄なスペース削除

  // //media部分の中身を削除する場合
  // re = re.replace(/\@media.*\{/g, '-media- {{');//mediaの頭を-media- {{に
  // re = re.replace(/\}(\s){1,}\}/g, '}}');//mediaの末尾を}}に
  // re = re.replace(/\n/g, '');//改行削除
  // re = re.replace(/\}\}/g, '}}\n');//}}を改行
  // re = re.replace(/-media-\s\{\{.*\}\}/g, '');//media部分の削除

  // //mediaの中身も数える場合はこっち
  re = re.replace(/\@media.*\{/g, '-media- {{');//mediaの頭を-media- {{に
  re = re.replace(/\}(\s){1,}\}/g, '}}');//mediaの末尾を}}に
  re = re.replace(/\n/g, '');//改行削除
  re = re.replace(/\}\}/g, '}}\n');//}}を改行
  re = re.replace(/-media-\s\{\{/g, '');//mediaの囲いのみ削除
  re = re.replace(/\}\}\n/g, '}\n');//mediaの囲いのみ削除
  re = re.replace(/\}/g, '}\n');//mediaの囲いのみ削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除
  // console.log(re);

  //------------------------------
  //rules用の整形
  re = re.replace(/\}/g, '}\n');//{}内削除1
  re = re.replace(/\{.*\}/g, '{}');//{}内削除2
  re = re.replace(/(\n){2,}/g, '');//無駄な改行削除

  var matched_rules = re.match(/\n/g);//改行を数える
  var matched_rules_count = countArSelectors(re, true);
  // console.log(re);

  //------------------------------
  //selectors用の整形
  re = re.replace(/\,/g, ',\n');//カンマを改行
  re = re.replace(/\{\}/g, '\n');//{}を改行
  re = re.replace(/\:\:.*\n/g, '\n');//頭が::の行を削除
  re = re.replace(/\@.*\n/g, '\n');//頭が@の行を削除
  re = re.replace(/(.*)\%\n/g, '\n');//行末が%の行を削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除
  re = re.replace(/(\n){2,}/g, '\n');//無駄な改行削除
  // console.log(re);

  var matched_selectors = re.match(/\n/g);//改行を数える
  var matched_selectors_count = countArSelectors(re);
  
  //result
  var result = '';
  result += '\n' + url;
  //result += '\n' + 'Rules: ' + matched_rules_count;
  result += '\n' + 'Selectors: ' + matched_selectors_count;

  return result;
}

function countArSelectors(text, rules) {
  var ar = text.split('\n');
  //空を削除
  ar = ar.filter(
    function (x, i, self) {
      return x !== "";
    }
  );
  ar = ar.filter(
    function (x, i, self) {
      return x !== " ";
    }
  );

  //::selectin用
  ar = ar.filter(
    function (x, i, self) {
      return x.indexOf('-webkit-') === -1;
    }
  );
  ar = ar.filter(
    function (x, i, self) {
      return x.indexOf('-moz-') === -1;
    }
  );
  ar = ar.filter(
    function (x, i, self) {
      return x.indexOf('-o-') === -1;
    }
  );
  return ar.length;
}

//------------------------------

var results = getSelector(document.body.innerText, location.href);
alert(results);
