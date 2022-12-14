window.onload=function(){
    var canvas=document.getElementById("game");
    var context=canvas.getContext("2d");
    canvas.width=800;
    canvas.height=550;
    var grid=16;
    var count=0;
    var score=0
    var max=0
    var snake={
        x:160,
        y:160,
        dx:grid,
        dy:0,

        maxCells:4
    };
    var food={
        x:320,
        y:320
    };
    

    function getRandomInt(min,max){
        return Math.floor(Math.random()*(max-min))+min;
    }

    function loop(){
        requestAnimationFrame(loop);

        if(++count<4){
            return;
        }
        count=0;
        context.clearRect(0,0,canvas.width,canvas.height);

        snake.x+=snake.dx
        snake.y+=snake.dy

        if(snake.x<0){
            snake.x=canvas.width-grid;
        }
        else if(snake.x>=canvas.width){
            snake.x=0
        }

        if(snake.y<0){
            snake.y=canvas.height-grid;
        }
        else if(snake.y>=canvas.height){
            snake.y=0;
        }
        snake.cells.unshift({x:snake.x,y:snake.y});

        if(snake.cells.length>snake.maxCells){
            snake.cells.pop();
        }
        context.fillStyle="white";
        context.fillRect(food.x,food.y,grid-1,grid-1);
        context.fillStyle="#E43F5A";
        snake.cells.forEach(function(cell,index){
            
            context.refillRect(cell.x,cell.y,grid-1,grid-1)
            if(cell.x===food.x&&cell.y===food.y){
                snake.maxCells++;
                score+=1;
                document.getElementById("score").innerHtML="&nbsp;"+score;
                food.x=getRandomInt(0,25)*grid;
                food.y=getRandomInt(0,25)*grid;
            }
            for(var i=index+1;i<snake.cells.length;i++){
                if(cell.x===snake.cells[i].x&&cell.y===snake.cells[i].y){
                    if(score>max){
                        max=score;
                    }
                    snake.x=160;
                    snake.y=160;
                    snake.cells=[];
                    snake.maxCells=4;
                    snake.dx=grid;
                    snake.dy=0;
                    score=0;
                    food.x=getRandomInt(0,25)*grid;
                    food.y=getRandomInt(0,25)*grid;
                    document.getElementById("high").innerHTML="&nbsp;"+max;
                }
            }
        }
        )
    }
}