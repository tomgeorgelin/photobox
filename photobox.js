import * as gallery from './modules/gallery.js';
import * as lightbox from './modules/lightbox.js';

window.onload = function () {
	gallery.init(1,"https://webetu.iutnc.univ-lorraine.fr","/www/canals5/photobox/photos/?offset0&size=12");
	gallery.loadGallery();

	$("#previous").on("click", function (e) {
		gallery.loadPrev();
	});	
	$("#next").on("click", function (e) {
		gallery.loadNext();
	});	
	lightbox.displayLightBox();
}