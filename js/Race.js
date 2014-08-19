(function makeField(){
	var screen = document.getElementsByClassName('screen-container')[0];
	var fragment = document.createDocumentFragment();
	for(var i=0;i<180;i++){
		var div = document.createElement('div');
	    div.setAttribute("class","pix");
	    div.setAttribute("id","deactivated");
	    fragment.appendChild(div);
	}
	screen.appendChild(fragment);
})();
var _points = $(".screen-container div"),
	_rows = 9,
	_columns = 20;
	var	_pCar = new GeneratePlayersCar();
	window.addEventListener("keydown",keyHandler,false);
	window.addEventListener("keypress",keyHandler,false);

/* players car code*/
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
		this.position = "middle";
	}
	GeneratePlayersCar.prototype.turnLeft = function(){
		if(this.position!="left")
		{
			var old = this.details.slice(0);
			for(var i=0;i<this.details.length;i++){
				this.details[i]=_points[(this.details[i].offsetTop*_rows)/20 + (this.details[i].offsetLeft - 3*20)/20];
				this.details[i].setAttribute("id","activated");
			}
			tidyUp(old);
			if(this.position=="middle")
				this.position = "left";
			else
				this.position = "middle";
		}
	}
	GeneratePlayersCar.prototype.turnRight = function(){
		if(this.position!="right")
		{
			var old = this.details.slice(0);
			for(var i=0;i<this.details.length;i++){
				this.details[i]=_points[(this.details[i].offsetTop*_rows)/20 + (this.details[i].offsetLeft + 3*20)/20];
				this.details[i].setAttribute("id","activated");
			}
			tidyUp(old);
			if(this.position=="middle")
				this.position = "right";
			else
				this.position = "middle";
		}
	}
	function keyHandler(e){
		 switch (e.keyCode) {
            case 37:
                _pCar.turnLeft();
                break;
            case 38:
                break;
            case 39:
                _pCar.turnRight();
                break;
            case 40:
                break;
            case 65:
                _pCar.turnLeft();
                break;
            case 87:
                break;
            case 68:
                _pCar.turnRight();
                break;
            case 83:
                break
        }
	}
/*end of players car code*/	


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

    function stepDown(_details){
    	var old = _details.slice(0);
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

/*cars generation code*/
    function generateRandomCars(){
    	function getRandomInt(min, max){
    		return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    	function chooseYourDestiny(params,skipped){
    		var chance = 1 / params.length;
    		var _rand = Math.random();
    		for(var i = 1 ; i<=params.length;i++){
    			if(params[i-1] === skipped)
    				continue;
    			if(_rand < chance * i)
    				return params[i-1];
    		}
    	}
    	var _carTracks = [];
    	_carTracks[0] = chooseYourDestiny([0,1,2]);
    	if(Math.random()>0.5){
    		var temp = chooseYourDestiny([0,1,2],_carTracks[0]);
    		if(typeof temp !== "undefined")
    			_carTracks[1] = temp;
    	}
    	_carTracks.interval = getRandomInt(6,12);
    	return _carTracks;
    }
    function generateLevel(){
    	var _allCars = [];
    	for(var i =0;i<20;i++){
    		_allCars[i] = generateRandomCars();
    	}
    	_allCars[0].interval = 0;
    	return _allCars;
    }
/*car generation code end*/
    
/*enemy car code*/ 
    function Car(details){
		this.details = details.slice(0);
	}
	Car.prototype.roll = function(){
		var self = this;
		function f(){
			var old = stepDown(self.details);
		    var rez = diffArrays(old,self.details);
		    tidyUp(rez);
		}
		setInterval(f,1000);
	}
	Car.appearence = function(runways){
		var	_runwayWidth =3,
			_details =[];
		(function(){
			var _step = 0;
			var i,j;
			function steps(){
				if(runways.interval>0){
					console.log(runways.interval);
					runways.interval--;
					setTimeout(steps,1000);
					return;
				}
				switch(_step){
					case 0:{
						for(i = 0,j =0;i < runways.length;i++,j+=2){
							_details.push(_points[0*_rows+runways[i]*_runwayWidth]);
							_details[j].setAttribute("id","activated");
							_details.push(_points[0*_rows+runways[i]*_runwayWidth+2]);
							_details[j+1].setAttribute("id","activated");
						}
						_step++;
						setTimeout(steps,1000);
						break;
					}
					case 1:{
						var old = stepDown(_details);
						for(i = 0,j;i < runways.length;i++,j++){
							_details.push(_points[0*_rows+runways[i]*_runwayWidth+1]);
					 		_details[j].setAttribute("id","activated");
					    }  
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
			            setTimeout(steps,1000);
			            break;
					}
					case 2:{
						var old = stepDown(_details);
						for(i = 0,j;i < runways.length;i++,j+=3){

							_details.push(_points[0*_rows+runways[i]*_runwayWidth]);
							_details[j].setAttribute("id","activated");
							_details.push(_points[0*_rows+runways[i]*_runwayWidth+1]);
							_details[j+1].setAttribute("id","activated");
							_details.push(_points[0*_rows+runways[i]*_runwayWidth+2]);
							_details[j+2].setAttribute("id","activated");
						}
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
			            setTimeout(steps,1000);
			            break;
					}
					case 3:{
						var old = stepDown(_details);
						for(i = 0,j;i < runways.length;i++,j++){
							_details.push(_points[0*_rows+runways[i]*_runwayWidth+1]);
							_details[j].setAttribute("id","activated");
						}
						var rez = diffArrays(old,_details);
			            tidyUp(rez);
			            _step++;
						clearInterval(id);
						var _car = new Car(_details);
						_car.roll();
						break;
					}
				}
			}
			var id = setTimeout(steps,1000);
		})();
		return _details;		
	}
	/*end of enemy car code*/


	Car.appearence(generateRandomCars());
	//Car.appearence([1]);