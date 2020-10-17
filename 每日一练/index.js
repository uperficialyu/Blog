let ary = [
	{ name: 1, age: 2, number: 1, son: 'son1' },
	{ name: 2, age: 23, number: 2, son: 'son2' },
	{ name: 2, age: 22, number: 3, son: 'son3' },
	{ name: 1, age: 12, number: 4, son: 'son4' },
	{ name: 1, age: 42, number: 5, son: 'son5' }
]

function fn(ary) {
	let arr = [];
	ary.forEach(item => {
		let bol = arr.some(val => {
			if (val.name === item.name) {
				let obj = {};
				Object.keys(item).forEach(v => {
					if (v != 'name' && v != 'age') {
						obj[v] = item[v]
					}
				})
				val.list.push(obj);
				return true
			}
		})
		if (!bol) {
			let obj = {};
			Object.keys(item).forEach(v => {
				if (v != 'name' && v != 'age') {
					obj[v] = item[v]
				}
			})
			arr.push({ name: item.name, list: [obj] });
		}
	})
	return arr;
}
fn(ary)
console.log(fn(ary))


var aa = /^[1-9]\d+(\.\d+)?$/;
var bb= 0;
