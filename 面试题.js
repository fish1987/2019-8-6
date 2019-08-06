function show() {
	console.log('this:', this);
}
var obj = {
	show: show
};
obj.show();
//this指向obj

function show() {
	console.log('this:', this);
}
var obj = {

	show: function() {
		show();
	}
};
obj.show();
//this指向windows

////////////////////


var obj = {
	show: function() {
		console.log('this:', this);
	}
};
(0, obj.show)();
//this指向windows

////////////////////

var obj = {
	sub: {
		show: function() {
			console.log('this:', this);
		}
	}
};
//this指向windows


////////////////////
var obj = {
	show: function() {
		console.log('this:', this);
	}
};
var newobj = new obj.show();
//this指向newobj

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
elem.addEventListener('click', obj.show); //this指向windows
elem.addEventListener('click', obj.show.bind(obj));//this指向obj
elem.addEventListener('click', function() {
	obj.show();//this指向obj
});
