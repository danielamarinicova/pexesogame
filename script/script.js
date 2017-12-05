var player=1;
var score1=0;
var score2=0;
var turn1=-1;
var turn2=-1;
var turnGuessed;
var field = [ [1,1,2,2], [3,3,4,4], [5,5,6,6], [7,7,8,8] ];
shuffle();

function shuffle() 
{
	var i,temp;
	for(i=0; i<20; i++)
	{
		var r1=Math.floor( Math.random()*4 );
		var c1=Math.floor( Math.random()*4 );
		var r2=Math.floor( Math.random()*4 );
		var c2=Math.floor( Math.random()*4 );
		temp=field[r1][c1];
		field[r1][c1]=field[r2][c2];
		field[r2][c2]=temp;
	}
console.log("Shuffle Finished:");
console.log(field);

}


function clickImg(value) {
	if(turn2!=-1)
		return;
	var row=Math.floor(value/10);
	var col=value%10;

	if(field[row][col]==0)
		return;
console.log("You clicked: row:"+row+" col:"+col) ;

	if(turn1==row*10+col)
		return;

	if(field[row][col]>0) {
		var source="images/img"+field[row][col]+".jpg";
		var imageId="img"+row+col;
		console.log(imageId) ;
		document.getElementById(imageId).src=source;
	}
	if(turn1==-1)	//prave sme otocili 1.karticku
		turn1=row*10+col;
	else	{	//otocili sme 2.karticku
		turn2=row*10+col;
		checkSelectedCards();
	}
}

function checkSelectedCards (){
	var row1=Math.floor(turn1/10);
	var row2=Math.floor(turn2/10);
	var col1=turn1%10;
	var col2=turn2%10;

	if(field[row1][col1]==field[row2][col2]){
		if (player==1){
			score1++;
		}

											
	else{
		score2++;
		}
		turnGuessed=turn1;
		setTimeout(moveCard,1500);
		updateScore();
}
else
{
setTimeout(turnBack,2000);
player=player==1?2:1;
}
}
function turnBack(){
	console.log("test");
	var row1=Math.floor(turn1/10);
	var row2=Math.floor(turn2/10);
	var col1=turn1%10;
	var col2=turn2%10;
	var imageId="img"+row1+col1;
	console.log(imageId) ;
	document.getElementById(imageId).src="images/back.jpg";	
	var imageId="img"+row2+col2;
	document.getElementById(imageId).src="images/back.jpg";
	turn1=-1;
	turn2=-1;
}

function moveCard(){
	var table;
	if(player==1){
		table=document.getElementById("tableP1");
	}else{
		table=document.getElementById("tableP2");
	}
	var row1=Math.floor(turn1/10);
	var col1=turn1%10;
	var row2=Math.floor(turn2/10);
	var col2=turn2%10;
	var imageSource="images/img"+field[row1][col1]+".jpg";

	var imageId="img"+row1+col1;
	document.getElementById(imageId).src="images/blank.jpg";

	imageId="img"+row2+col2;
	document.getElementById(imageId).src="images/blank.jpg";
	var row = table.insertRow(0);

	var cell=row.insertCell(0);
	cell.innerHTML="<IMG SRC=\""+imageSource+"\" Width=\"75\">";

	field[row1][col1]=0;
	field[row2][col2]=0;

	turn1=-1;
	turn2=-1;
}

function updateScore(){
	if(player==1){
		document.getElementById("score1").innerHTML="Score :"+score1;
	}
	else{
		document.getElementById("score2").innerHTML="Score :"+score2;
	}
}