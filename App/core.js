import { cache, pressed } from './Cache.js';
import { doc } from './SetUp.js';
import { tabStates, util } from './Tabs.js';
import * as TabEvents from  './TabEvents.js';
import { ui } from './UI.js';

import { svg } from './CanvasElements/Modify/SVG.js';
import { select } from './CanvasElements/Selection.js';
import * as SelectionEvents from './CanvasElements/SelectionEvents.js';
import * as Events from './CanvasElements/Events.js'; // No Objects exported there are event functions

import { tool } from './Tab/Tool.js'
import * as ToolEvents from './Tab/Events/Tool.js';
import { colors } from './Tab/Color.js';
import * as ColorEvents from './Tab/Events/Color.js';
import { property } from './Tab/Property.js';
import * as PropertyEvents from './Tab/Events/Property.js';
	import { Opacityproperty } from './Tab/Property/Opacity.js';
	import * as OpacityEvents from './Tab/Property/OpacityEvents.js';
	import { deleteButton } from './Tab/Property/DeleteButton.js';
	import * as deleteEvent from './Tab/Property/deleteEvent.js';

import { layers } from './Tab/Layer.js';
import * as LayerEvents from './Tab/Events/Layer.js';
import * as actions from './Tab/Action.js'; // No objects are actually exported frmo Action.js yet
	import { Export } from './Tab/Action/Export.js';
	import * as ExportEvents from './Tab/Action/ExportEvents.js';

import * as ImageEvents from './Tab/Tool/ImageEvents.js';

import * as FileImport from './FileImport.js';


deleteButton.initialize();

$(document).ready(function () {
	$('#editor').mousemove(function (e) {
		if ($(e.target).is('#editor *') && cache.press == false && tool.type == 'selection' && !pressed.handle) {
			cache.hoverEle = $(e.target).attr('id');
		} else {
			$('.outline').remove();
			$('.outline2').remove();
		}
	}).dblclick(function () {
		if (tool.name != 'selection') {
			tool.type = 'selection';
		}
	})



	$(document).mousemove(function (e) {

		if ($('.propertyScrubber').hasClass('show')) {
			if (cache.swipe) {
				property.setNumValue();
			} else {
				if (Math.abs(cache.stop[1] - cache.start[1]) > 20 || Math.abs(cache.stop[0] - cache.start[0]) > 20) {
					if (!$(e.target).is('.propertyScrubber, .propertyScrubber *')) {
						ui.scrubber(false);
					}
				}
			}
		}
		
	}).mouseup(function (e) {
		cache.swipe = false;
		if (cache.dragTab) {
			tabStates.adjustPos();
			cache.dragTab = false;
		}
		$('.outline').remove();
		$('.outline2').remove();
		$('.draggingPreview, .draggingPreview2').remove();
		$('.numberPreview').css('display', 'none');
		if ($('.propertyScrubber').hasClass('show')) {
			//cache.start = [e.clientX,e.clientY];
		}
		//$('.layers div').removeClass('drop-above drop-below drop-group');
	}).keydown(function (e) {
		if ($('.propertyScrubber').hasClass('show')) {
			if (e.which >= 48 && e.which <= 57) {

			}
		}
	});






















































	//** From this point, onward is non-crucial functionality or jQuery events (not as important to test) */
	// TODO: add the the below functions to their corresponding modules






	function readAndInsert(file) {
		var reader = new FileReader();
		var image = new Image();
		image.src = file.result;
		var width = 100;
		var height = 100;
		reader.readAsDataURL(file);
		reader.onload = function () {
			tool.images.push({
				result: this.result,
				width: width,
				height: height
			});
		}
	}

	$('#inputFile').change(function (e) {
		tool.images = [];
		var files = e.target.files;
		tool.imageIndex = files.length - 1;
		tool.prevIndexIMG = files.length - 1;
		for (var i = 0; i < files.length; i++) {
			readAndInsert(files[i]);
		}
	});

	$('#image').contextmenu(function () {
		$('#inputFile').trigger('click');
	});

});