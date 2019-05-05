((test, test2, test3, test4, test6) => {
	var a = 3, b = 5,
		c = 30;
	/* semi: "off" */
	for (var i = 0; i < 10; i++) {
		console.log(i);
	}
	console.log('test');
})();

function test() {
	console.log('aaa');
}
