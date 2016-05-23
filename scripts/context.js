// All context types
var contexts = ["page","selection","link","editable","image","video","audio"];
// Create one item for all context types.
chrome.contextMenus.create(
  {
    "title": 'copy action name',
    "contexts": contexts,
    "onclick": copyActionName
});
chrome.contextMenus.create(
  {
    "title": 'copy a random id',
    "contexts": contexts,
    "onclick": copyIDCard
});

// A generic onclick callback function.
function copyActionName(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  if (typeof info.frameUrl == "undefined") {
    var href = info.pageUrl;
  } else {
    var href = info.frameUrl; // eg. "http://localhost:8080/cxjz/cxdb/ywbl/dbsqAction.do?&yaa001=110&aae251=0&___businessId=1020502"
  }
  var actionName = href.substring(href.lastIndexOf('/') + 1, href.indexOf('.do')); // "dbsqAction"
  console.log("info.frameUrl: " + info.frameUrl);
  console.log("actionName: " + actionName);
  // copyToClipboard(actionName);
  copyTextToClipboard(actionName);
}

// copyIDCard
function copyIDCard(info, tab) {
  var idcard = fnGenerateRandom();
  // copyToClipboard(idcard);
  copyTextToClipboard(idcard);
}

// Copy text to clipboard, using a simple trick by Jarek Milewski on stackoverflow.com(http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript)
function copyToClipboard(text) {
  window.prompt("复制到剪贴板: 先Ctrl+C, 再确定", text);
}


// Using document.execCommand('copy') by Dean Taylor on the same stackoverflow page above
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

// 定义全局变量provinceArray,regionArray和countyArray
var provinceArray = [
  "530000", "云南省"
];
var regionArray = [
  "530100", "昆明市", "530300", "曲靖市", "530400", "玉溪市", "530500", "保山市", "530600", "昭通市", "530700", "丽江市", "530800", "普洱市", "530900", "临沧市",
  "532300", "楚雄彝族自治州", "532500", "红河哈尼族彝族自治州", "532600", "文山壮族苗族自治州", "532800", "西双版纳傣族自治州", "532900", "大理白族自治州", "533100",
  "德宏傣族景颇族自治州", "533300", "怒江傈僳族自治州", "533400", "迪庆藏族自治州"
];
var countyArray = [
  ["530101","市辖区","530102","五华区","530103","盘龙区","530111","官渡区","530112","西山区","530113","东川区","530114","呈贡区","530122","晋宁县","530124","富民县","530125","宜良县","530126","石林彝族自治县","530127","嵩明县","530128","禄劝彝族苗族自治县","530129","寻甸回族彝族自治县","530181","安宁市"],
  ["530301","市辖区","530302","麒麟区","530321","马龙县","530322","陆良县","530323","师宗县","530324","罗平县","530325","富源县","530326","会泽县","530328","沾益县","530381","宣威市"],
  ["530401","市辖区","530402","红塔区","530421","江川县","530422","澄江县","530423","通海县","530424","华宁县","530425","易门县","530426","峨山彝族自治县","530427","新平彝族傣族自治县","530428","元江哈尼族彝族傣族自治县"],
  ["530501","市辖区","530502","隆阳区","530521","施甸县","530522","腾冲县","530523","龙陵县","530524","昌宁县"],
  ["530601","市辖区","530602","昭阳区","530621","鲁甸县","530622","巧家县","530623","盐津县","530624","大关县","530625","永善县","530626","绥江县","530627","镇雄县","530628","彝良县","530629","威信县","530630","水富县"],
  ["530701","市辖区","530702","古城区","530721","玉龙纳西族自治县","530722","永胜县","530723","华坪县","530724","宁蒗彝族自治县"],
  ["530801","市辖区","530802","思茅区","530821","宁洱哈尼族彝族自治县","530822","墨江哈尼族自治县","530823","景东彝族自治县","530824","景谷傣族彝族自治县","530825","镇沅彝族哈尼族拉祜族自治县","530826","江城哈尼族彝族自治县","530827","孟连傣族拉祜族佤族自治县","530828","澜沧拉祜族自治县","530829","西盟佤族自治县"],
  ["530901","市辖区","530902","临翔区","530921","凤庆县","530922","云县","530923","永德县","530924","镇康县","530925","双江拉祜族佤族布朗族傣族自治县","530926","耿马傣族佤族自治县","530927","沧源佤族自治县"],
  ["532301","楚雄市","532322","双柏县","532323","牟定县","532324","南华县","532325","姚安县","532326","大姚县","532327","永仁县","532328","元谋县","532329","武定县","532331","禄丰县"],
  ["532501","个旧市","532502","开远市","532503","蒙自市","532504","弥勒市","532523","屏边苗族自治县","532524","建水县","532525","石屏县","532527","泸西县","532528","元阳县","532529","红河县","532530","金平苗族瑶族傣族自治县","532531","绿春县","532532","河口瑶族自治县"],
  ["532601","文山市","532622","砚山县","532623","西畴县","532624","麻栗坡县","532625","马关县","532626","丘北县","532627","广南县","532628","富宁县"],
  ["532801","景洪市","532822","勐海县","532823","勐腊县"],
  ["532901","大理市","532922","漾濞彝族自治县","532923","祥云县","532924","宾川县","532925","弥渡县","532926","南涧彝族自治县","532927","巍山彝族回族自治县","532928","永平县","532929","云龙县","532930","洱源县","532931","剑川县","532932","鹤庆县"],
  ["533102","瑞丽市","533103","芒市","533122","梁河县","533123","盈江县","533124","陇川县"],
  ["533321","泸水县","533323","福贡县","533324","贡山独龙族怒族自治县","533325","兰坪白族普米族自治县"],
  ["533421","香格里拉县","533422","德钦县","533423","维西傈僳族自治县"]
];

