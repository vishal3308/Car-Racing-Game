const score = document.querySelector(".score");
const startscreen = document.querySelector(".startscreen");
const gamearea = document.querySelector(".gamearea");
let player = { speed:20, score: 0,start: false };
let increasespeed = 0;
// console.log(startscreen, gamearea);

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
}
startscreen.addEventListener('click', start);

function start() {
    player.start = true;
    window.requestAnimationFrame(gameplay);
    startscreen.classList.add("hide");
    startscreen.innerHTML = "";
    gamearea.innerHTML = "";
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gamearea.appendChild(car);
    // ------------------------------------Light----------
    let light1 = document.createElement("div");
    light1.setAttribute("class", "light1");
    car.appendChild(light1);
    let light2 = document.createElement("div");
    light2.setAttribute("class", "light2");
    car.appendChild(light2);
    // -----------------------------------------------------
    player.y = car.offsetTop;
    player.x = car.offsetLeft;
    // console.log(player.x);
    for (i = 0; i < 5; i++) {
        let road = document.createElement("div");
        road.setAttribute('class', 'road');
        road.y = i * 150;
        road.style.top = road.y + 'px';
        gamearea.appendChild(road);
    }

    for (i = 0; i < 4; i++) {
        let enemycar = document.createElement("div");
        enemycar.setAttribute('class', 'enemycar');
        enemycar.style.backgroundColor = color();
        // <------------------------Enemycar Light--------------->
        let enemylightleft = document.createElement("div");
        enemylightleft.setAttribute("class", "light3");
        enemycar.appendChild(enemylightleft);
        let enemylightright = document.createElement("div");
        enemylightright.setAttribute("class", "light4");
        enemycar.appendChild(enemylightright);

        let carcolor = color();
        function applycolor(carcolor) {
            let data = "0 0 5px " + carcolor + ","
                + "0 0 1px " + carcolor + ","
                + "0 0 2px " + carcolor + ","
                + "0 0 3px " + carcolor + ","
                + "0 0 4px " + carcolor + ","
                + "0 0 5px " + carcolor + ","
                + "0 0 6px " + carcolor + ","
                + "0 0 7px " + carcolor + ","
                + "0 0 8px " + carcolor + ","
                + "0 0 9px " + carcolor + ","
                + "0 0 10px " + carcolor + ","
                + "0 0 20px " + carcolor + ","
                + "0 0 30px " + carcolor + ","
                + "0 0 40px " + carcolor + ","
                + "0 0 50px " + carcolor + ","
                + "0 0 15px " + carcolor + ","
                + "0 0 35px " + carcolor + ","
                + "0 0 45px " + carcolor + ","
                + "0 0 25px " + carcolor + ","
                + "0 0 50px " + carcolor + ","
                + "0 0 200px " + carcolor + ","
                + "0 0 250px " + carcolor;
            return data;
        }
        let carshadow = applycolor(carcolor);

        enemylightleft.style.backgroundColor = carcolor;
        enemylightleft.style.boxShadow = carshadow;
        enemylightright.style.backgroundColor = carcolor;
        enemylightright.style.boxShadow = carshadow;
        // <---------------------------End Car light------------------>
        enemycar.y = i * 150 - 150;
        enemycar.style.top = enemycar.y + 'px';
        enemycar.style.left = Math.floor(Math.random() * 380) + 'px';
        gamearea.appendChild(enemycar);
    }
}
function color() {

    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}

function movelines() {
    lines = document.querySelectorAll('.road');
    // console.log(lines);
    lines.forEach(item => {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y = item.y + player.speed;
        item.style.top = item.y + 'px';
        // console.log(item.style.top);
    });
}

function iscollide(a, b) {
    carRect = a.getBoundingClientRect();
    enemyRect = b.getBoundingClientRect();
    return !((carRect.left > enemyRect.right) || (carRect.right < enemyRect.left) || (carRect.top > enemyRect.bottom) || (carRect.bottom < enemyRect.top));
}
function moveenemy(car) {
    enemycar = document.querySelectorAll('.enemycar');
    // console.log(lines);
    enemycar.forEach(item => {

        if (iscollide(car, item)) {
            console.log("Its Boom");
            console.log("CarLeft,EnemyRight:" + carRect.left, enemyRect.right);
            EndGame();
        }
        if (item.y >= 700) {
            item.y -= 750;
            item.style.left = Math.floor(Math.random() * 380) + 'px';
            item.style.backgroundColor = color();

        }
        item.y = item.y + player.speed;
        item.style.top = item.y + 'px';
        // console.log(item.style.top);
    });
}
function gameplay() {

    let road = gamearea.getBoundingClientRect();
    let car = document.querySelector(".car");
    // console.log(road);
    // console.log(player.x);
    if (player.start) {
        movelines();
        finalscore();
        moveenemy(car);
        if (keys.ArrowUp && player.y > road.top + 100) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < road.bottom - 100) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < road.width - 50) { player.x += player.speed }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gameplay);
    }

}
function finalscore() {
    increasespeed++;
    player.score++;
    score.innerHTML = "SCORE <br> " + player.score;
    if (increasespeed >= 1000) {
        player.speed += 1;
        increasespeed = 0;
    }
}
function EndGame() {
    player.start = false;
    startscreen.classList.remove("hide");
    startscreen.style.zIndex = 1;
    startscreen.innerHTML = "Game Over <br>Your Final Score: " + player.score + "<br>Click Here to restart Game";
}