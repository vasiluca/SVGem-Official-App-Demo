import { select } from '../../Selection.js';

import { Element, drag } from '../Element.js';

import { cache } from '../../../Cache.js';
import { newSVG } from '../../Modify/newSVG.js';

// import * as TextBox from '../../../Tab/Tool/TextBox.js';
import { TextContent } from '../../../Tab/Tool/TextBoxEvents.js'

class Text extends Element {
	constructor() {
		super(); // super must be always be called in a Sub-Class in JavaScript
		// This constructor might be used in the future, although it's not guaranteed
	}

	static createAttr() {
		var attr = {
			'x': drag.start[0],
			'y': drag.start[1],
			// 'contenteditable': 'plaintext-only',
			'font-size': '22px',
			'paint-order': 'stroke' // This will prevent stroke/outline from covering the actual text [fill]
			
		};

		if (drag.end[0] != drag.start[0]) {
			if (drag.end[0] < drag.start[0]) {
				var temp = drag.start[0];
				drag.start[0] = drag.end[0];
				drag.end[0] = temp;
			}

			attr['textLength'] = drag.end[0] - drag.start[0];
		}

		if (cache.ele.html() == '') { // if the element HTML is non-existent, show New Text
			cache.ele.html('&nbsp; New Text &nbsp;');
			cache.ele.attr('data-temp', 'true');  // indicate the text is placeholder in this text element, to be overridden
		}

		return attr;
	}
}

export { Text }