// 计算指定年指定月份的天数
// [return 28 + (month + Math.floor(month/8)) % 2 + 2 % month + 2 * Math.floor(1/month)] - 计算天数的算法（2月以28计）
// [return (year%400===0 || (year%4===0 && year%100!==0))?1:0] - 计算闰年
// 注：对于数值很大的年份计算闰年的算法并不完全准确，能整除3200并且能整除172800的年份也是闰年，如：172800年是闰年，86400年不是闰年。但是这里就不做判断了，毕竟不会用到
// function daysOf(year, month) {
// 	return (28 + (month + Math.floor(month/8)) % 2 + 2 % month + 2 * Math.floor(1/month)) + (((year%400===0 || (year%4===0 && year%100!==0)) && month==2)?1:0);
// }
function daysOf(year, month) {
  var daysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year%400===0 || (year%4===0 && year%100!==0)) {
    daysArray[1] = 29;
  }
  return daysArray[month - 1];
}

// 不足位前面加0，用于月、日前加0
function padLeft(str, length) {
  if (str.length >= length)
    return str;
  else
    return padLeft("0" + str, length);
}

// 获取指定范围内随机整数
function getNumberWithin(min, max) {
  return Math.round((Math.random()*(max - min) + min));
}

// 根据前17位计算并不全第18位身份证号
function pre17to18(pre17) {
  var digit, coefficient, sum = 0; // 位值，系数，和；和要给初始值0
  for (var i = 1; i <= 17; i++) {
    digit = Number(pre17.substr((i - 1), 1));
    coefficient = Math.pow(2, 18 - i) % 11;
    sum += digit * coefficient;
    console.log("digit: " + digit + ", coefficient: " + coefficient + ", product: " + (digit * coefficient));
  }
  console.log("sum: " + sum);
  var mod = sum % 11;
  console.log("mod(sum % 11): " + mod);
  var verifyCodeArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var verifyCode = verifyCodeArray[mod]; // 校验码
  console.log("verifyCode: " + verifyCode);
  var idcard = pre17 + verifyCode;
  console.log("idcard: " + idcard);

  return idcard;
}

// 随机生成IDCARD
function fnGenerateRandom() {
  // 1. 行政区划码（6位）
  var x = getNumberWithin(0, (countyArray.length-1));
  var y;
  while (true) {
    y = getNumberWithin(0, countyArray[x].length-1);
    if (y % 2 === 0) break;
  }
  var divisionCode = countyArray[x][y];
  console.log("random divisionCode: " + divisionCode);

  // 2. 出生日期码（8位）
  var year = getNumberWithin(1916, 2016).toString();
  var month = padLeft(getNumberWithin(1, 12).toString(), 2);
  var day = padLeft(getNumberWithin(1, daysOf(Number(year), Number(month))).toString(), 2);
  var birthDateCode = year + month + day;
  console.log("random birthDateCode: " + birthDateCode);

  // 3. 顺序码
  var sequenceCode = padLeft(getNumberWithin(0, 999).toString(), 3);
  console.log("random sequenceCode: " + sequenceCode);

  // 4. 拼接前17位，生成校验码（1位），完成18位身份证号码
  var pre17 = divisionCode + birthDateCode + sequenceCode;
  console.log("pre17: " + pre17);
  var idcard = pre17to18(pre17);

  return idcard;
}
