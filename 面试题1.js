1.考察this三板斧
1.1
function show() {
	console.log('this:', this);
}
var obj = {
	show: show
};
obj.show();
//this指向obj. 解析：show()函数是被obj调用才执行的.
1.2
function show() {
	console.log('this:', this);
}
var obj = {

	show: function() {
		show();
	}
};
obj.show();
//this指向windows 解析：show()函数是自己执行的，没有被调用.

////////////////////

1.3
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
(0, obj.show)();
//this指向windows 解析：逗号表达式执行的是最后一个，show（）执行的时候，并没有被谁调用，所以是windows

////////////////////
1.4
var obj = {
	sub: {
		show: function() {
			console.log('this:', this);
		}
	}
};
//this指向windows 解析：没被调用，没执行

1.5
////////////////////
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
var newobj = new obj.show();
//this指向newobj 解析：对象被new出来一个新实例，这个函数里的this指向实例

////////////////////

1.6
var obj = {
	show: function() {
		console.log('this:', this);
	}
};

var newobj = new(obj.show.bind(obj))();
//this指向newobj(优先级，new实例优先于显示绑定，显示绑定优先于属性调用器./[])
////////////////////	

1.7
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
var elem = document.getElementById('book-search-results');
elem.addEventListener('click', obj.show); //this指向windows 解析：obj.show只是表示一个函数体，show()函数执行的时候，还是自己执行的，并没有被谁调用执行。
elem.addEventListener('click', obj.show.bind(obj)); //this指向obj 解析：bind把this指向转换成了obj
elem.addEventListener('click', function() {
	obj.show(); //this指向obj 解析：调用的时候，是obj调用函数执行的。
});


2作用域:
2.1
	var person = 1;

function showPerson() {
	var person = 2;
	console.log(person);
}
showPerson();
//2
2.2
var person = 1;

function showPerson() {
	console.log(person);
	var person = 2;
}
showPerson();
//undefined
2.3
var person = 1;

function showPerson() {
	console.log(person);

	var person = 2;

	function person() {}
}
showPerson();
//function person() {}

2.4
var person = 1;

function showPerson() {
	console.log(person);

	function person() {}
	var person = 2;
}
showPerson();
//function person() {}
//解析：变量提升，
//var person = function(){}
//var person



2.5
for (var i = 0; i < 10; i++) {
	console.log(i);
}
//0 1 2 3 4 5 6 7 8 9

for (var i = 0; i < 10; i++) {
	setTimeout(function() {
		console.log(i);
	}, 0);
}
//10个10
//解析：同步队列的for循环执行完成才轮到异步队列， 每一次for循环的时候，
//settimeout都执行一次，但是里面的function（闭包函数）没有被执行，
//而是被放到了任务队列里面，等待执行，当i累加到10的时候跳出循环。此时全局只有一个变量i=>10，所以打印出来10个是10。
for (var i = 0; i < 10; i++) {
	(function(i) {
		setTimeout(function() {
			console.log(i);
		}, 0)
	})(i);
}
//0 1 2 3 4 5 6 7 8 9
for (let i = 0; i < 10; i++) {
	console.log(i);
}
//0 1 2 3 4 5 6 7 8 9


3面向对象
3.1
function Person() {
	this.name = 1;
	return {};
}
var person = new Person();
console.log('name:', person.name);

//undefine
//解析：return返回一个空对象
3.2
function Person() {
	this.name = 1;
}
Person.prototype = {
	show: function() {
		console.log('name is:', this.name);
	}
};
var person = new Person();
person.show();
// name is 1

3.3
function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name	is:', this.name);
	}
};
var person = new Person();
Person.prototype.show = function() {
	console.log('new	show');
};
person.show();

//new	show
3.4
function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name is:', this.name);
	}
};
var person = new Person();
var person2 = new Person();
person.show = function() {
	console.log('new show');
};
person2.show();
person.show();
//name is:1 解析：this指向person2实例
//new show

3.5综合题
function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function() {
		console.log('name is:', this.name);
	}
};
Person.prototype.show();
(new Person()).show();
//name is:2 解析：this指向原型
//name is:1 解析：this指向实例函数