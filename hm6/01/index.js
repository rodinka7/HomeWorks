'use strict';

let timer = (time) => {
	return new Promise(function(resolve, reject) {
		setTimeout(function(){
			resolve();
		}, time);
	});
}

timer(3000).then(() => console.log('я вывелась через 3 секунды'));
