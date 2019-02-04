import './slider.js';

const key = 'AIzaSyAGVuHbtIE5RqdfoKV-GJqA4tzkuEgfecs';
let str;

document.addEventListener('keydown', (e) => {
	if (document.querySelector('input').value && e.keyCode === 13) {
		str = document.querySelector('input').value;
		getData();
	}
}, false);

document.write('<html><body><div class="main"><div class = "search">' +
    '<div class="icon"></div><input id = "input" class = "input" type="text">' +
    '</div> <div class="slider">' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '<div class="slide"></div>' +
    '</div>' +
    '<div class="dots-wrapper"></div></body></html>');


function getData() {
	fetch(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&q=${str}`, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => {
			let ids = [];
			for (let i = 0; i < 15; i++) {
				ids[i] = data.items[i].id.videoId;
			}
			getDataById(ids);
		})
		// eslint-disable-next-line no-console
		.catch(error => console.error(error));
}

function getDataById(arr) {
	document.querySelector('.slider').style.visibility = 'visible';
	document.querySelector('.dots-wrapper').style.visibility = 'visible';

	fetch(`https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${arr}&part=snippet,statistics`, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => {
			let videos = [];

			for (let i = 0; i < data.items.length; i++) {
				const video = {
					title: data.items[i].snippet.title,
					date: (data.items[i].snippet.publishedAt).slice(0, 10),
					views: data.items[i].statistics.viewCount,
					chanel: data.items[i].snippet.channelTitle,
					description: (data.items[i].snippet.description).slice(0, 150) + '...',
					image: data.items[i].snippet.thumbnails.default.url
				};

				videos.push(video);
			}

			updateBlocksData(videos);
		})
		// eslint-disable-next-line no-console
		.catch(error => console.error(error));
}

function updateBlocksData(videos) {
	for (let i = 0; i < document.querySelectorAll('.block').length; i++) {
		document.querySelectorAll('#textTitle')[i].innerHTML = videos[i].title;
		document.querySelectorAll('#image')[i].style.background = 'url(' + videos[i].image + ') no-repeat';
		document.querySelectorAll('#image')[i].style.backgroundSize = '100% 100%';
		document.querySelectorAll('#author')[i].innerHTML = videos[i].chanel;
		document.querySelectorAll('#day')[i].innerHTML = videos[i].date;
		document.querySelectorAll('#count')[i].innerHTML = videos[i].views;
		document.querySelectorAll('#text')[i].innerHTML = videos[i].description;
	}
}