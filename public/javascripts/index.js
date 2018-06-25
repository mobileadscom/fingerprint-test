import Fingerprint2 from 'fingerprintjs2';

var inputs = {
    excludeUserAgent: false,
    excludeLanguage: false,
    excludeColorDepth: false,
    excludeScreenResolution: true,
    excludeAvailableScreenResolution: true,
    excludeTimezoneOffset: false,
    excludeSessionStorage: false,
    excludeIndexedDB: false,
    excludeAddBehavior: false,
    excludeOpenDatabase: false,
    excludeCpuClass: false,
    excludePlatform: false,
    excludeDoNotTrack: true,
    excludeCanvas: false,
    excludeWebGL: false,
    excludeAdBlock: true,
    excludeHasLiedLanguages: false,
    excludeHasLiedResolution: false,
    excludeHasLiedOs: false,
    excludeHasLiedBrowser: false,
    excludeJsFonts: false,
    excludeFlashFonts: false,
    excludePlugins: false,
    excludeIEPlugins: false,
    excludeTouchSupport: false,
    excludePixelRatio: true,
    excludeHardwareConcurrency: false,
    excludeWebGLVendorAndRenderer: false,
    excludeDeviceMemory: false,
    excludeAudioFP: false,
}

var combinations = [
	[
		'excludeUserAgent', 
		'excludeLanguage',
		'excludeScreenResolution',
		'excludeAvailableScreenResolution',
		'excludeOpenDatabase',
		'excludePlatform',
		'excludeDoNotTrack',
		'excludeCanvas',
		'excludeWebGL',
		'excludeAdBlock',
		'excludeHasLiedOs',
		'excludeJsFonts',
		'excludePlugins',
		'excludeTouchSupport',
		'excludeIEPlugins',
		'excludePixelRatio',
		'excludeWebGLVendorAndRenderer',
		'excludeDeviceMemory'
	], [
		'excludeUserAgent',
		'excludeLanguage',
		'excludeScreenResolution',
		'excludeAvailableScreenResolution',
		'excludeDoNotTrack',
		'excludeAdBlock',
		'excludeHasLiedLanguages',
		'excludeHasLiedResolution',
		'excludeHasLiedOs',
		'excludeHasLiedBrowser',
		'excludePlugins',
		'excludeIEPlugins',
		'excludeTouchSupport',
		'excludePixelRatio',
		//
		// 'excludeOpenDatabase',
		// 'excludeCanvas',
		// 'excludeJsFonts',
		// 'excludeWebGLVendorAndRenderer'
	]
]

var generate = function() {
	new Fingerprint2(inputs).get(function(result, components) {
		console.log(result) // a hash, representing your device fingerprint
		console.log(components) // an array of FP components
		var html = '';
		for (var c = 0; c < components.length; c++) {
			html += c + '. ' + components[c].key + '<br>' ; 
		}
		document.getElementById('fingerprint').innerHTML = result;
		document.getElementById('mfingerprint').innerHTML = result
		document.getElementById('components').innerHTML = html;
	});
};

var events = function() {
	document.getElementById('checkAll').addEventListener('click', function() {
		var hasChecked = false;
		for (var i in inputs) {
			if (inputs[i] == true) {
				hasChecked = true;
			}
		}

		for (var i in inputs) {
			if (hasChecked) {
				inputs[i] = false;
				document.getElementById(i).checked = false;
			}
			else {
				inputs[i] = true;
				document.getElementById(i).checked = true;
			}
		}
		generate();

	});
	
	var combs = document.getElementsByClassName('comb');
	for (var c = 0; c < combs.length; c++) {
		combs[c].addEventListener('click', function() {

			var index = this.dataset.combination - 1;
			console.log(index);
			if (combinations[index]) {
				for (var i in inputs) {
					if (combinations[index].indexOf(i) > -1) {
						inputs[i] = true;
						document.getElementById(i).checked = true;
					}
					else {
						inputs[i] = false;
						document.getElementById(i).checked = false;
					}
				}
			}
			generate();
		});
	}

	document.getElementById('generate').addEventListener('click', function() {
		generate();
	});
}

document.addEventListener('DOMContentLoaded', function() {
	var wrapper = document.getElementById('inputs');

	for (var i in inputs) {
		var iw = document.createElement('div');
		iw.classList.add('input-wrapper');
		wrapper.appendChild(iw);
		var cb = document.createElement('input');
		cb.setAttribute('type', 'checkbox');
		cb.setAttribute('value', inputs[i]);
		cb.id = i;
		cb.addEventListener('change', function() {
			inputs[this.id] = this.checked;
			generate();
		})
		iw.appendChild(cb);
		if (inputs[i]) {
			cb.checked = true;
		}
		var label = document.createElement('LABEL');
		label.setAttribute('for', i);
		var t = document.createTextNode(i);
		label.appendChild(t);
		iw.appendChild(label);
		
	}

	setTimeout(() => {
		console.log('start')
		generate();
		events();
	}, 500);
});