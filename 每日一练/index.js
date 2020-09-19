center.onclick = function (ev) {
	console.log('CENTER');
	ev.stopPropagation();
};
inner.onclick = function (ev) {
	console.log('INNER');
	ev.stopPropagation();
};
outer.onclick = function () {
	console.log('OUTER');
};