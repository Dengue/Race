
var _raceTetris = {
	_restart:false,
	makeField:function(){
		var screen = document.getElementsByClassName('screen-container')[0];
		var fragment = document.createDocumentFragment();
		for(var i=0;i<180;i++){
			var div = document.createElement('div');
		    div.setAttribute("class","pix");
		    div.setAttribute("id","deactivated");
		    fragment.appendChild(div);
		}
		screen.appendChild(fragment);
	},
	startGame:function(){
		var _points = document.querySelectorAll(".screen-container div"),
		_rows = 9,
		_columns = 20,
		_car,
		_carHeight = 5,
		_carDetails = 7,
		_speed = 50,
		_pCar = new GeneratePlayersCar();
		window.addEventListener("keydown",keyHandler,false);
		window.addEventListener("keypress",keyHandler,false);
		_raceTetris.restart.costile = 0;
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
			this.position = 1;
		}
		GeneratePlayersCar.prototype.turnLeft = function(){
			if(this.position!=0)
			{
				this.check(-1);
				var old = this.details.slice(0);
				for(var i=0;i<this.details.length;i++){
					this.details[i]=getColumnSidewayPoint(this.details[i],-3);
					this.details[i].setAttribute("id","activated");
				}
				tidyUp(old);
				if(this.position==1)
					this.position = 0;
				else
					this.position = 1;
			}
		}
		GeneratePlayersCar.prototype.turnRight = function(){
			if(this.position!=2)
			{
				this.check(1);
				var old = this.details.slice(0);
				for(var i=0;i<this.details.length;i++){
					this.details[i]=getColumnSidewayPoint(this.details[i],3);
					this.details[i].setAttribute("id","activated");
				}
				tidyUp(old);
				if(this.position==1)
					this.position = 2;
				else
					this.position = 1;
			}
		}
		GeneratePlayersCar.prototype.check = function(side){
			if(getColumnSidewayPoint(this.details[6],side*2).getAttribute("id")=="activated"){
				_raceTetris._restart=true;
			}
			if(side>0){
				var temp = getColumnSidewayPoint(this.details[1],side).getAttribute("id");
				var temp1 =getColumnSidewayPoint(this.details[5],side).getAttribute("id");
				var temp2=getColumnSidewayPoint(this.details[1],2*side).getAttribute("id");
				var temp3 =getColumnSidewayPoint(this.details[5],2*side).getAttribute("id");
			}
			else{
				temp = getColumnSidewayPoint(this.details[0],side).getAttribute("id");
				temp1 =getColumnSidewayPoint(this.details[3],side).getAttribute("id");
				temp2=getColumnSidewayPoint(this.details[0],2*side).getAttribute("id");
				temp3 =getColumnSidewayPoint(this.details[3],2*side).getAttribute("id");
			}
			if(temp==="activated" || temp1==="activated" || temp2==="activated" || temp3 ==="activated")
				_raceTetris._restart=true;
		}
		function keyHandler(e){
			 switch (e.keyCode) {
	            case 37:{
	                _pCar.turnLeft();
	                break;
	            }
	            case 38:
	                break;
	            case 39:{
	                _pCar.turnRight();
	                break;
	            }
	            case 40:
	                break;
	            case 65:{
	                _pCar.turnLeft();
	                break;
	            }
	            case 87:
	                break;
	            case 68:{
	                _pCar.turnRight();
	                break;
	            }
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
		function getRowDownPoint(point,rows){
			if(typeof rows == "undefined")
				rows = 1;
			return _points[(point.offsetTop+20*rows)/20*_rows+point.offsetLeft/20];
		}
		function getColumnSidewayPoint(point,columns){
			if(typeof columns == "undefined")
				columns = 1;
			return _points[(point.offsetTop)/20*_rows+(point.offsetLeft + columns*20)/20];
		}
	    function stepDown(_details){
	    	var old = _details.slice(0);
			for(var i=0;i<_details.length;i++){
				_details[i]=getRowDownPoint(_details[i]);
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
	    	_carTracks.interval = getRandomInt(5,11);
	    	return _carTracks;
	    }
	/*car generation code end*/
	    
	/*enemy car code*/ 
	    function Car(details,runways){
			this.details = details.slice(0);
			this.runways = runways;
		}
		Car.prototype.roll = function(){
			var self = this;
			Car.appearence(generateRandomCars());
			var i = _columns - _carHeight;
			function check(){
				var _controlPixes = 2* self.details.length / _carDetails;
				for(var i =0 ;i<_controlPixes;i++){
					if(getRowDownPoint(self.details[i]).getAttribute("id")==="activated"){
						_raceTetris._restart=true;
					}
				}
			}
			function f(){
				check();
				if(_raceTetris._restart){
					window.removeEventListener("keydown",keyHandler,false);
					window.removeEventListener("keypress",keyHandler,false);
					setTimeout(_raceTetris.gameOver,300);
					setTimeout(_raceTetris.restart,2000);
					return;
				}
				var old = stepDown(self.details);
			    var rez = diffArrays(old,self.details);
			    tidyUp(rez);
			    if(i-- > 0)
			    	setTimeout(f,_speed);
			    else
			    	Car.disappearence(self);

			}
			setTimeout(f,_speed);
		}
		Car.disappearence = function(car){
				var _step = 0;
				var i,j,_runwayAmount = car.runways.length;
				var _details = car.details.slice(0);
				function steps(){
					if(_raceTetris._restart)
					return;
					switch(_step){
						case 0:{
							for(i=0;i<2*_runwayAmount;i++){
								var temp = _details.shift();
								temp.setAttribute("id","deactivated");
							}
							var old = stepDown(_details);
							var rez = diffArrays(old,_details);
				            tidyUp(rez);
							_step++;
							setTimeout(steps,_speed);
							break;
						}
						case 1:{
							for(i=0;i<1*_runwayAmount;i++){
								var temp = _details.shift();
								temp.setAttribute("id","deactivated");
							}
							var old = stepDown(_details);
							var rez = diffArrays(old,_details);
				            tidyUp(rez);
				            _step++;
				            setTimeout(steps,_speed);
				            break;
						}
						case 2:{
							for(i=0;i<3*_runwayAmount;i++){
								var temp = _details.shift();
								temp.setAttribute("id","deactivated");
							}
							var old = stepDown(_details);
							var rez = diffArrays(old,_details);
				            tidyUp(rez);
				            _step++;
				            setTimeout(steps,_speed);
				            break;
						}
						case 3:{
							for(i=0;i<1*_runwayAmount;i++){
								var temp = _details.shift();
								temp.setAttribute("id","deactivated");
							}
							var old = stepDown(_details);
							var rez = diffArrays(old,_details);
				            tidyUp(rez);
				            _step++;
							break;
						}
					}
				}
				var id = setTimeout(steps,_speed);
		}
		Car.appearence = function(runways){
			var	_runwayWidth =3,
				_details =[];
				var _step = 0;
				var i,j;
				function steps(){
					if(_raceTetris._restart)
					return;
					if(runways.interval>0){
						runways.interval--;
						setTimeout(steps,_speed);
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
							setTimeout(steps,_speed);
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
				            setTimeout(steps,_speed);
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
				            setTimeout(steps,_speed);
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
							_car = new Car(_details,runways);
							_car.roll();
							break;
						}
					}
				}
				var id = setTimeout(steps,_speed);	
		}
		/*end of enemy car code*/
		Car.appearence(generateRandomCars());
	},
	restart:function(){
		_raceTetris.restart.costile++;
		if(_raceTetris.restart.costile%2===1){
			_raceTetris._restart =false;
			var _points = document.querySelectorAll(".screen-container div");
			for(var i=0;i<_points.length;i++){
				_points[i].setAttribute("id","deactivated");
			}
			setTimeout(_raceTetris.startGame,500);
		}
	},
	gameOver:function(){
		var _points = document.querySelectorAll(".screen-container div");
		var _activePoints = [];
		function turnOff(elem){
			if(elem.getAttribute("id")==="activated"){
				_activePoints.push(elem);
				elem.setAttribute("id","deactivated");
			}
		}
		function turnOn(){
			for(var i=0;i<_activePoints.length;i++){
				_activePoints[i].setAttribute("id","activated");
			}
		}
		for(var i=0;i<_points.length;i++){
			turnOff(_points[i])
		}
		setTimeout(turnOn,1000);
	}
}


window.onload = function(){
	_raceTetris.makeField();
	setTimeout(_raceTetris.startGame,2000);
}


	