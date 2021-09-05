const score = document.querySelector(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  car = document.createElement("div"),
  selectSpeed = document.querySelector("#selectSpeed"),
  selectTraffic = document.querySelector("#selectTraffic"),
  speedMenu = document.querySelector(".speedMenu"),
  traficMenu = document.querySelector(".trafficMenu");
car.classList.add("car");


start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);



const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement;
}

function startGame() {
  switch (selectSpeed.value) {
    case 'Granny':
      setting.speed = 7;
      break;
    case 'Michael Schumaher':
      setting.speed = 10;
      break;
    case 'Dominic Toretto':
      setting.speed = 40;
      break;
  }
  switch (selectTraffic.value) {
    case 'Low trafficked':
      setting.traffic = 3;
      break;
    case 'Well-trafficked':
      setting.traffic = 2.8;
      break;
    case 'High trafficked':
      setting.traffic = 2.4;
      break;
  }
  console.log(setting.speed);
  console.log(setting.traffic);
  start.classList.add('hide');
  speedMenu.classList.add('hide');
  traficMenu.classList.add('hide');
  gameArea.innerHTML = '';
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.y = -100 * setting.traffic * (i + 1);
      enemy.style.top = enemy.y + 'px';
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
      enemy.style.background = 'transparent url("./redCar.png") center / cover no-repeat';
      gameArea.appendChild(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
  car.style.top = 'auto';
  car.style.bottom = '10px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    setting.score += setting.speed;
    score.innerHTML = 'Score:<br>' + setting.score;
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
      // = setting.x = setting.x - setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight - 10
    ) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }

    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";

    requestAnimationFrame(playGame);
  }
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line) {
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            setting.start = false;
            console.log('BADOOOMTS');
            start.classList.remove('hide');
            speedMenu.classList.remove('hide');
            traficMenu.classList.remove('hide');
            start.style.top = score.offsetHeight - 1 + 'px';
        }
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}