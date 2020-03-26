import * as gallery from './gallery.js';
import * as photoload from './photoload.js';
let thisSuite;
export function displayLightBox() {
	$(".gallery-container").on('click', '.vignette', function () {
		$("body").css('overflow','hidden');
		thisSuite = this;
		load(this);
		prev();
		next();
	});
	$('#addComment input[name="submit"]').on('click', function() {
		let id = $(thisSuite).find('img').attr('data-uri').replace('https://webetu.iutnc.univ-lorraine.fr/www/canals5/photobox/photos/','');
		let data = {
			"titre"       : $("#addComment input[name='title']").val(),
			"content"     : $("#addComment input[name='message']").val(),
			"pseudo"      : $("#addComment input[name='pseudo']").val()
		}
		let p = photoload.addComment(`/www/canals5/photobox/photos/${id}/comments`, data);
		$("#addComment input[name='title']").val("");
		$("#addComment input[name='message']").val("");
		$("#addComment input[name='pseudo']").val("");
		loadComments();

	});
}

function load(thisSuite) {
	let p = photoload.loader($(thisSuite).find('img').attr('data-uri').replace('https://webetu.iutnc.univ-lorraine.fr',''));
	p.then(create).catch(function(error) {
		console.log(error);
	});
}
function loadComments() {
	let pr = photoload.loader($(thisSuite).find('img').attr('data-uri').replace('https://webetu.iutnc.univ-lorraine.fr','')+'/comments');
	pr.then(addComments).catch(function(error) {
		console.log(error);
	});
}
function create(obj) {
	$("#lightbox_full_img").attr('src', ($(thisSuite).find('img')).attr('data-img'));
	$("#lightbox_full_img").attr('data-uri', ($(thisSuite).find('img')).attr('data-uri'));
	$("#lightbox_title").text($(thisSuite).find('div').text());


	$("#lightbox_descr").text(obj.data.photo.descr);
	$("#lightbox_format").text(obj.data.photo.format);
	$("#lightbox_type").text(obj.data.photo.type);
	$("#lightbox_size").text(obj.data.photo.size);
	$("#lightbox_width").text(obj.data.photo.width);
	$("#lightbox_height").text(obj.data.photo.height);
	loadComments();
	display();
}

function addComments(obj) {
	$('#comments').empty();
	obj.data.comments.forEach((e) => {
		$('#comments').append('<div class="comments"> <h4 id="titreComment">'+e.titre+'</h4><div id="contentComment">✉️ : '+e.content+'</div><div id="pseudoComment">🧑 : '+e.pseudo+'</div><div id="dateComment">🕐 : '+e.date+'</div> </div><br>')
	})
}

function display() {
	$(".lightboc_container").show();
	$("#lightbox_close").on('click', function () {
		$(".lightboc_container").hide();
		$("#lightbox_close").unbind('click');
		$("#previous-lightbox").unbind('click');
		$("#next-lightbox").unbind('click');
		$("body").css('overflow','visible');

	});

}

function prev() {
	$("#previous-lightbox").on('click', function () {
		if($(thisSuite).prev().length > 0){
			thisSuite = $(thisSuite).prev();
		}
		else {
			thisSuite = $(thisSuite).parent().children().last()[0];
		}
		load(thisSuite);

	});
}

function next() {
	$("#next-lightbox").on('click', function () {
		if($(thisSuite).next().length > 0){
			thisSuite = $(thisSuite).next();
		}
		else {
			thisSuite = $(thisSuite).parent().children().first()[0];
		}
		load(thisSuite);
	});
}