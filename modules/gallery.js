import * as photoload from './photoload.js';

let idGallery, uri, url, prev, next;

export function init(idG, ul, ui) {
	idGallery = idG;
	uri = ui;
	url = ul;
	photoload.init(url);
}

export function loadGallery() {
	let p = photoload.loader(uri);
	loadHTML(p);
	return p;
}

export function loadPrev() {
	if (prev != undefined) {
		uri = prev;
		loadGallery();
	}
}

export function loadNext() {
	if (next != undefined) {
		uri = next;
		loadGallery();
	}
}

function loadHTML(promise) {
	promise.then(traitementPromise).catch(function(error) {
		console.log(error);
	});
}

function traitementPromise(e) {
	$('#photobox-gallery').empty();
	prev = e.data.links['prev'].href;
	next = e.data.links['next'].href;

	e.data.photos.forEach((photo, links) => {
		$('#photobox-gallery').append($("<div class='vignette' > <img data-img="+url+photo.photo.original.href+" data-uri='"+url+photo.links.self.href+"' src="+url+photo.photo.original.href+"> <div>"+photo.photo.titre+"</div></div>"));
	});
}