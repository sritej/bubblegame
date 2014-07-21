var mp = 40;
var particles = [];
var lockval=[];
var sound = new Audio("pop.wav"); // buffers automatically when created
sound.preload = 'auto';
sound.load();
var cntr=0;
var score=0;		
//window.onload = function(){
function gamestart(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	canvas.addEventListener("mousedown", getPosition, false);
	
	//var mp = 40; //max particles
		
	var total=0;
	//snowflake particles
		
	//var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*40+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	
	
	sortvalues=[];
	bonus=[];
	for(var i = 0; i < mp; i++)
	{
		sortvalues[i]=Math.round(particles[i].r);
		if (Math.random()>0.9)
		{
		bonus[i]=1;
		}
		
		else bonus[i]=0;
		lockval[i]=0;
	}
	//sortvalues.sort();
	sortvalues.sort(function(a,b){return a - b})
	var values = [];
	for(var i = 0; i < mp; i++)
	{	
		
		values[i]=sortvalues[mp-1-sortvalues.indexOf(Math.round(particles[i].r))];	
			if (Math.random()>0.8)
			{
			values[i]=values[i]*-1;
			}
	}
	document.getElementById("timerval").style.top = "1px";
	document.getElementById("timerval").style.left = H+"px";
	
	var milisec=0 
	var seconds=0 	
	var minutes=1
	document.counter.d2.value='1:0:0' 
	function display(){ 
		if(seconds<=0)
		{
		milisec=9 
		seconds=59
		minutes-=1		
		}
		
		if (milisec<=0){ 
		milisec=9 
		seconds-=1 
		} 
						
		if (minutes==-1){ 
			milisec=0 
			seconds=0
			minutes+=1 
		} 
		else 
			milisec-=1 
		document.counter.d2.value=minutes+":"+seconds+":"+milisec
			if (minutes==0 && seconds==0 && milisec==0)
			{clearInterval(stop);
			document.getElementById("total").innerHTML = "Total Score: "+score;
			document.getElementById('foo').click();
			//initgame();
			}
		//setTimeout("display()",100) 
	}
	
	
	
	//Lets draw the flakes
	function draw()
	{
		cntr++;
		if (cntr==10)
		{
		cntr=0;
		display();
		}
		ctx.clearRect(0, 0, W, H);
		//ctx.fillText("Hello World",100,1000);
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{				
			/*
			if (i==11 || i==22)
			{
				ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
			}
			else if (i==7 || i==14 || i==21)
			{
				ctx.fillStyle = "rgba(255, 7, 7, 0.8)";
			}	
			else if (i==5 || i==10 || i==15 || i==20)
			{
				ctx.fillStyle = "rgba(98, 76, 76, 0.8)";
			}			
			else if (i==3 || i==6 || i==9 || i==12 || i==18 || i==24)
			{
				ctx.fillStyle = "rgba(51, 255, 51, 0.8)";
			}
			else 
			{
				ctx.fillStyle = "rgba(255, 0, 127, 0.8)";
			}*/
			if (bonus[i] == 1)
			{
				ctx.fillStyle = "rgba(255, 0, 127, 0.8)";
			}
			else
			ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
			ctx.beginPath();
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			//ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
			
			//ctx.fillText(i,p.x,p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
			
			ctx.fill();
			
			
			ctx.fillStyle = "black";
			ctx.beginPath();
			
			//ctx.fillText(i+"",p.x,p.y);
			if (bonus[i] == 1)
			{
				ctx.font = "bold 18px Arial";	
				ctx.fillText("x2",p.x,p.y);
			}
			else
			{
			ctx.font = "bold 15px Arial";	
if(values[i]>0)			
			{ctx.fillText("+"+values[i]+"",p.x,p.y);			}
			else
			{ctx.fillText(" "+values[i]+"",p.x,p.y);			}
			}
			ctx.fill();
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			//p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.y += (Math.cos(angle+p.d) + 1 + p.r/2)/20;
			//p.x += Math.sin(angle) * 2;
			p.x += (Math.sin(angle))/10;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			
			if (lockval[i] == 1)
			{
				if (bonus[i]==1)
				{
				var message = "<br>" + score + " x " + 2 + " = " + (score*2);
				updatescore(score,message);
				}
				else 
				{
				if (values[i]<0)
				var message = "<br>" + score + " - " + (values[i]*-1) + " = " + (score+values[i]);
				else var message = "<br>" + score + " + " + values[i] + " = " + (score+values[i]);
				updatescore(values[i],message);
				
				}
				lockval[i]=0;
				//alert("altered");
				particles[i] = {x: Math.random()*W, y: -2*(p.r), r: p.r, d: p.d};
				
			}
			else if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%4 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exiting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
			
		}
	}
	
	//animation loop
	var stop=setInterval(draw, 6);
}


function getPosition(event)
    {
        var x = new Number();
        var y = new Number();
        var canvas = document.getElementById("canvas");

        if (event.x != undefined && event.y != undefined)
        {
          x = event.x;
          y = event.y;
        }
        else // Firefox method to get the position
        {
          x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

		//alert("x: " + x + "  y: " + y);
		
		// check for point inside a circlular shape
		
		//alert("x: " + x + "  y: " + y + " mp:"+mp);
		
		for(var j = 0; j < mp; j++)
		{			
			//alert("f2x: " + x + "  y: " + y);
			var q = particles[j];
			//alert("f3x: " + x + "  y: " + y);
			//alert("r.x:"+q.x);
			var dx = q.x-x;			
			var dy = q.y-y;
			//alert("entered");
			/*alert("x: " + q.x + "  y: " + q.y + " j:"+j +"q.r:"+q.r);
			alert("dx*dx+dy*dy:"+((dx*dx)+(dy*dy)));
			alert("r.r*r.r"+(q.r*q.r));*/
			if (((dx*dx)+(dy*dy)) <= (q.r*q.r))
			{
				//alert("blast"+j);
				EvalSound();
				//particles[j] = {x:0, y:0, r: p.r, d: p.d};
		/*		x: Math.random()*W, //x-coordinate
				y: Math.random()*H, //y-coordinate
				r: Math.random()*40+1, //radius
				d: Math.random()*mp //density
				}*/
				lockval[j]=1;
				break;
			}						
		}
		
        //alert("x: " + x + "  y: " + y);
    }
function EvalSound() {

/*   var snd = new Audio("pop.wav"); // buffers automatically when created
	snd.play();
*/
  var click=sound.cloneNode();
  //click.volume=volume;
  click.play();
}

function restartgame()
{
initgame();
gamestart();
//location.reload();
//alert("hi");
}

function initgame()
{
particles = [];
lockval=[];
cntr=0;
score=0;
document.counter.s2.value=score;
document.getElementById("left-panel").innerHTML="";
}

function updatescore(val,message)
{
//var message = "";
//message = "<br>" + score + " + " + val + " = " + (score+val);
//alert(message);
//document.getElementById("left-panel").innerHTML = document.getElementById("left-panel").innerHTML + "<br><b>" + score+" + "+val+" = " + (score+val) +"</b>";
document.getElementById("left-panel").innerHTML = document.getElementById("left-panel").innerHTML + message;
score=score+val;
document.counter.s2.value=score;

}