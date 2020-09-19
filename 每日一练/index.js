box.onclick = function () {
	console.log('OK');
};

box.addEventListener('click', function () {
	console.log('DOM2=>OK');
});
box.addEventListener('click', function () {
	console.log('DOM2=>NO');
});