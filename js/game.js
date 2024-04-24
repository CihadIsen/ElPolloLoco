let canvas;
let world;
let keyboard = new Keyboard();
let menuAudio = new Audio("audio/menu-theme.mp3");
let isMenuAudioPlayed = false;
let endbossIntro = new Audio("audio/endbossIntro.mp3");
let soundOn = true;
let intervalIDs = [];

/**
 * Initialize the game, load the canvas, a world and listen to toggleFullscreen on Canvas
 */
function init() {
  startGame();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  canvas.addEventListener("click", toggleFullscreen);
  //turnOffSounds(soundOn);
}

/**
 * toggle Fullscreen Mode on screen click
 */
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen().catch((err) => {
      console.error("Error attempting to enable full-screen mode:", err);
    });
  }
}

/**
 * plays the Audio when game is started
 */
function playMenuAudio() {
  if (!isMenuAudioPlayed) {
    menuAudio.volume = 0.1;
    menuAudio.play();
    isMenuAudioPlayed = true;
  }
}

/**
 * endboss audio stops, hides canvas, displays restart button
 * hides game over content and shows victory screen
 */
function victory() {
  endbossIntro.pause();
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'block';
  let gameOverContent = document.getElementById('gameOver');
  if (gameOverContent) {
    let imgElement = gameOverContent.querySelector('img');
    if (imgElement) {
      imgElement.style.display = 'none';
    }
  }
  document.getElementById('victory-screen').style.display = 'block';
}

/**
 * shows canvas, hides starting-screen, start-button and gameover-screen,
 * main game Audio is played, and the level content is initialized 
 */
function startGame() {
  document.getElementById("canvas").style.display = "block";
  document.getElementById("startscreen").style.display = "none";
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  menuAudio.play();
  initLevel();
}

/**
 * stops endboss audio, hides canvas and shows gameOver screen
 */
function gameOver() {
  endbossIntro.pause();
  document.getElementById("canvas").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
}

/**
 * clears all Intervals, hides gameOver-screen and victory-screen, re-initialize the game
 */
function restartGame() {
  clearAllIntervals();
  document.getElementById("gameOver").style.display = "none";
  document.getElementById('victory-screen').style.display =  "none";
  init();
}

/**
 * clears all Intervals
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * toggles the sound mute state
 * if unmuted, mutes the game audio and boss audio
 * if muted, unmutes the game audio und boss audio
 */
function muteSound() {
  let mute = document.getElementById("muteMusic").firstChild;
  if (mute.src.endsWith("sound.png")) {
    mute.src = "img/mute.png";
    if (menuAudio && menuAudio.volume !== 0) {
      menuAudio.volume = 0;
    }
    if (endbossIntro && !endbossIntro.paused) {
      endbossIntro.volume = 0;
    }
  } else {
    mute.src = "img/sound.png";
    if (menuAudio && menuAudio.volume === 0) {
      menuAudio.volume = 1;
    }
    if (endbossIntro && endbossIntro.volume === 0) {
      endbossIntro.volume = 1;
    }
  }
}

/**
 * event listener for the keys on the keyboard to work
 * for the keydown event
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 38) {
    keyboard.UP = true;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode === 68) {
    keyboard.D = true;
  }
});

/**
 * event listener for the keys on the keyboard to work
 * for the keyup event
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});

/**
 * event listener for the keys on the keyboard to work in mobile
 * for the touchstart event
 */
document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById("jumpBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById("throwingBtn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.D = true;
});

/**
 * event listener for the keys on the keyboard to work for mobile
 * for the touchend event
 */
document.getElementById("leftBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById("rightBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById("jumpBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById("throwingBtn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.D = false;
});

/**
 * event listener for checking if the device is in landscape mode
 */
window.addEventListener('load', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * checks the window width and height
 * if device is not in landscape mode, shows the landscape message
 */
function checkOrientation() {
    const landscapeMessage = document.getElementById('landscapeModeOverlay');

    if (window.innerWidth < window.innerHeight) {
      landscapeMessage.style.display = 'block';
    } else {
      landscapeMessage.style.display = 'none';
    }
}


