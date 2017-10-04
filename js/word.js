
	var MyCanvas={
		ctx:null,
		wordArr:[],
		wordString:"abcdefghijklmnopqrstuvwxyz",//"!@#$%^&*()_+~`'/.,<>",//"O",
		init:function(){
			canvas.setAttribute("width",document.body.clientWidth);
			canvas.setAttribute("height",document.body.clientHeight);		
			this.ctx=canvas.getContext('2d');
			this.ctx.fillStyle="#000";
			this.ctx.fillRect(0,0,document.body.clientWidth,document.body.clientHeight);
		},
		createWord:function(){
			var temp=this.wordString.split('');
			var leng=100;
			var len=temp.length;
			for(let i=0;i<leng;i++){
				var word={};
				word.txt=temp[i%len];
				this.getSpeed(word);
				this.wordArr.push(word);
			}
			this.ctx.font="18px Arial";
		},
		getSpeed:function(word){
			word.speedx=Math.random()*20-10;
			word.speedy=Math.random()*10-5;
			word.x=canvas.width/2;
			word.y=canvas.height/2;
			word.orgSize=10;
			word.color="#"+Math.ceil(Math.random()*0xfff).toString(16);
		},
		refresh:function(arr){
			this.ctx.fillStyle="#000";
			this.ctx.font="18px Arial";
			// var myGradient = this.ctx.createLinearGradient(0, 0, 0, 160); //设置渐变色
			// myGradient.addColorStop(0, "#BABABA"); 
			// myGradient.addColorStop(1, "#636363");
			// this.ctx.fillStyle=myGradient;
			this.ctx.fillRect(0,0,canvas.width,canvas.height);
			let len=arr.length;
			for(let i=0;i<len;i++){
				arr[i].x+=arr[i].speedx;
				arr[i].y+=arr[i].speedy;
				// arr[i].speedy*=0.99;
				arr[i].orgSize+=1;
				if(arr[i].x<0||arr[i].x>canvas.width||arr[i].y<0||arr[i].y>canvas.height||(arr[i].speedx==0&&arr[i].speedy==0)||arr[i].orgSize>=100){
					var newWord={};
					newWord.txt=arr[i].txt;
					arr.splice(i,1);						
					this.getSpeed(newWord);
					arr.push(newWord);
				}
			}
		},
		drawords:function(arr){
			let len=arr.length;
			this.ctx.fillStyle="red";
			for(let i=len-1;i>=0;i--){
				this.ctx.fillStyle=arr[i].color;
				this.ctx.font=arr[i].orgSize+"px Arial";
				this.ctx.fillText(arr[i].txt,arr[i].x,arr[i].y);
			}
		},
		loop:function(){				
			this.refresh(this.wordArr);
			this.drawords(this.wordArr);
		},
		run:function(){
			this.init();
			this.createWord();
			this.loop();		
		}
	}
	function show(){
		MyCanvas.init();
		MyCanvas.createWord();
		var requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;
		var cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame;
		if(!requestAnimationFrame||!cancelAnimationFrame){//如果浏览器不支持requestAnimationFrame
			
			function dloop(){
				MyCanvas.loop();
				setTimeout(function(){
					dloop();
				},1000/60);
			};
			dloop();
		}
		else {
			// window.requestAnimationFrame=requestAnimationFrame;
			// window.cancelAnimationFrame=requestAnimationFrame;
			var sloop=function(){
				MyCanvas.loop();
				requestAnimationFrame(sloop);
			}
			requestAnimationFrame(sloop);
		}
	}
	show();		