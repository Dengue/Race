window.onload = function(){

makeField();
var _points = $(".screen-container div"),
	_rows = 9,
	_columns = 20;

	function makeField(){
		var screen = document.getElementsByClassName('screen-container')[0];
		for(var i=0;i<180;i++){
			var div = document.createElement('div');
		    div.setAttribute("class","pix");
		    div.setAttribute("id","deactivated");
		    screen.appendChild(div);
		}
	};
	function GeneratePlayersCar(){
				this.details = [];
				this.details.push(_points[19*_rows+3]);
				this.details[0].setAttribute("id","activated");
				this.details.push(_points[19*_rows+5]);
				this.details[1].setAttribute("id","activated");
				this.details.push(_points[18*_rows+4]);
				this.details[2].setAttribute("id","activated");
				this.details.push(_points[17*_rows+3]);
				this.details[3].setAttribute("id","activated");
				this.details.push(_points[17*_rows+4]);
				this.details[4].setAttribute("id","activated");
				this.details.push(_points[17*_rows+5]);
				this.details[5].setAttribute("id","activated");
				this.details.push(_points[16*_rows+4]);
				this.details[6].setAttribute("id","activated");
	}
	var	_pCar = new GeneratePlayersCar();
	function diffArrays(A,B){
    var M = A.length, N = B.length, c = 0, C = [];
	    for (var i = 0; i < M; i++){
	    	var j = 0, k = 0;
	        while (B[j] !== A[ i ] && j < N) j++;
	        while (C[k] !== A[ i ] && k < c) k++;
	        if (j == N && k == c) C[c++] = A[ i ];
	    }
	   return C;
	}	
	function Car(details){
		this.details = details.slice(0);
	}
    function stepDown(_details){
    	var old = _details.slice(0);
    	/*_details.forEach(function(item,i,arr){
    		item=_points[(item.offsetTop+20)/20*_rows+item.offsetLeft/20];
    		item.setAttribute("id","activated");
    	});*/
		for(var i=0;i<_details.length;i++){
			_details[i]=_points[(_details[i].offsetTop+20)/20*_rows+_details[i].offsetLeft/20];
			_details[i].setAttribute("id","activated");
		}
		return old;
    }
    function tidyUp(old){
    	for(var i=0;i<old.length;i++){
    		old[i].setAttribute("id","deactivated");
    	}
    }
	Car.appearence = function(runway){
		var	_runwayWidth =3,
			_details =[];
		(function(){
			var _step = 0;
			function steps(){
				switch(_step){
					case 0:{
						_details.push(_points[0*_rows+runway*_runwayWidth]);
						_details[0].setAttribute("id","activated");
						_details.push(_points[0*_rows+runway*_runwayWidth+2]);
						_details[1].setAttribute("id","activated");
						_step++;
						break;
					}
					case 1:{
						var old = stepDown(_details);
						_details.push(_points[0*_rows+runway*_runwayWidth+1]);
						_details[2].setAttribute("id","activated");
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
			            break;
					}
					case 2:{
						var old = stepDown(_details);
						_details.push(_points[0*_rows+runway*_runwayWidth]);
						_details[3].setAttribute("id","activated");
						_details.push(_points[0*_rows+runway*_runwayWidth+1]);
						_details[4].setAttribute("id","activated");
						_details.push(_points[0*_rows+runway*_runwayWidth+2]);
						_details[5].setAttribute("id","activated");
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
			            break;
					}
					case 3:{
						var old = stepDown(_details);
						_details.push(_points[0*_rows+runway*_runwayWidth+1]);
						_details[6].setAttribute("id","activated");
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
						clearInterval(id);
						var _car = new Car(_details);
						setInterval(roll.bind(_car),100);
						break;
					}
				}
			}
			var id = setInterval(steps,100);
		})();
		return _details;		
	}
	function roll(){
		var old = stepDown(this.details);
		var rez = diffArrays(old,this.details);
		tidyUp(rez);
	}
	Car.appearence(1);
};