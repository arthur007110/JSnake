//Desenvolvido por Arthur C. Gomes
//Github: https://github.com/arthur007110

//Elements References
var game_grid = document.getElementById("game-grid");
var points_label = document.getElementById("points-label");
var points_text_label = document.getElementById("points-text");

//Game Config
var game_speed = 150;
var cells_quantity = 576;
var cell_size = 25;
var cells_per_grid_side = Math.sqrt(cells_quantity);

//Game Logic
var snake = [{x: 0, y: 0}];
var dir = "N";

var points = 0;

var fruit = {x: 0, y: 0};

//Controll Variables
var player_input_this_frame = false;
var add_snake_child = false;
var collsion = false;

//Game Create
function create(){
    
    game_grid.style.width = (cells_per_grid_side * cell_size) + "px";
    game_grid.style.height = (cells_per_grid_side * cell_size) + "px";
    game_grid.addEventListener("click", function(){window.open("https://github.com/arthur007110");});

    points_label.style.width = Math.floor((cells_per_grid_side * cell_size)/5) + "px";
    points_label.style.height = (cells_per_grid_side * cell_size) + "px";
    //points_label.style.left = (cells_per_grid_side * cell_size)+ 8 + "px";
    points_label.addEventListener("click", function(){window.open("https://github.com/arthur007110");});

    player_input();
    restart_game();
}

//Game Loop
function update(){

    //console.log(snake);

    if(collsion){
        alert("Collision");
        restart_game();
    }

    clear_display();
    move_snake();
    check_snake_collision();
    draw_fruit();
    draw_snake();
    update_points();

    player_input_this_frame = false;
}

function draw_snake(){
    snake.forEach(snake_child => {
        var snake_child_div = document.createElement("div");

        snake_child_div.classList.add("snake");
        snake_child_div.style.left = (snake_child.x * cell_size)+"px";
        snake_child_div.style.top = (snake_child.y * cell_size)+"px";
        snake_child_div.style.width = cell_size + "px";
        snake_child_div.style.height = cell_size + "px";

        game_grid.appendChild(snake_child_div);
    });
}

function draw_fruit(){
    var fruit_div = document.createElement("div");

    fruit_div.classList.add("fruit");
    fruit_div.style.left = (fruit.x * cell_size)+"px";
    fruit_div.style.top = (fruit.y * cell_size)+"px";
    fruit_div.style.width = cell_size + "px";
    fruit_div.style.height = cell_size + "px";

    game_grid.appendChild(fruit_div);
}

function clear_display(){

    var child = this.game_grid.lastElementChild;

    while (child) {
        this.game_grid.removeChild(child);
        child = this.game_grid.lastElementChild;
    }
}

function move_snake(){

    var new_snake_child = {x: snake[snake.length-1].x, y: snake[snake.length-1].y}

    for(var i = snake.length-1; i > 0; i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

    if(add_snake_child){
        snake.push(new_snake_child);
        add_snake_child = false;
    }

    switch(dir){
        case "U":
            snake[0].y -=1;
            break;
        case "D":
            snake[0].y +=1;
            break;
        case "L":
            snake[0].x -=1;
            break;
        case "R":
            snake[0].x +=1;
            break;
        case "N":
            break;
    }
}

function create_fruit(){
    var x = getRandomInt(0, cells_per_grid_side-1);
    var y = getRandomInt(0, cells_per_grid_side-1);

    var canCreateFruit = true;
    
    snake.forEach(snake_child => {
        if(snake_child.x == x && snake_child.y == y){
            create_fruit();
            canCreateFruit = false;
        }
    });

    if(canCreateFruit){
        fruit = {x: x, y: y};
    }
}

function check_snake_collision(){
    if(snake[0].x < 0){
        snake[0].x = cells_per_grid_side-1;
    }else if(snake[0].x > cells_per_grid_side-1){
        snake[0].x = 0;
    }else if(snake[0].y < 0){
        snake[0].y = cells_per_grid_side-1;
    }else if(snake[0].y > cells_per_grid_side-1){
        snake[0].y = 0;
    }else if(snake[0].x == fruit.x && snake[0].y == fruit.y){
        //snake.push({x:0, y:0});
        add_snake_child = true;
        create_fruit();
        points++;
    }else{
        snake.forEach(snake_child => {
            if(snake_child != snake[0]){
                if(snake[0].x == snake_child.x && snake[0].y == snake_child.y){
                    collsion = true;
                }
            }
        });
    }
}

function update_points(){
    points_text_label.innerHTML = "Pontos: " + points;
}

function restart_game(){
    snake = [{x: Math.floor((cells_per_grid_side-1)/2), y: Math.floor((cells_per_grid_side-1)/2)}];
    collsion = false;
    create_fruit();
    dir = "N";
    points = 0;
}

function player_input(){
    document.addEventListener('keypress', (event) => {
        var code = event.code;

        if(player_input_this_frame){
            return;
        }

        switch(code){
            case "KeyW":
                if(dir != "D"){
                    dir = "U";
                }
                break;
            case "KeyS":
                if(dir != "U"){
                    dir = "D";
                }
                break;
            case "KeyA":
                if(dir != "R"){
                    dir = "L";
                }
                break;
            case "KeyD":
                if(dir != "L"){
                    dir = "R";
                }
                break;
            case "Enter":
                restart_game();
        }

        player_input_this_frame = true;
      }, false);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Start Game
create();
setInterval(update, game_speed);