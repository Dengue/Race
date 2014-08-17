(function(){
	var assert_ul = document.createElement('ul');
	assert_ul.style["borderColor"] = "gold";
	assert_ul.style["borderStyle"] = "solid";
	var positive = {
		"backgroundColor":"green"
	}
	var negative = {
		"backgroundColor":"red",
		"textDecoration":"line-through"
	}
	window.assert = function(expression,result_string){
		var result = expression ? true : false;
		if(result){
			var li = document.createElement('li');
			for(var prop in positive){
				li.style[prop] = positive[prop];
			}
			li.appendChild(document.createTextNode(result_string));
			assert_ul.appendChild(li);
		}
		else{
			var li = document.createElement('li');
			for(var prop in negative){
				li.style[prop] = negative[prop];
			}
			li.appendChild(document.createTextNode(result_string));
			assert_ul.appendChild(li);
		}

	}
	document.body.appendChild(assert_ul);
})();