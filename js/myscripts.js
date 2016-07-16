addLoadEvent(generateIdcard);
// addLoadEvent(copyIdcardToClipboard);
addLoadEvent(clipboardOn);

// share load
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function generateIdcard() {
	var btnGenerate = document.getElementById('btnGenerate');
	var inputIdcard = document.getElementById('inputIdcard');
	inputIdcard.value = fnGenerateRandom(); // function from idcard.js

	btnGenerate.onclick = function() {
		if (document.getElementById('male').checked) {
			inputIdcard.value = fnGenerateRandomIDByGender(1); // function from idcard.js
		} else if (document.getElementById('female').checked) {
			inputIdcard.value = fnGenerateRandomIDByGender(0);
		} else {
			inputIdcard.value = fnGenerateRandom();
		}
	}
}

function clipboardOn() {
  // initialize tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  // initialize copy to clipboard event
  var clipboard = new Clipboard('#btnCopy');

  clipboard.on('success', function(e) {
    e.clearSelection();

    $('#btnCopy').attr('title', '复制到剪贴板')
                      .tooltip('fixTitle')
                      .data('bs.tooltip')
                      .$tip.find('.tooltip-inner')
                      .text('复制成功');
    console.log("clipboard: copied");
  });

  clipboard.on('error', function(e) {
    // console.error('Action:', e.action);
    // console.error('Trigger:', e.trigger);
  });
}
