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



function copyIdcardToClipboard() {
	var btnCopy = document.getElementById('btnCopy');
	btnCopy.onclick = function () {
		var idcard = document.getElementById('inputIdcard').value;
		copyTextToClipboard(idcard);
	}
}


/**
 * Using document.execCommand('copy') by Dean Taylor on stackoverflow.com(http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript)
 * @param  {String} text
 * @return {}
 */
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