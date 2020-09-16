/*
		 * 曹超要结婚 (7.5)
		 *    计划表：把结婚当天要做的事情一件件都列举出来
		 *    结婚时：按照计划表中的计划一件件的去执行即可
		 * =>发布订阅（按照了DOM2事件池的机制）
		 * 1.创建事件池
		 * 2.向事件池中追加方法/移除方法
		 * 3.通知事件池中的方法执行
		 */
(function () {
	const hasOwn = Object.prototype.hasOwnProperty;
	class Sub {
		// 创建事件池
		pond = {};
		// SUB.PROTOTYPE
		on(type, func) {
			let pond = this.pond,
				listeners;
			!hasOwn.call(pond, type) ? pond[type] = [] : null;
			listeners = pond[type];
			!listeners.includes(func) ? listeners.push(func) : null;
		}
		off(type, func) {
			let pond = this.pond,
				listeners = pond[type] || [];
			if (listeners.length === 0) return;
			for (let i = 0; i < listeners.length; i++) {
				if (listeners[i] === func) {
					// listeners.splice(i, 1); //=>会导致数组踏实
					listeners[i] = null;
					return;
				}
			}
		}
		fire(type, ...params) {
			let pond = this.pond,
				listeners = pond[type] || [];
			if (listeners.length === 0) return;
			for (let i = 0; i < listeners.length; i++) {
				let itemFunc = listeners[i];
				if (typeof itemFunc !== "function") {
					listeners.splice(i, 1);
					i--;
					continue;
				}
				itemFunc(...params);
			}
		}
	}

	window.subscribe = function subscribe() {
		return new Sub();
	};
})();

function fn1() {
	console.log(1);
}

function fn2() {
	console.log(2);
	plan.off('A', fn1);
	plan.off('A', fn2);
}

function fn3() {
	console.log(3);
}

function fn4() {
	console.log(4);
}

function fn5(n, m) {
	console.log(5, n, m);
}

let plan = subscribe();
plan.on('A', fn1);
plan.on('A', fn2);
plan.on('A', fn3);
plan.on('A', fn4);
plan.on('A', fn5);

document.onclick = () => {
	plan.fire('A', 10, 20);
};