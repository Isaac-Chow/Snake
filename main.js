window.onload=function(){
    // Get the canvas
    const canvas = document.getElementById("game");
    // Get the drawing context
    const context = canvas.getContext("2d");

    // Resize the canvas
    canvas.width= 800;
    canvas.height=550;

    // Create a grid
    var grid=16;
    // Create 
    var count=0;
    var score=0
    var max=0

    // Create the snak object
    var snake={
        x:160,
        y:160,
        cells:[],
        dx:grid,
        dy:0,

        maxCells:4
    };
    // Create the food item
    var food={
        x:320,
        y:320
    };
    
    // 
    function getRandomInt(min,max){
        return Math.floor(Math.random()*(max-min))+min;
    }

    function loop(){
        // console.log("We're in the game loop")
        /**
         * > Request the animation frame from the window
         */
        requestAnimationFrame(loop);

        
        if(++count<4){
            return;
        }
        count = 0;
        //  Clear the rectangle 
        context.clearRect(0,0,canvas.width,canvas.height);

        // In changing the distance add the delta x and delta y
        snake.x += snake.dx
        snake.y += snake.dy

        // 
        if(snake.x < 0){
            snake.x = canvas.width - grid;
        }
        else if(snake.x >= canvas.width){
            snake.x = 0
        }

        if(snake.y < 0){
            snake.y = canvas.height-grid;
        }
        else if(snake.y>=canvas.height){
            snake.y = 0;
        }

        snake.cells.unshift({ x:snake.x , y:snake.y });

        if(snake.cells.length>snake.maxCells){
            snake.cells.pop();
        }

        context.fillStyle="white";
        context.fillRect(food.x,food.y,grid-1,grid-1);
        context.fillStyle="#E43F5A";

        snake.cells.forEach(function(cell,index){
            
            context.fillRect(cell.x,cell.y,grid-1,grid-1)
            if(cell.x === food.x && cell.y === food.y){
                snake.maxCells++;
                score+=1;
                document.getElementById("score").innerHtML="&nbsp;"+score;
                food.x=getRandomInt(0,25)*grid;
                food.y=getRandomInt(0,25)*grid;
            }

            for(var i=index+1;i<snake.cells.length;i++){

                if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                    if(score>max){
                        max=score;
                    }
                    snake.x=240;
                    snake.y=240;

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
        // Test out keydown  listeners
        document.addEventListener("keydown", function(event){
            // let code
            console.log(event.key);
            console.log(typeof(event.key));
            // console.log(event.keycode);
            if (event.key == "w"){
                snake.dy = (snake.dy < 0) ? snake.dy * -1 : snake.dy ;
            }
            else if (event.key == "s"){
                snake.dy = (snake.dy < 0) ? snake.dy : snake.dy * -1 ;
            }
            else if (event.key == "a"){
                snake.dx = (snake.dx < 0) ? snake.dx : snake.dx * -1 ;
            }
            else if (event.key == "d"){
                snake.dx = (snake.dx < 0) ? snake.dx * -1 : snake.dx ;
            }
        })
    }

    loop();
}