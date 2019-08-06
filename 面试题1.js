function show() {
	console.log('this:', this);
}
var obj = {
	show: show
};
obj.show();
//this指向obj. 解析：show()函数是被obj调用才执行的.

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


var obj = {
	show: function() {
		console.log('this:', this);
	}
};
(0, obj.show)();
//this指向windows 解析：逗号表达式执行的是最后一个，show（）执行的时候，并没有被谁调用，所以是windows

////////////////////

var obj = {
	sub: {
		show: function() {
			console.log('this:', this);
		}
	}
};
//this指向windows 解析：没被调用，没执行


////////////////////
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
var newobj = new obj.show();
//this指向newobj 解析：对象被new出来一个新实例，这个函数里的this指向实例

////////////////////


var obj = {
	show: function() {
		console.log('this:', this);
	}
};

var newobj = new(obj.show.bind(obj))();
//this指向newobj(优先级，new实例优先于显示绑定，显示绑定优先于属性调用器./[])
////////////////////	
	
	
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
var elem = document.getElementById('book-search-results');
elem.addEventListener('click', obj.show); //this指向windows 解析：obj.show只是表示一个函数体，show()函数执行的时候，还是自己执行的，并没有被谁调用执行。
elem.addEventListener('click', obj.show.bind(obj));//this指向obj 解析：bind把this指向转换成了obj
elem.addEventListener('click', function() {
	obj.show();//this指向obj 解析：调用的时候，是obj调用函数执行的。
});
